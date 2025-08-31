'use client'

import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Heart, MessageCircle, Bookmark, Share, Play, Pause, Volume2, MoreHorizontal, MapPin, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useVideoNavigation } from '@/hooks/useVideoNavigation';
import { VideoNavigationProvider } from '@/context/VideoNavigationContext';
import { followingVideos, type FollowingVideo } from './mockdata';
import { mockVideos } from '@/components/HomePage/mockData';

interface FollowingPageProps {
    onCurrentVideoChange?: (video: FollowingVideo) => void;
}

export interface FollowingPageHandle {
    scrollToIndex: (index: number) => void;
    scrollToNext: () => void;
    scrollToPrev: () => void;
}

const FollowingPage = forwardRef<FollowingPageHandle, FollowingPageProps>(({ onCurrentVideoChange }, ref) => {
    const [videos] = useState<FollowingVideo[]>(followingVideos);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [showStoriesBar, setShowStoriesBar] = useState(true);
    const [followedFollowingUserHandles, setFollowedFollowingUserHandles] = useState<Record<string, boolean>>({});
    const [followingShowCheck, setFollowingShowCheck] = useState(false);
    const [currentFollowingVideo, setCurrentFollowingVideo] = useState<FollowingVideo | null>(null);

    const toggleFollowingLike = () => {
        setCurrentFollowingVideo(prev =>
            prev ? { ...prev, isLiked: !prev.isLiked, likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1 } : prev
        );
    };
    const toggleFollowingBookmark = () => {
        setCurrentFollowingVideo(prev => prev ? { ...prev, isBookmarked: !prev.isBookmarked } : prev);
    };

    // Thêm trong useEffect để cập nhật currentFollowingVideo
    useEffect(() => {
        setCurrentFollowingVideo(videos[currentVideoIndex]);
        if (onCurrentVideoChange) onCurrentVideoChange(videos[currentVideoIndex]);
    }, [currentVideoIndex, videos, onCurrentVideoChange]);

    const handleFollowingFollowUser = () => {
        if (!currentFollowingVideo) return;
        const handle = currentFollowingVideo.userHandle;
        if (followedFollowingUserHandles[handle]) return;
        setFollowedFollowingUserHandles(prev => ({ ...prev, [handle]: true }));
        setFollowingShowCheck(true);
        setTimeout(() => setFollowingShowCheck(false), 1500);
    };
    // Hàm xác định video đang ở giữa màn hình
    const updateCurrentVideoIndex = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const children = Array.from(container.children) as HTMLElement[];
        let minDiff = Infinity;
        let activeIndex = 0;
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;
        children.forEach((child, idx) => {
            const rect = child.getBoundingClientRect();
            const childCenter = rect.top + rect.height / 2;
            const diff = Math.abs(childCenter - containerCenter);
            if (diff < minDiff) {
                minDiff = diff;
                activeIndex = idx;
            }
        });
        setCurrentVideoIndex(activeIndex);
    };

    useEffect(() => {
        if (onCurrentVideoChange) onCurrentVideoChange(videos[currentVideoIndex]);
    }, [currentVideoIndex, videos, onCurrentVideoChange]);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (!container) return;
            updateCurrentVideoIndex();
            const shouldHide = container.scrollTop > 12;
            setShowStoriesBar(!shouldHide);
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const scrollToIndex = useCallback((index: number) => {
        if (index < 0 || index >= videos.length) return;
        const target = videoRefs.current[index];
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [videos.length]);

    const scrollToNext = useCallback(() => {
        const nextIndex = Math.min(currentVideoIndex + 1, videos.length - 1);
        scrollToIndex(nextIndex);
    }, [currentVideoIndex, videos.length, scrollToIndex]);

    const scrollToPrev = useCallback(() => {
        const prevIndex = Math.max(currentVideoIndex - 1, 0);
        scrollToIndex(prevIndex);
    }, [currentVideoIndex, scrollToIndex]);

    useImperativeHandle(ref, () => ({
        scrollToIndex,
        scrollToNext,
        scrollToPrev,
    }), [scrollToIndex, scrollToNext, scrollToPrev]);

    const IconButton = ({ icon, label, onClick }: { icon: React.ReactNode; label?: number; onClick?: () => void }) => (
        <button type="button" onClick={onClick} className="flex flex-col items-center space-y-1">
            <div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">{icon}</div>
            {label !== undefined && <span className="text-white text-xs">{label}</span>}
        </button>
    );


    const canGoPrev = currentVideoIndex > 0;
    const canGoNext = currentVideoIndex < videos.length - 1;

    const renderNavButtons = () => (
        <div className="flex flex-col items-center gap-3">
            <button
                onClick={scrollToPrev}
                disabled={!canGoPrev}
                className={`p-2 rounded-full bg-black bg-opacity-30 text-white ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <ChevronUp size={20} />
            </button>
            <button
                onClick={scrollToNext}
                disabled={!canGoNext}
                className={`p-2 rounded-full bg-black bg-opacity-30 text-white ${!canGoNext ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <ChevronDown size={20} />
            </button>
        </div>
    );
    const NavButton = ({ icon, onClick, disabled }: { icon: React.ReactNode; onClick: () => void; disabled?: boolean }) => (
        <button type="button" onClick={onClick} disabled={disabled}
            className={`w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 hover:bg-gray-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {icon}
        </button>
    );
    return (
        <div className="h-full max-w-[1440px] mx-auto">
            {/* Live stories bar */}
            <div
                className={`sticky top-0 z-10 bg-transparent overflow-hidden transition-[opacity,transform,max-height,padding] duration-300
                ${showStoriesBar ? 'opacity-100 translate-y-0 max-h-28 px-4 pt-2 pb-4' : 'opacity-0 -translate-y-3 max-h-0 px-4 pt-0 pb-0 pointer-events-none'}`}
            >
                <div className="max-w-[1440px] mx-auto flex items-center gap-6 overflow-x-auto scrollbar-hide">
                    {Array.from(new Map(videos.map(v => [v.userHandle, v])).values()).map((v) => (
                        <div key={v.userHandle} className="flex flex-col items-center w-16 flex-shrink-0">
                            <div className="relative">
                                <div className="p-[3px] rounded-full bg-[conic-gradient(at_top_left,_#ff2e7e,_#f0a,_#ff2e7e)]">
                                    <div className="w-14 h-14 rounded-full bg-white p-[2px]">
                                        <img src="/images/default-avatar.jpg" alt={v.userHandle} className="w-full h-full rounded-full object-cover" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold tracking-wide">
                                    LIVE
                                </div>
                            </div>
                            <div className="mt-3 text-[11px] text-gray-800 font-semibold truncate w-full text-center">
                                {v.userHandle.replace('@', '')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Main Video Player */}
            <div className="h-full relative">
                <div
                    ref={containerRef}
                    className="flex-1 flex flex-col relative h-full overflow-y-auto scrollbar-hide tiktok-video-container"
                    style={{ scrollSnapType: 'y mandatory', scrollPaddingTop: '2.5rem', scrollPaddingBottom: '2.5rem' }}
                >
                    {videos.map((video, index) => (
                        <div
                            key={video.id}
                            ref={(el) => {
                                videoRefs.current[index] = el;
                            }}
                            className="w-full h-full flex-shrink-0 relative"
                            style={{ scrollSnapAlign: 'center', scrollMarginTop: '2.5rem', scrollMarginBottom: '2.5rem' }}
                        >
                            {/* Video Container */}
                            <div className="h-full flex items-center justify-center relative gap-0">
                                {/* Video Frame */}
                                <div className="h-full relative flex items-center justify-center">
                                    {/* Video Content - Muddy Landscape with Pig */}
                                    <div className="w-full h-full relative flex items-center justify-center">
                                        <div className="rounded-2xl min-w-[500px] h-full bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 relative flex items-center justify-center overflow-hidden">
                                            {/* Muddy Water Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-amber-600/80 via-amber-500/60 to-amber-400/40"></div>
                                            {/* Muddy Surface */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-amber-800/90 rounded-t-full"></div>
                                            {/* Pig Silhouette */}
                                            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-amber-900 rounded-full opacity-80"></div>
                                            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-amber-900 rounded-full opacity-80 -ml-4"></div>
                                            {/* Play Button Overlay */}
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                                                <Play className="w-8 h-8 text-white ml-1" />
                                            </div>
                                        </div>
                                        {/* Video Overlay */}
                                        <div className="absolute top-0 left-0 right-0 bottom-0 p-5 flex flex-col justify-between pointer-events-none">
                                            {/* Top UI Elements */}
                                            <div className="flex justify-between items-start">
                                                <button className="w-8 h-8 bg-black bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto">
                                                    <Volume2 size={16} className="text-white" />
                                                </button>
                                                <button className="w-8 h-8 bg-black bg-opacity-30 rounded-full flex items-center justify-center cursor-pointer pointer-events-auto">
                                                    <MoreHorizontal size={16} className="text-white" />
                                                </button>
                                            </div>
                                            {/* Text Overlay on Video */}
                                            <div className="absolute top-1/4 left-5 right-20 text-white text-sm font-medium drop-shadow-lg leading-relaxed">
                                                {video.title}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Video Description - Bottom Section */}
                            <div className="left-48 absolute bottom-0 bg-gradient-to-t to-transparent p-5 text-gray-800 rounded-b-xl">
                                {/* Location */}
                                {video.location && (
                                    <div className="flex items-center text-xs text-gray-600 mb-2">
                                        <MapPin size={12} className="mr-1 text-green-600" />
                                        {video.location}
                                    </div>
                                )}
                                {/* Username */}
                                <div className="text-sm font-semibold text-gray-800 mb-1">
                                    {video.userHandle}
                                </div>
                                {/* Hashtags */}
                                <div className="text-xs text-gray-600 mb-1">
                                    {video.hashtags.join(' ')}
                                </div>
                                {/* Music Info */}
                                <div className="text-xs text-gray-600 mb-1">
                                    {video.musicInfo}
                                </div>
                                {/* More Link */}
                                <div className="text-xs text-blue-500 cursor-pointer">
                                    more
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative bottom-20 left-72 flex flex-col items-center space-y-4 z-10 pt-20">
                {/* Side Action Buttons */}
                {currentFollowingVideo && (
                    <div className="absolute bottom-20 flex flex-col items-center space-y-4 z-20">
                        {/* Follow Avatar */}
                        <div className="flex flex-col items-center gap-2 mb-4 relative">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                                <div className="w-full h-full bg-gray-300 rounded-full" />
                                {!followedFollowingUserHandles[currentFollowingVideo.userHandle] && !followingShowCheck && (
                                    <div
                                        onClick={handleFollowingFollowUser}
                                        className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer text-white font-bold text-sm"
                                    >
                                        +
                                    </div>
                                )}
                                {followingShowCheck && (
                                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center absolute -bottom-2 left-1/2 -translate-x-1/2">
                                        <Check size={12} className="text-red-500" />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Like */}
                        <IconButton
                            icon={<Heart size={24} className={currentFollowingVideo.isLiked ? 'text-red-500 fill-current' : 'text-white'} />}
                            label={currentFollowingVideo.likes}
                            onClick={toggleFollowingLike}
                        />
                        {/* Comment */}
                        <IconButton icon={<MessageCircle size={24} className="text-white" />} label={currentFollowingVideo.comments} />
                        {/* Share */}
                        <IconButton icon={<Share size={24} className="text-white" />} label={currentFollowingVideo.shares} />
                        {/* Bookmark */}
                        <IconButton
                            icon={<Bookmark size={24} className={currentFollowingVideo.isBookmarked ? 'text-yellow-400 fill-current' : 'text-white'} />}
                            onClick={toggleFollowingBookmark}
                        />
                    </div>
                )}
                <div className="absolute -right-20 bottom-1/2 transform -translate-y-96 flex flex-col items-center gap-3">
                    {renderNavButtons()}
                </div>
            </div>
        </div>
    );
});

export default FollowingPage;
