"use client";

import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'

interface ActivitySidebarProps {
    onClose: () => void
}

export default function ActivitySidebar({ onClose }: ActivitySidebarProps) {
    // Thêm lắng nghe phím X
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'x') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="w-[360px] h-screen bg-white flex flex-col border-r border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <h2 className="text-lg font-bold">Notifications</h2>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Tabs */}
            <div className="px-4 py-2 border-b flex flex-wrap gap-2">
                <button className="px-3 py-1 rounded-full bg-black text-white text-sm font-medium">
                    All activity
                </button>
                <button className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200">
                    Likes
                </button>
                <button className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200">
                    Comments
                </button>
                <button className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200">
                    Mentions and tags
                </button>
                <button className="px-3 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200">
                    Followers
                </button>
            </div>

            {/* Notifications */}
            <div className="flex-1 overflow-y-auto">
                {/* System notification */}
                <div className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full relative">
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold">System Notifications</p>
                        <p className="text-xs text-gray-500">
                            Transaction Assistant: Bạn có thể rút tối đa $100 mỗi ngày
                        </p>
                    </div>
                </div>

                {/* Example notification */}
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <Image
                        src="https://i.pravatar.cc/40?img=1"
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div className="flex-1">
                        <p className="text-sm">
                            <span className="font-semibold">QuynhNhu</span> started following you.
                        </p>
                        <span className="text-xs text-gray-500">6d ago</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <Image
                        src="https://i.pravatar.cc/40?img=2"
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div className="flex-1">
                        <p className="text-sm">
                            <span className="font-semibold">Quynh Hoa</span> liked your photos.
                        </p>
                        <span className="text-xs text-gray-500">1w ago</span>
                    </div>
                    <Image
                        src="https://via.placeholder.com/40"
                        alt="thumbnail"
                        width={40}
                        height={40}
                        className="rounded"
                    />
                </div>
            </div>
        </div>
    )
}
