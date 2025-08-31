'use client';

import '../globals.css';

import { usePathname } from 'next/navigation';
import UploadSidebar from './upload-tab/UploadSidebar';
import TikTokSidebar from '@/components/HomePage/TikTokSidebar';

export default function TikTokRootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const activeTab = pathname.split('/')[1] || 'for-you';

    return (
        <div
            className="flex h-screen relative overflow-hidden pt-10"
            style={{
                background: `
          radial-gradient(ellipse at 60% 20%, #ff2e7e55 0%, #8a00ff00 60%),
          radial-gradient(ellipse at 20% 80%, #8a00ff55 0%, #ff2e7e00 60%),
          linear-gradient(120deg, #733376 0%, #ac4e75 50%, #3e1b6d 100%)
        `
            }}
        >
            {activeTab === 'upload-tab'
                ? <UploadSidebar />
                : <TikTokSidebar activeId={activeTab} />
            }
            <div className="flex-1 flex flex-col relative z-10">
                {children}
            </div>
        </div>
    );
}
