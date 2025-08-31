import { Empty, Spin } from "antd";
import Link from "next/link";
import Image from "next/image";
import "./styles.css";
import { formatNumber } from "@/utils";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

interface ShopContentProps {
  shopProducts: any[];
  isLoading: boolean;
  meta: any;
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder: "ASC" | "DESC";
  handleSortChange: (value: string) => void;
  handlePageChange: (newPage: number, newPageSize: number) => void;
}

export default function ShopContent({
  shopProducts,
  isLoading,
  meta,
  page,
  pageSize,
  sortField,
  sortOrder,
  handleSortChange,
  handlePageChange,
}: ShopContentProps) {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  useEffect(() => {
    if (page === 1) {
      setAllProducts(shopProducts);
    } else if (shopProducts.length > 0) {
      setAllProducts(prev => [...prev, ...shopProducts]);
    }
  }, [shopProducts, page]);
  
  useEffect(() => {
    return () => {
      setAllProducts([]);
    };
  }, [sortField, sortOrder]);

  const handleLoadMore = () => {
    if (meta && page < meta.pageCount) {
      handlePageChange(page + 1, pageSize);
    }
  };

  return (
    <main className="w-full flex justify-center px-4 sm:px-6 md:px-8 lg:px-[104px] py-6 bg-[#E3E6E6]">
      <div className="w-full max-w-[1440px] bg-[#E3E6E6]">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start space-y-2 sm:space-y-0">
          <div>
            <span className="font-medium text-sm">Sắp xếp theo:</span>
            <Select
              value={`${sortField}:${sortOrder}`}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="max-w-[180px] w-[180px] bg-white rounded-sm mt-4">
                <SelectValue placeholder="Chọn sắp xếp" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-sm">
                <SelectItem value="createdAt:DESC">Mới nhất</SelectItem>
                <SelectItem value="price:ASC">Giá: Thấp đến cao</SelectItem>
                <SelectItem value="price:DESC">Giá: Cao đến thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
            {meta && (
              <span className="font-medium text-sm">
                Hiển thị {allProducts.length} / {meta.itemCount} sản phẩm
              </span>
            )}
        </div>

        {/* Products Section Title */}
        <div className="mb-4 border-b pb-2 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-medium">Sản phẩm mới về</h2>
          <button className="text-blue-500">
            <span className="mr-1 font-medium text-xs sm:text-sm">Xem tất cả</span>
            <span>❯</span>
          </button>
        </div>

        {/* Products Grid */}
        {isLoading && page === 1 ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="small" />
          </div>
        ) : allProducts && allProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
              {allProducts.map((item: any) => (
                <Link
                  href={`/shop/product?id=${item.id}`}
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-sm p-2 sm:p-3 relative hover:transition-shadow cursor-pointer hov-animate-outline"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div className="hoverEffect">
                    {/* Product Image */}
                    <div className="relative h-36 sm:h-48 mb-2 sm:mb-3">
                      <Image
                        src={item.imageUrls[0] || "/images/white-image.png"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm line-clamp-2 h-8 sm:h-10 hover:text-[#C7511F]">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-[#FFA41C] text-[10px] sm:text-base">
                            ★
                          </span>
                        ))}
                        <span className="text-[10px] sm:text-xs text-[#007185]">(0)</span>
                      </div>
                      <div className="flex items-end flex-wrap">
                        <span className="text-base sm:text-lg font-bold">${formatNumber(Number(item.price))}</span>
                        {item.profit > 0 && (
                          <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2 line-through">${formatNumber(Number(item.salePrice) - item.profit)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={item.stock > 0 ? "badge-stock-in" : "badge-stock-out"}>
                          {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </div>
                        <div className="badge-free-delivery">
                          FREE delivery
                        </div>
                      </div>
                    </div>
                    <button
                      className="absolute bottom-2 right-2 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="sm:w-4 sm:h-4"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Load More Button */}
            {meta && page < meta.pageCount && (
              <div className="mt-6 sm:mt-8 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="bg-main-golden-orange/90 hover:bg-main-golden-orange !text-main-text font-medium px-4 sm:px-6 py-1.5 sm:py-2 rounded-full flex items-center text-xs sm:text-base order-2 sm:order-none"
                >
                  {isLoading ? (
                    <>
                      <Spin size="small" className="mr-2" />
                      Đang tải...
                    </>
                  ) : (
                    'Xem thêm sản phẩm'
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <Empty description="Không tìm thấy sản phẩm nào" />
        )}
      </div>
    </main>
  );
} 