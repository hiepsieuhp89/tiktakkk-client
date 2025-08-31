"use client"

import React from 'react'
import { mockMessages } from '../mockData'

export default function FriendsTab() {
  return (
    <div className="h-full p-6 text-white">
      <div className="max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Friends</h2>
        <ul className="space-y-2">
          {mockMessages.map((m) => (
            <li key={m.id} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="font-medium">{m.user.name}</div>
                <div className="text-white/70 text-sm">{m.lastMessage}</div>
              </div>
              {m.unreadCount ? (
                <span className="text-xs bg-pink-500 text-white rounded-full px-2 py-1">{m.unreadCount}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

