'use client';

import { VideoNavigationProvider } from '@/context/VideoNavigationContext';
import { useVideoNavigation } from '@/hooks/useVideoNavigation';
import { Bookmark, Check, ChevronDown, ChevronUp, Heart, MessageCircle, Share } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { mockVideos, VideoData } from './mockData';
import TikTokInteractionPanel from './TikTokInteractionPanel';
import TikTokSidebar from './TikTokSidebar';
import TikTokVideoPlayer, { TikTokVideoPlayerHandle } from './TikTokVideoPlayer';
import UploadSidebar from '@/app/(tiktok)/upload-tab/UploadSidebar';
import FollowingPage from '@/app/(tiktok)/following/page';

const TikTokLayout: React.FC = () => {
  const videoNavigation = useVideoNavigation(mockVideos.length);
  const { currentVideoIndex: currentIndex, next: goToNextVideo, previous: goToPrevVideo } = videoNavigation;
  const canGoNext = currentIndex < mockVideos.length - 1;
  const canGoPrev = currentIndex > 0;

  const [activeTab, setActiveTab] = useState<string>('forYou');
  const [currentVideo, setCurrentVideo] = useState<VideoData>(mockVideos[0]);
  const [followedUserIds, setFollowedUserIds] = useState<Record<string, boolean>>(
    () => Object.fromEntries(mockVideos.map(v => [v.user.id, v.user.isFollowing]))
  );
  const [followedFollowingUserHandles, setFollowedFollowingUserHandles] = useState<Record<string, boolean>>({});
  const [followingShowCheck, setFollowingShowCheck] = useState(false);

  const playerRef = useRef<TikTokVideoPlayerHandle | null>(null);

  /** Navigation handlers */
  const handleNext = () => { playerRef.current?.scrollToNext(); goToNextVideo(); };
  const handlePrev = () => { playerRef.current?.scrollToPrev(); goToPrevVideo(); };

  /** Interaction handlers */
  const toggleLike = () => {
    setCurrentVideo(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };
  const toggleBookmark = () => {
    setCurrentVideo(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }));
  };
  const handleFollowUser = (userId: string) => {
    setFollowedUserIds(prev => ({ ...prev, [userId]: true }));
  };

  /** Following tab handlers */


  /** Key navigation */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (event.key === 'ArrowDown' && canGoNext) { event.preventDefault(); handleNext(); }
      if (event.key === 'ArrowUp' && canGoPrev) { event.preventDefault(); handlePrev(); }
    };
    window.addEventListener('keydown', onKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [canGoNext, canGoPrev]);


  /** Render forYou tab */
  const renderForYouTab = () => (
    <div className="flex h-full items-center justify-center p-5">
      <div className="max-w-[500px] w-full h-full relative">
        <TikTokVideoPlayer ref={playerRef} onCurrentVideoChange={setCurrentVideo} />
      </div>
      <div className="w-16 h-full flex flex-col items-center justify-end ml-4 pb-2 self-end">
        <TikTokInteractionPanel
          currentVideo={currentVideo}
          onLike={toggleLike}
          onBookmark={toggleBookmark}
          isUserFollowed={!!followedUserIds[currentVideo.user.id]}
          onFollowUser={() => handleFollowUser(currentVideo.user.id)}
        />
      </div>
      {renderNavButtons()}
    </div>
  );

  /** Render following tab */
  const renderFollowingTab = () => (
    <div className="flex h-full items-center justify-center p-5">
      <div className="max-w-[500px] w-full h-full relative">
        <FollowingPage ref={playerRef}/>
      </div>
      {renderNavButtons()}
    </div>
  );

  /** Navigation buttons */
  const renderNavButtons = () => (
    <div className="absolute right-4 bottom-1/2 transform translate-y-1/2 flex flex-col items-center gap-3">
      <NavButton icon={<ChevronUp size={20} />} onClick={handlePrev} disabled={!canGoPrev} />
      <NavButton icon={<ChevronDown size={20} />} onClick={handleNext} disabled={!canGoNext} />
    </div>
  );

  return (
    <VideoNavigationProvider value={{ goToNextVideo, goToPrevVideo, canGoNext, canGoPrev }}>
      <div className="flex h-screen relative overflow-hidden pt-10" style={{
        background: `
          radial-gradient(ellipse at 60% 20%, #ff2e7e55 0%, #8a00ff00 60%),
          radial-gradient(ellipse at 20% 80%, #8a00ff55 0%, #ff2e7e00 60%),
          linear-gradient(120deg, #733376 0%, #ac4e75 50%, #3e1b6d 100%)
        `
      }}>
        {activeTab === 'upload'
          ? <UploadSidebar />
          : (
            <div>
              <TikTokSidebar activeId={''} />
            </div>
          )
        }

        {/* Nội dung */}
        <div className="flex-1 flex flex-col relative z-10">
          <div className="flex-1 relative">
            {activeTab === 'forYou' && renderForYouTab()}
          </div>
        </div>
      </div>
    </VideoNavigationProvider>
  );
};

/** Reusable components */
  const NavButton = ({ icon, onClick, disabled }: { icon: React.ReactNode; onClick: () => void; disabled?: boolean }) => (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 hover:bg-gray-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {icon}
    </button>
  );

const IconButton = ({ icon, label, onClick }: { icon: React.ReactNode; label?: number; onClick?: () => void }) => (
  <button type="button" onClick={onClick} className="flex flex-col items-center space-y-1">
    <div className="w-12 h-12 bg-black bg-opacity-30 rounded-full flex items-center justify-center">{icon}</div>
    {label !== undefined && <span className="text-white text-xs">{label}</span>}
  </button>
);

export default TikTokLayout;
