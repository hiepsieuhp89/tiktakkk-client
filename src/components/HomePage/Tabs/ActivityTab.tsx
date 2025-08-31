"use client"

import React from 'react'
import { Activity, Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react'
import { mockActivityItems } from '../mockData'

export default function ActivityTab() {
  const iconMap: Record<string, any> = {
    like: Heart,
    comment: MessageCircle,
    follow: UserPlus,
    mention: AtSign,
  }
  return (
    <div className="h-full p-6 text-white">
      <div className="max-w-xl">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Activity size={20}/> Activity</h2>
        <ul className="space-y-2">
          {mockActivityItems.map((a) => {
            const Icon = iconMap[a.type]
            return (
              <li key={a.id} className={`bg-white/10 rounded-lg p-4 flex items-center gap-3 ${a.unread ? 'ring-1 ring-pink-400/40' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-white/30" />
                <div className="flex-1">
                  <div className="text-sm"><span className="font-semibold">{a.user.name}</span> {a.text}</div>
                  <div className="text-xs text-white/70">{a.time}</div>
                </div>
                <Icon size={16} className="text-white/70" />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

