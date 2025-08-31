"use client"

import React from 'react'
import Image from 'next/image'
import { mockLiveStreams } from '../mockData'

export default function LiveTab() {
  return (
    <div className="h-full p-6 text-white">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">LIVE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLiveStreams.map(l => (
            <div key={l.id} className="bg-white/10 rounded-xl overflow-hidden">
              <div className="relative aspect-video">
                <Image src={l.thumbnail} alt={l.title} fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">LIVE</div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">{l.viewerCount.toLocaleString()} đang xem</div>
              </div>
              <div className="p-3">
                <div className="font-medium line-clamp-1">{l.title}</div>
                <div className="text-sm text-white/70">{l.host.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

