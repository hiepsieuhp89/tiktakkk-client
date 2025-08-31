'use client';

import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share, Check } from 'lucide-react';
import { VideoData } from './mockData';

interface TikTokInteractionPanelProps {
    currentVideo: VideoData;
    onLike: (videoId: string) => void;
    onBookmark: (videoId: string) => void;
    isUserFollowed?: boolean;
    onFollowUser?: (userId: string) => void;
}

const TikTokInteractionPanel: React.FC<TikTokInteractionPanelProps> = ({
    currentVideo,
    onLike,
    onBookmark,
    isUserFollowed = false,
    onFollowUser,
}) => {
    const [showCheck, setShowCheck] = useState(false); // hiển thị dấu tích tạm thời

    // Reset dấu tích khi đổi video/user
    useEffect(() => {
        setShowCheck(false);
    }, [currentVideo.userHandle]);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const handleFollowClick = () => {
        if (isUserFollowed) return;
        onFollowUser?.(currentVideo.user.id);
        setShowCheck(true);
        setTimeout(() => setShowCheck(false), 1500);
    };

    const interactionStats = [
        {
            icon: Heart,
            count: formatNumber(currentVideo.likes),
            isActive: currentVideo.isLiked,
            onClick: () => onLike(currentVideo.id),
            activeColor: 'text-red-500 fill-current',
            inactiveColor: 'text-white',
        },
        {
            icon: MessageCircle,
            count: formatNumber(currentVideo.comments),
            isActive: false,
            onClick: () => { },
            activeColor: 'text-blue-400 fill-current',
            inactiveColor: 'text-white',
        },
        {
            icon: Bookmark,
            count: '',
            isActive: currentVideo.isBookmarked,
            onClick: () => onBookmark(currentVideo.id),
            activeColor: 'text-yellow-400 fill-current',
            inactiveColor: 'text-white',
        },
        {
            icon: Share,
            count: formatNumber(currentVideo.shares),
            isActive: false,
            onClick: () => { },
            activeColor: 'text-green-400 fill-current',
            inactiveColor: 'text-white',
        },
    ];

    return (
        <div className="w-full h-full flex flex-col items-center justify-end pb-2">
            {/* Avatar + Nút Follow */}
            <div className="flex flex-col items-center gap-2 md:gap-3 mb-4 md:mb-5">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 relative">
                    <div className="w-full h-full rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gray-300 rounded-full"></div>
                    </div>
                    {/* Hiện dấu cộng nếu chưa follow và chưa showCheck */}
                    {!isUserFollowed && !showCheck && (
                        <div
                            onClick={handleFollowClick}
                            className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-red-500 rounded-full flex items-center justify-center absolute -bottom-1 md:-bottom-2 lg:-bottom-3 left-1/2 -translate-x-1/2 cursor-pointer"
                        >
                            <span className="text-white text-xs md:text-sm lg:text-base font-bold">
                                +
                            </span>
                        </div>
                    )}

                    {/* Hiện dấu tích nếu vừa follow */}
                    {showCheck && (
                        <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-white rounded-full flex items-center justify-center absolute -bottom-1 md:-bottom-2 lg:-bottom-3 left-1/2 -translate-x-1/2">
                            <Check size={12} className="text-red-500" />
                        </div>
                    )}
                </div>
            </div>

            {/* Interaction Buttons */}
            <div className="flex flex-col items-center gap-4">
                {interactionStats.map((item, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={item.onClick}
                        className="flex flex-col items-center space-y-1"
                    >
                        <div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                            <item.icon
                                size={24}
                                className={item.isActive ? item.activeColor : item.inactiveColor}
                            />
                        </div>
                        {item.count && (
                            <span className="text-white text-xs">{item.count}</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TikTokInteractionPanel;
