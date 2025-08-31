"use client"

import { Icon } from "@mdi/react"
import {
  mdiFacebook,
  mdiInstagram,
  mdiTwitter,
  mdiYoutube,
  mdiEmailOutline,
  mdiPhoneOutline,
  mdiMapMarkerOutline,
} from "@mdi/js"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@/context/useUserContext"
import { logout } from "@/api/axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useProfile } from "@/hooks/authentication"

export function Footer() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { profileData } = useProfile()
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <footer className="bg-main-dark-blue text-sm">
      <div className="mx-auto pt-8 px-4 max-w-[1500px] w-fulls">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Amazon"
                width={80}
                height={34}
                className="cursor-pointer mb-3"
                quality={100}
                style={{ height: "auto" }} // Fix the image warning
              />
            </Link>
            <p className="text-gray-500 mb-4">
              Cửa hàng trực tuyến với đa dạng sản phẩm chất lượng cao và dịch vụ khách hàng tuyệt vời.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:!text-white/80">
                <Icon path={mdiFacebook} size={1} />
              </Link>
              <Link href="#" className="text-gray-500 hover:!text-white/80">
                <Icon path={mdiInstagram} size={1} />
              </Link>
              <Link href="#" className="text-gray-500 hover:!text-white/80">
                <Icon path={mdiTwitter} size={1} />
              </Link>
              <Link href="#" className="text-gray-500 hover:!text-white/80">
                <Icon path={mdiYoutube} size={1} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 !text-white/80">Thông tin</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support-policy" className="text-gray-500 hover:!text-white/80 ">
                  Chính sách hỗ trợ
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-gray-500 hover:!text-white/80">
                  Chính sách hoàn trả
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-500 hover:!text-white/80">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/seller-policy" className="text-gray-500 hover:!text-white/80">
                  Chính sách người bán
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:!text-white/80">
                  Điều khoản và điều kiện
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 !text-white/80">Tài khoản của tôi</h3>
            <ul className="space-y-2">
              {isClient ? (
                profileData ? (
                  <li className="text-gray-500 hover:!text-white/80 cursor-pointer" onClick={() => logout()}>
                    Đăng xuất
                  </li>
                ) : (
                  <li className="text-gray-500 hover:!text-white/80 cursor-pointer" onClick={() => router.push("/sign-in")}>
                    Đăng nhập
                  </li>
                )
              ) : (
                <li className="text-gray-500">
                  <span className="opacity-0">Loading...</span>
                </li>
              )}
              <li>
                <Link href="/#" className="text-gray-500 hover:!text-white/80">
                  Đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-500 hover:!text-white/80">
                  Danh sách yêu thích
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-500 hover:!text-white/80">
                  Theo dõi thứ tự
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-gray-500 hover:!text-white/80">
                  Thông báo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 !text-white/80">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Icon path={mdiMapMarkerOutline} size={0.8} className="flex-shrink-0 text-gray-500" />
                <span className="text-gray-500">
                  Tầng 36, Tòa nhà Bitexco Financial Tower, Số 2 đường Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Icon path={mdiEmailOutline} size={0.8} className="flex-shrink-0 text-gray-500" />
                <span className="text-gray-500 text-wrap max-w-[150px] break-words">ds-reply@amazon-global-selling.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-8">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Amazon Global Selling. Tất cả các quyền được bảo lưu.
          </p>
          <div className="relative h-[30px] w-[216px]">
            <Image
              src="/images/payments.png"
              alt="Visa"
              width={500}
              height={500}
              className="object-contain"
              draggable={false}
              quality={100}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}

