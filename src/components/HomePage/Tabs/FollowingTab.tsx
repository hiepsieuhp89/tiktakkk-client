"use client"

import React from 'react'
import { mockFollowingVideos } from '../mockData'

interface FollowingTabProps {
  onOpenVideo: (id: string) => void
}

export default function FollowingTab({ onOpenVideo }: FollowingTabProps) {
  return (
    <div className="h-full p-6 text-white">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Following</h2>
        <div className="space-y-3">
          {mockFollowingVideos.map(v => (
            <button
              key={v.id}
              type="button"
              onClick={() => onOpenVideo(v.id)}
              className="w-full text-left bg-white/10 hover:bg-white/15 rounded-lg p-4 transition-colors"
            >
              <div className="font-medium">{v.userHandle}</div>
              <div className="text-sm text-white/80 line-clamp-2">{v.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

