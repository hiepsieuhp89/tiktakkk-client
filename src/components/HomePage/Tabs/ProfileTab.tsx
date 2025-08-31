"use client"

import React from 'react'
import { currentUser, mockVideos } from '../mockData'

export default function ProfileTab() {
  const myVideos = mockVideos.slice(0, 3)
  return (
    <div className="h-full p-6 text-white">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/30" />
          <div>
            <div className="text-xl font-semibold">{currentUser.name}</div>
            <div className="text-white/70 text-sm">@me</div>
          </div>
        </div>
        <h3 className="font-semibold mb-2">Videos</h3>
        <ul className="space-y-2">
          {myVideos.map(v => (
            <li key={v.id} className="bg-white/10 rounded-lg p-3">
              <div className="font-medium line-clamp-1">{v.title}</div>
              <div className="text-xs text-white/70">{v.timestamp}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

