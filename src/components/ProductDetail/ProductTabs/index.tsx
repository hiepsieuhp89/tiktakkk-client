"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSelectedProduct } from "@/stores/useSelectedProduct"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Download from "yet-another-react-lightbox/plugins/download"
import { useProfile } from "@/hooks/authentication"
import Link from "next/link"
import { checkImageUrl } from "@/lib/utils"
import { formatDate } from "@/utils"
import { useProductById } from "@/hooks/products"

interface ProductTabsProps {
  defaultActiveTab?: string
}

interface DescriptionTabProps {
  images: string[]
}

function DescriptionTab({ images }: DescriptionTabProps) {
  const { selectedProduct } = useSelectedProduct()
  return (
    <div className="p-6">
      {selectedProduct?.description && (
        <>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Mô tả sản phẩm</h2>
            <div
              className="text-sm text-gray-700 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
            />
          </div>
          <div className="border-t border-gray-200 my-6"></div>
        </>
      )}
    </div>
  )
}

// Reviews Tab Component
function ReviewsTab() {
  const { selectedProduct } = useSelectedProduct()
  const { profileData } = useProfile()
  const { product } = useProductById((selectedProduct as any)?.id, profileData?.data?.id || undefined);
  const reviews = product?.data?.reviews || []
  const totalReviews = reviews.length
  const [openLightbox, setOpenLightbox] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [currentReviewImages, setCurrentReviewImages] = useState<string[]>([])
  const handleReviewImageClick = (images: string[], startIndex: number) => {
    setCurrentReviewImages(images)
    setLightboxIndex(startIndex)
    setOpenLightbox(true)
  }
  return (
    <Card className="border-none pb-2">
      <CardHeader className="pb-3">
        {!profileData && <h2 className="text-lg font-semibold !text-main-text">Đăng nhập để xem đánh giá sản phẩm.
          <Link href="/sign-in" className="text-blue-500 hover:underline ml-1" target="_blank">Đăng nhập</Link>
        </h2>}
        {profileData && <h2 className="text-lg font-semibold !text-main-text">Nhận xét ({totalReviews})</h2>}
      </CardHeader>
      {profileData && <CardContent className="space-y-6">
        <div className="bg-gray-50 rounded-sm p-4 border border-gray-100">
          <div className="flex gap-3 mb-3 items-center">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src="/images/default-avatar.jpg" />
              <AvatarFallback className="bg-primary/20 text-primary">KH</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium">Viết đánh giá của bạn</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="text-xl text-gray-300 hover:text-yellow-400"
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Input
              className="!rounded-sm border-gray-300 bg-white"
              placeholder="Viết nhận xét của bạn..." />
            <div className="flex justify-between">
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                  Thêm ảnh
                </Button>
              </div>
              <Button
                className="!rounded-sm"
                size="sm"
              >
                Gửi đánh giá
              </Button>
            </div>
          </div>
        </div>

        {/* Danh sách nhận xét */}
        {(!reviews || reviews.length === 0) && (
          <div className="text-center py-6 text-gray-500  border-gray-100">
            Chưa có nhận xét nào cho sản phẩm này
          </div>
        )}
        <div className="border border-gray-100 rounded-sm">
          {reviews && reviews.map((review: any) => (
            <div key={review.id} className="p-4 bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                <div className="flex items-center gap-4">
                  <Avatar className="w-11 h-11 border-1 border-transparent bg-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', padding: 2 }}>
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <AvatarImage
                        draggable={false}
                        src={review?.user?.logoUrl || "/images/default-avatar.jpg"}
                        alt={review.userId}
                        className="w-full h-full object-cover rounded-full border-2 border-white"
                      />
                      <AvatarFallback className="text-white font-bold text-lg bg-[#F9FAFB] w-full h-full flex items-center justify-center rounded-full">
                      </AvatarFallback>
                    </div>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-base text-gray-800">
                      {review?.user?.fullName || "Người dùng ẩn danh"}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      Đã đánh giá <div className="flex">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`text-lg ${index < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>, vào lúc {formatDate(review.createdAt, 'datetime')}
                    </div>
                    <div className="text-sm text-gray-600">Số lượng: {review.quantity} sản phẩm</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white border rounded-md">
                <div className="text-gray-800 text-[15px] bg-white mb-2">
                  <p className="font-medium">Nội dung đánh giá:</p>
                  <p className="text-gray-600">{review.content}</p>
                </div>
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 flex-wrap bg-white">
                    {review.images.map((image: string, idx: number) => (
                      <img
                        key={idx}
                        src={checkImageUrl(image)}
                        alt={`Review image ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded-sm border cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleReviewImageClick(review.images, idx)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Lightbox cho hình ảnh review */}
        <Lightbox
          open={openLightbox}
          close={() => setOpenLightbox(false)}
          slides={currentReviewImages.map(image => ({ src: image, download: image }))}
          plugins={[Zoom, Download]}
          index={lightboxIndex}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
            doubleTapDelay: 300,
            doubleClickDelay: 300,
            keyboardMoveDistance: 50
          }}
        />
      </CardContent>}
    </Card>
  )
}

// Main ProductTabs Component
export default function ProductTabs({ defaultActiveTab }: ProductTabsProps) {
  const tabs = [
    {
      id: "tab_default_1",
      label: "Miêu tả",
      content: ProductTabs.createDescriptionTab([
        "https://sg-live-01.slatic.net/p/1d376211c4b98d216490a86eae654d28.png",
        "https://sg-live-01.slatic.net/p/d0de0881014095549d52b4f950b0bcb8.png",
        "https://sg-live-01.slatic.net/p/1e1f0590d92e9b9a69bb48584e54d871.png",
        "https://sg-live-01.slatic.net/p/6caa4819a3886334507dcbe3a827bb86.png",
        "https://sg-live-01.slatic.net/p/9704a9d14fbb1b6ae7d55a4deb4a18fc.png",
        "https://sg-live-01.slatic.net/p/84cd41516bc95343364e4aa9909733c5.png"
      ])
    },
    {
      id: "tab_default_4",
      label: "Nhận xét",
      content: <ReviewsTab />
    }
  ]

  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id)

  return (
    <div className="bg-white shadow-sm mb-3">
      <div className="border-b flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 text-base font-semibold text-gray-700 relative ${activeTab === tab.id ? "text-gray-900" : "hover:text-gray-900"
              }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="pt-0">
        {tabs.map((tab) => (
          <div key={tab.id} role="tabpanel" className={`${activeTab === tab.id ? "block" : "hidden"}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

ProductTabs.createDescriptionTab = (images: string[]) => {
  return <DescriptionTab images={images} />
}

