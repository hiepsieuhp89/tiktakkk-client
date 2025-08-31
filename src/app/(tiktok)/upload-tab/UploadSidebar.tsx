"use client";

import { BarChart3, ChevronLeft, FileText, GraduationCap, Home, Lightbulb, Mail, MessageCircle, Music } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function UploadSidebar(): JSX.Element {
    const router = useRouter();
    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/'); // Trang mặc định khi không có lịch sử
        }
    };
    return (
        <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
            {/* TikTok Studio Logo */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold text-black">
                        <span className="text-red-500">TikTok</span>
                        <span className="text-blue-500">Studio</span>
                    </div>
                </div>
            </div>

            {/* Upload Button */}
            <div className="p-6">
                <button className="w-full text-gray-700 rounded-lg py-3 px-4 flex items-center justify-center space-x-2 transition-colors">
                    <span className="text-xl font-bold">+</span>
                    <span className="font-medium">Upload</span>
                </button>
            </div>

            {/* Navigation Sections */}
            <div className="flex-1 px-6 space-y-8">
                {/* MANAGE Section */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">MANAGE</h3>
                    <div className="space-y-2">
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <Home size={20} />
                            <span>Home</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <FileText size={20} />
                            <span>Posts</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <BarChart3 size={20} />
                            <span>Analytics</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <MessageCircle size={20} />
                            <span>Comments</span>
                        </button>
                    </div>
                </div>

                {/* TOOLS Section */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">TOOLS</h3>
                    <div className="space-y-2">
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <Lightbulb size={20} />
                            <span>Inspiration</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <GraduationCap size={20} />
                            <span>Creator Academy</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <Music size={20} />
                            <span>Unlimited Sounds</span>
                        </button>
                    </div>
                </div>

                {/* OTHERS Section */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">OTHERS</h3>
                    <div className="space-y-2">
                        <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700">
                            <Mail size={20} />
                            <span>Feedback</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Back to TikTok Link */}
            <div className="p-6 border-t border-gray-100">
                <Link
                    href="/"
                    className="w-full flex items-center space-x-2 text-gray-600 hover:text-black-dark transition-colors"
                >
                    <ChevronLeft size={16} />
                    <span className="text-sm">Back to TikTok</span>
                </Link>
            </div>
        </div>
    );
}
