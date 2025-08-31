import { useState, useCallback } from 'react';

interface VideoNavigationState {
    currentVideoIndex: number;
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    playbackRate: number;
}

interface VideoNavigationActions {
    play: () => void;
    pause: () => void;
    next: () => void;
    previous: () => void;
    setVideoIndex: (index: number) => void;
    toggleMute: () => void;
    setVolume: (volume: number) => void;
    setPlaybackRate: (rate: number) => void;
}

export const useVideoNavigation = (totalVideos: number = 0) => {
    const [state, setState] = useState<VideoNavigationState>({
        currentVideoIndex: 0,
        isPlaying: false,
        isMuted: false,
        volume: 1,
        playbackRate: 1,
    });

    const play = useCallback(() => {
        setState(prev => ({ ...prev, isPlaying: true }));
    }, []);

    const pause = useCallback(() => {
        setState(prev => ({ ...prev, isPlaying: false }));
    }, []);

    const next = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentVideoIndex: (prev.currentVideoIndex + 1) % totalVideos,
        }));
    }, [totalVideos]);

    const previous = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentVideoIndex: prev.currentVideoIndex === 0
                ? totalVideos - 1
                : prev.currentVideoIndex - 1,
        }));
    }, [totalVideos]);

    const setVideoIndex = useCallback((index: number) => {
        if (index >= 0 && index < totalVideos) {
            setState(prev => ({ ...prev, currentVideoIndex: index }));
        }
    }, [totalVideos]);

    const toggleMute = useCallback(() => {
        setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }, []);

    const setVolume = useCallback((volume: number) => {
        setState(prev => ({
            ...prev,
            volume: Math.max(0, Math.min(1, volume)),
            isMuted: volume === 0 ? true : prev.isMuted
        }));
    }, []);

    const setPlaybackRate = useCallback((rate: number) => {
        setState(prev => ({ ...prev, playbackRate: rate }));
    }, []);

    const actions: VideoNavigationActions = {
        play,
        pause,
        next,
        previous,
        setVideoIndex,
        toggleMute,
        setVolume,
        setPlaybackRate,
    };

    return {
        ...state,
        ...actions,
    };
};

export default useVideoNavigation; 