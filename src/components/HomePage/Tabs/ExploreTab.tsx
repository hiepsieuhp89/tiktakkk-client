"use client"

import React from 'react'
import { mockVideos } from '../mockData'
import { Heart, MessageCircle, Share } from 'lucide-react'

interface ExploreTabProps {
  onOpenVideo: (id: string) => void
}

export default function ExploreTab({ onOpenVideo }: ExploreTabProps) {
  return (
    <div className="h-full p-6 text-white">
      <div className="max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockVideos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onOpenVideo(v.id)}
              className="text-left bg-white/10 hover:bg-white/15 rounded-xl p-4 transition-colors"
            >
              <div className="font-semibold line-clamp-2 mb-2">{v.title}</div>
              <div className="text-white/70 text-sm mb-3">{v.userHandle}</div>
              <div className="flex items-center gap-4 text-xs text-white/80">
                <span className="inline-flex items-center gap-1"><Heart size={14}/> {v.likes.toLocaleString()}</span>
                <span className="inline-flex items-center gap-1"><MessageCircle size={14}/> {v.comments.toLocaleString()}</span>
                <span className="inline-flex items-center gap-1"><Share size={14}/> {v.shares.toLocaleString()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

