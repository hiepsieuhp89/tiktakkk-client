'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, List, Typography } from 'antd';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { mdiStorefront } from '@mdi/js';
import Link from 'next/link';
import Image from 'next/image';
import { checkAvatarUrl, cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { formatNumber } from '@/utils';
import { useSelectedProduct } from '@/stores/useSelectedProduct';
import { useProfile } from '@/hooks/authentication';
import { useProducts } from '@/hooks/products';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { useTopSellingProducts } from '@/hooks/dashboard';
const { Text } = Typography;

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "w-3 h-3",
            index < rating ? "fill-yellow-400 stroke-yellow-400" : "fill-gray-300 stroke-gray-300"
          )}
        />
      ))}
    </div>
  )
}

const LeftSideSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const { selectedProduct, setSelectedProduct } = useSelectedProduct()
  const { profileData } = useProfile()
  const { data: topSellingProducts, isLoading } = useTopSellingProducts()
  const topUser = topSellingProducts?.data?.data?.[0]?.shopProducts?.[0]?.user;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      setIsMobile(mediaQuery.matches);

      const handleResize = () => setIsMobile(mediaQuery.matches);
      mediaQuery.addEventListener('change', handleResize);
      
      return () => mediaQuery.removeEventListener('change', handleResize);
    }
  }, []);
  
  return (
    <div>
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 30px !important;
          height: 30px !important;
          background-color: rgba(0, 0, 0, 0.5) !important;
          border-radius: 50% !important;
          color: white !important;
          right: 10px !important;
          left: auto !important;
          top: auto !important;
          bottom: 10px !important;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 14px !important;
          font-weight: bold !important;
        }
        .swiper-button-prev {
          right: 50px !important; /* Adjust this value to position the prev button correctly */
        }
        .swiper-pagination-bullets {
          bottom: 12px !important; /* Adjust to prevent overlap with navigation buttons */
        }
      `}</style>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div
            className="seller-info-card mb-4 border border-solid border-gray-200"
            style={{ background: '#fcfcfd' }}
          >
            <div className="position-relative text-left">
              <div className="font-semibold text-lg border-b p-4">
                Được bán bởi
              </div>
              <div className='p-4'>
                <div className="flex items-start mb-3">
                  {/* Shop Logo */}
                  <Link href={profileData ? "/shop?id=" + profileData?.data?.id : "/shop?id=" + topUser?.id}>
                    <motion.div
                      className="mr-3 w-11 h-11 bg-white border relative rounded-full"
                    >
                      <Image
                        draggable={false}
                        src={profileData && profileData?.data?.logoUrl ? checkAvatarUrl(profileData?.data?.logoUrl + "") : "/images/default-avatar.jpg"}
                        alt={profileData && profileData?.data?.shopName ? profileData?.data?.shopName + "" : "Amazon"}
                        height={56}
                        width={56}
                        quality={100}
                        className="flex-shrink-0 rounded-full h-full w-full object-cover p-1"
                      />
                    </motion.div>
                  </Link>

                  {/* Shop Name & Location */}
                  <div>
                    <Link href={profileData ? "/shop?id=" + profileData?.data?.id : "/shop?id=" + topUser?.id} className="text-sm flex items-center font-semibold">
                      {profileData && profileData?.data?.shopName ? profileData?.data?.shopName + "" : "Amazon"}
                      <motion.span
                        className="ml-2 text-blue-500"
                      >
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlSpace="preserve"
                          viewBox="0 0 287.5 442.2"
                          width="22"
                          height="24"
                          className="inline-block"
                        >
                          <polygon style={{ fill: '#F8B517' }} points="223.4,442.2 143.8,376.7 64.1,442.2 64.1,215.3 223.4,215.3" />
                          <circle style={{ fill: '#FBD303' }} cx="143.8" cy="143.8" r="143.8" />
                          <circle style={{ fill: '#F8B517' }} cx="143.8" cy="143.8" r="93.6" />
                          <polygon
                            style={{ fill: '#FCFCFD' }}
                            points="143.8,55.9 163.4,116.6 227.5,116.6 175.6,154.3 195.6,215.3 143.8,177.7 91.9,215.3 111.9,154.3 60,116.6 124.1,116.6"
                          />
                        </svg>
                      </motion.span>
                    </Link>
                    {profileData && profileData?.data?.shopAddress && <Text className="text-xs"><strong>Địa chỉ:</strong> {profileData?.data?.shopAddress + ""}</Text>}
                    {!profileData?.data?.address && !profileData?.data?.shopAddress && <Text className="text-xs"><strong>Địa chỉ:</strong> 410 Terry Avenue North, Seattle, WA 98109, USA</Text>}
                    </div>
                </div>
                {/* Rating */}
                <div className="mb-3 flex flex-col items-center p-2 border">
                  <RatingStars rating={profileData ? parseFloat((profileData?.data as any)?.stars) || 0 : 5} />
                  <div className="text-xs text-gray-500 mt-1">
                    ({profileData ? parseFloat((profileData?.data as any)?.stars) || 0 : 5}★)
                  </div>
                </div>
                {/* Visit Store Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link href={profileData ? "/shop?id=" + profileData?.data?.id : "/shop?id=" + topUser?.id}>
                    <Button
                      type="primary"
                      icon={<Icon path={mdiStorefront} size={0.8} />}
                      block
                      style={{
                        background: 'linear-gradient(to right, #232f3e, #37475A)',
                        borderRadius: 0
                      }}
                    >
                      Ghé thăm cửa hàng
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:block mt-4 bg-white">
          <div className="top-selling-card border border-solid border-gray-200">
            <div className="font-semibold text-lg border-b p-4">
              Sản phẩm bán chạy nhất
            </div>
            {isMobile ? (
              <div className="p-2">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1.2}
                  className="product-swiper"
                  style={{ padding: '10px 0 50px 0' }}
                  modules={[Pagination, Navigation]}
                  navigation={true}
                  pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                    dynamicBullets: true
                  }}
                >
                  {(profileData ? topSellingProducts : [])?.map((product: any, index: number) => (
                    <SwiperSlide key={product?.id || index}>
                      <motion.div
                        variants={hoverVariants}
                        whileHover="hover"
                        className="p-2"
                      >
                        <Link
                          onClick={() => setSelectedProduct(product?.product)}
                          href={"/product?id=" + product?.product?.id}
                          className="block"
                        >
                          <div className="flex items-center">
                            <div className="w-1/4 xl:w-1/3 overflow-hidden">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                              >
                                <Image
                                  src={product?.product?.imageUrls?.[0] || "/images/default-avatar.jpg"}
                                  alt={product?.product?.name}
                                  width={200}
                                  height={200}
                                  className="w-full h-20 object-contain"
                                  style={{ maxHeight: '200px' }}
                                />
                              </motion.div>
                            </div>
                            {/* Thông tin sản phẩm */}
                            <div className="w-3/4 xl:w-2/3 pl-3">
                              <div className="mb-1">
                                <Text className="text-sm line-clamp-2 hover:transition-colors">
                                  {product?.product?.name && product?.product?.name.length > 40
                                    ? product?.product?.name.slice(0, 40) + "..."
                                    : product?.product?.name}
                                </Text>
                              </div>
                              <div className="flex items-center gap-2 mb-1">
                                <Text className="font-bold text-base text-red-500">
                                  {Number(product?.product?.price) > 0 ? `$${formatNumber(product?.product?.price)}` : "Liên hệ"}
                                </Text>
                                <span className="text-xs text-gray-500">
                                  Đã bán: {product?.totalSold}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <RatingStars rating={parseFloat(product?.product?.averageRating) || 0} />
                                <span className="text-xs text-gray-500">
                                  ({product?.product?.averageRating || 0}★)
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="swiper-pagination mt-3"></div>
              </div>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={profileData ? topSellingProducts : []}
                renderItem={(product: any) => (
                  <motion.div
                    variants={hoverVariants}
                    whileHover="hover"
                    className="p-4"
                  >
                    <Link
                      onClick={() => setSelectedProduct(product?.product)}
                      href={"/product?id=" + product?.product?.id}
                      className="block"
                    >
                      <div className="flex items-center">
                        <div className="w-1/4 xl:w-1/3 overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Image
                              src={product?.product?.imageUrls?.[0] || "/images/default-avatar.jpg"}
                              alt={product?.product?.name}
                              width={200}
                              height={200}
                              className="w-full h-20 object-contain"
                              style={{ maxHeight: '200px' }}
                            />
                          </motion.div>
                        </div>
                        {/* Thông tin sản phẩm */}
                        <div className="w-3/4 xl:w-2/3 pl-3">
                          <div className="mb-1">
                            <Text className="text-sm line-clamp-2 hover:transition-colors">
                              {product?.product?.name && product?.product?.name.length > 40
                                ? product?.product?.name.slice(0, 40) + "..."
                                : product?.product?.name}
                            </Text>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Text className="font-bold text-base text-red-500">
                              {Number(product?.product?.price) > 0 ? `$${formatNumber(product?.product?.price)}` : "Liên hệ"}
                            </Text>
                            <span className="text-xs text-gray-500">
                              Đã bán: {product?.totalSold}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <RatingStars rating={parseFloat(product?.product?.averageRating) || 0} />
                            <span className="text-xs text-gray-500">
                              ({product?.product?.averageRating || 0}★)
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LeftSideSection;
