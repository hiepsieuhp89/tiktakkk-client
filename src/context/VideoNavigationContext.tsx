import React, { createContext, useContext, ReactNode } from 'react';

interface VideoNavigationContextType {
  goToNextVideo: () => void;
  goToPrevVideo: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

const VideoNavigationContext = createContext<VideoNavigationContextType | undefined>(undefined);

export const useVideoNavigationContext = () => {
  const context = useContext(VideoNavigationContext);
  if (context === undefined) {
    throw new Error('useVideoNavigationContext must be used within a VideoNavigationProvider');
  }
  return context;
};

interface VideoNavigationProviderProps {
  children: ReactNode;
  value: VideoNavigationContextType;
}

export const VideoNavigationProvider: React.FC<VideoNavigationProviderProps> = ({ children, value }) => {
  return (
    <VideoNavigationContext.Provider value={value}>
      {children}
    </VideoNavigationContext.Provider>
  );
}; 