'use client'

import React, { useState, useRef } from 'react';
import { Heart, ChevronRight, ChevronLeft, Music, Download } from 'lucide-react';
import { exploreCategories, exploreVideos, type ExploreVideo, type Category } from './mockdata';
import TikTokSidebar from '@/components/HomePage/TikTokSidebar';

const ExplorePage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>(exploreCategories);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const categoryContainerRef = useRef<HTMLDivElement>(null);

    const handleCategoryClick = (categoryId: string) => {
        setCategories(prev =>
            prev.map(cat => ({
                ...cat,
                isActive: cat.id === categoryId
            }))
        );
        setSelectedCategory(categoryId);
    };

    const handleScroll = (direction: 'left' | 'right') => {
        if (categoryContainerRef.current) {
            const container = categoryContainerRef.current;
            const scrollAmount = 200;

            container.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });

            if (direction === 'right') {
                setShowLeftArrow(true);
            } else {
                if (container.scrollLeft - scrollAmount <= 0) {
                    setShowLeftArrow(false);
                }
            }
        }
    };

    const filteredVideos = selectedCategory === 'all'
        ? exploreVideos
        : exploreVideos.filter(video => video.category === selectedCategory);

    return (
        <div className="flex max-w-[1440px] mx-auto pt-5 h-full ">

            {/* Nội dung bên phải */}
            <div className="flex-1">
                {/* Top Navigation Bar */}
                <div className="sticky mb-5 z-10 px-3 py-2">
                    <div className="flex items-center justify-between">
                        {showLeftArrow && (
                            <button
                                className="p-2 mr-2 bg-gray-100 hover:bg-gray-200 rounded-full flex-shrink-0"
                                onClick={() => handleScroll('left')}
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}

                        <div
                            className="flex items-center space-x-3 overflow-x-auto scrollbar-hide flex-1"
                            ref={categoryContainerRef}
                        >
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id)}
                                    className={`px-6 py-2 rounded-lg text-base font-medium whitespace-nowrap transition-colors shadow-sm ${category.isActive
                                        ? 'bg-black text-white shadow-md'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        <button
                            className="p-2 ml-2 bg-gray-100 hover:bg-gray-200 rounded-full flex-shrink-0"
                            onClick={() => handleScroll('right')}
                        >
                            <ChevronRight size={20} />
                        </button>

                        <div className="flex items-center space-x-2 ml-4">
                            <button className="p-1 text-gray-600 hover:text-gray-800">
                                <Music size={16} />
                            </button>
                            <button className="p-1 text-gray-600 hover:text-gray-800">
                                <Download size={16} />
                            </button>
                            <button className="p-1 text-gray-600 hover:text-gray-800">
                                <Download size={16} />
                            </button>
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-2">
                    <div className="flex flex-wrap gap-2.5 justify-start">
                        {filteredVideos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>

                    {filteredVideos.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-sm">No videos found for this category</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface VideoCardProps {
    video: ExploreVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
    return (
        <div className="relative group cursor-pointer transition-transform hover:scale-105 flex-shrink-0">
            <div className="relative h-[280px] w-[200px] rounded-xl overflow-hidden shadow">
                <img
                    src={video.thumbnail}
                    alt={video.displayName}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />

                {video.isHotNews && (
                    <div className="absolute top-1 left-1">
                        <span className="text-xs bg-red-500 text-white px-1 rounded">TIN NÓNG</span>
                    </div>
                )}

                {video.overlayText && (
                    <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-white text-xs line-clamp-2">{video.overlayText}</p>
                    </div>
                )}

                <div className="absolute bottom-2 left-2">
                    <div className="flex items-center space-x-1 rounded-full px-2 py-1 bg-black/40">
                        <Heart size={15} className="text-white" />
                        <span className="text-xs text-white">{video.likes}</span>
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5"></div>
                    </div>
                </div>
            </div>

            <div className="mt-1 flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex items-center space-x-1 min-w-0">
                    <span className="text-xm text-gray-800 font-medium truncate">{video.username}</span>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
