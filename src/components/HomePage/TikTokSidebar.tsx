'use client';

import React, { useMemo, useState } from 'react';
import {
    Search,
    Home,
    Compass,
    Users,
    Upload,
    Activity,
    MessageCircle,
    Video,
    User,
    MoreHorizontal
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { mockActivityItems, mockFollowingAccounts, mockMessages } from './mockData';
import { AnimatePresence, motion } from 'framer-motion';
import ActivitySidebar from '@/app/(tiktok)/activity/page';

const TikTokSidebar: React.FC<{ activeId: string }> = ({ activeId }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isActivityOpen, setIsActivityOpen] = useState(false);

    const { navigationItems } = useMemo(() => {
        const activityUnread = mockActivityItems.filter(i => i.unread).length;
        const messagesUnread = mockMessages.reduce((sum, m) => sum + (m.unreadCount || 0), 0);

        return {
            navigationItems: [
                { id: '/', label: 'For You', icon: Home },
                { id: '/explore', label: 'Explore', icon: Compass },
                { id: '/following', label: 'Following', icon: Users },
                { id: '/friends', label: 'Friends', icon: Users },
                { id: '/upload-tab', label: 'Upload', icon: Upload },
                { id: '/activity', label: 'Activity', icon: Activity, notification: activityUnread },
                { id: '/messages', label: 'Messages', icon: MessageCircle, notification: messagesUnread },
                { id: '/live', label: 'LIVE', icon: Video },
                { id: '/profile', label: 'Profile', icon: User },
                { id: '/more', label: 'More', icon: MoreHorizontal },
            ]
        };
    }, []);

    const handleNavigate = (path: string) => {
        if (path === '/activity') {
            setIsActivityOpen(prev => !prev);
        } else {
            setIsActivityOpen(false);
            router.push(path);
        }
    };

    return (
        <div className="w-16 md:w-64 h-full flex flex-col backdrop-blur-md border-white/20 relative">
            {/* Logo */}
            <div className="p-4 flex justify-center md:justify-start">
                <div className="text-xl md:text-2xl font-bold text-white drop-shadow">
                    TikTok
                </div>
            </div>

            {/* Search */}
            <div className="hidden md:block p-4">
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-200"
                        size={16}
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 border border-white/30 bg-white/10 text-white placeholder:text-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Menu */}
            <div className="flex-1 p-2 md:p-4">
                <nav className="space-y-2">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleNavigate(item.id)}
                                className={`w-full flex items-center justify-center md:justify-between px-2 md:px-3 py-2 rounded-lg transition-colors
                                    ${isActive
                                        ? 'bg-pink-500/20 text-pink-200'
                                        : 'text-white hover:bg-white/10'}`}
                            >
                                <div className="flex items-center space-x-0 md:space-x-3">
                                    <item.icon size={20} />
                                    <span className="hidden md:block font-medium">{item.label}</span>
                                </div>
                                {item.notification ? (
                                    <span className="hidden md:block bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                                        {item.notification}
                                    </span>
                                ) : null}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Following accounts */}
            <div className="hidden md:block p-4 border-t border-white/20">
                <h3 className="text-sm font-semibold text-white mb-3">
                    Following accounts
                </h3>
                <div className="space-y-2">
                    {mockFollowingAccounts.map((account) => (
                        <div
                            key={account.username}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
                        >
                            <div className="w-8 h-8 bg-purple-200/40 rounded-full"></div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                    {account.displayName}
                                </div>
                                <div className="text-xs text-purple-200 truncate">
                                    {account.username}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile profile */}
            <div className="md:hidden p-4 border-t border-white/20">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-2 border-pink-400 overflow-hidden">
                        <div className="w-full h-full bg-purple-200/40 rounded-full"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-purple-200/40 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Activity Sidebar */}
            <AnimatePresence>
                {isActivityOpen && (
                    <motion.div
                        key="activity-sidebar"
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="absolute left-64 top-0 h-full bg-white shadow-lg border-l border-gray-200 z-50"
                        style={{ width: '360px' }}
                    >
                        <ActivitySidebar onClose={() => setIsActivityOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TikTokSidebar;
