"use client"

import React from 'react'

export default function MoreTab() {
  const items = [
    { id: 'settings', label: 'Settings' },
    { id: 'help', label: 'Help Center' },
    { id: 'report', label: 'Report a Problem' },
  ]
  return (
    <div className="h-full p-6 text-white">
      <div className="max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">More</h2>
        <ul className="space-y-2">
          {items.map(i => (
            <li key={i.id} className="bg-white/10 hover:bg-white/15 rounded-lg p-3 cursor-pointer">{i.label}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

