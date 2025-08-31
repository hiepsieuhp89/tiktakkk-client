'use client'

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { creators as creatorsMock, type Creator as CreatorModel } from './mockData';

type Creator = {
    id: string;
    displayName: string;
    handle: string;
    verified?: boolean;
    thumbnail: string;
    avatar: string;
    isFollowing?: boolean;
};

const initialCreators: CreatorModel[] = creatorsMock;

const FriendsPage: React.FC = () => {
    const [creators, setCreators] = useState<CreatorModel[]>(initialCreators);

    const toggleFollow = (id: string) => {
        setCreators(prev =>
            prev.map(c => (c.id === id ? { ...c, isFollowing: !c.isFollowing } : c))
        );
    };

    return (
        <div className="h-screen max-w-3xl mx-auto px-4 pb-24 overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-3 gap-6 justify-items-center">
                {creators.map(creator => (
                    <CreatorCard
                        key={creator.id}
                        creator={creator}
                        onToggleFollow={() => toggleFollow(creator.id)}
                    />
                ))}
            </div>
        </div>
    );
};

const CreatorCard: React.FC<{ creator: CreatorModel; onToggleFollow: () => void }> = ({ creator, onToggleFollow }) => {
    const { displayName, handle, verified, thumbnail, avatar, isFollowing } = creator;

    return (
        <div className="relative rounded-2xl overflow-hidden shadow-sm ">
            <div className="relative h-[360px] w-[230px]">
                <img src={thumbnail} alt={displayName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/40" />

                {/* Avatar */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[24%]">
                    <div className="w-14 h-14 rounded-full ring-4 ring-white overflow-hidden">
                        <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Name and handle */}
                <div className="absolute left-0 right-0 top-[40%] flex flex-col items-center px-3">
                    <div className="flex items-center gap-1 text-white font-semibold text-[18px] leading-tight text-center">
                        <span className="truncate max-w-[85%]">{displayName}</span>
                        {verified && (
                            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-sky-500">
                                <Check size={12} className="text-white" />
                            </span>
                        )}
                    </div>
                    <div className="text-white/85 text-sm mt-0.5">{handle}</div>
                </div>

                {/* Follow button */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4">
                    <button
                        onClick={onToggleFollow}
                        type="button"
                        className={`px-6 py-2 rounded-md font-semibold text-sm shadow-md transition-colors ${isFollowing
                            ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                            : 'bg-rose-500 text-white hover:bg-rose-600'
                            }`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FriendsPage;
