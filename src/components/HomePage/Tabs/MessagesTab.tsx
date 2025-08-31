"use client"

import React from 'react'
import { mockMessages } from '../mockData'

export default function MessagesTab() {
  return (
    <div className="h-full p-6 text-white">
      <div className="max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Messages</h2>
        <ul className="space-y-2">
          {mockMessages.map((m) => (
            <li key={m.id} className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">{m.user.name}</div>
                <div className="text-xs text-white/70">{m.timestamp}</div>
              </div>
              <div className="text-white/80 text-sm">{m.lastMessage}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

