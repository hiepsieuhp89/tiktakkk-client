'use client'

import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Heart, MessageCircle, Bookmark, Share, Play, Pause, Volume2, MoreHorizontal, MapPin } from 'lucide-react';
import { useVideoNavigation } from '@/hooks/useVideoNavigation';
import { VideoNavigationProvider } from '@/context/VideoNavigationContext';
import TikTokInteractionPanel from './TikTokInteractionPanel';
import { mockVideos, VideoData } from './mockData';

interface TikTokVideoPlayerProps {
    onCurrentVideoChange?: (video: VideoData) => void;
}

export interface TikTokVideoPlayerHandle {
    scrollToIndex: (index: number) => void;
    scrollToNext: () => void;
    scrollToPrev: () => void;
}

const TikTokVideoPlayer = forwardRef<TikTokVideoPlayerHandle, TikTokVideoPlayerProps>(({ onCurrentVideoChange }, ref) => {
    const [videos] = useState<VideoData[]>(mockVideos);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

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
            updateCurrentVideoIndex();
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

    return (
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
                                        {/* isPlaying state is not defined in this component, so this will cause an error */}
                                        {/* Assuming isPlaying is a state or prop that should be managed here */}
                                        {/* For now, keeping the original code structure */}
                                        {/* <Pause className="w-8 h-8 text-white" /> */}
                                        {/* <Play className="w-8 h-8 text-white ml-1" /> */}
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
                    <div className="min-w-[500px] absolute bottom-0 bg-gradient-to-t to-transparent p-5 text-gray-800 rounded-b-xl">
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
    );
});

export default TikTokVideoPlayer;