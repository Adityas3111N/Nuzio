import React, { useState } from 'react'
import {
  Bell,
  Bookmark,
  Pause,
  Play,
  Search,
} from 'lucide-react'
import { BottomNav } from '../../components/layout/BottomNav'
import { MiniPlayer } from '../../components/layout/MiniPlayer'
import { useApp } from '../../context/AppContext'
import { useAudio } from '../../context/AudioContext'
import type { Story } from '../../types'

const CATEGORIES = ['All', 'AI & Tech', 'Markets', 'Startups', 'Science']

export const DiscoverView: React.FC = () => {
  const { stories, selectedCategory, setSelectedCategory, toggleBookmark, goToScreen } =
    useApp()
  const { playStory, currentStory, isPlaying } = useAudio()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStories = stories.filter((story) => {
    const matchesCat =
      selectedCategory === 'All' ||
      story.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const handlePlayStory = (story: Story) => {
    playStory(story)
    goToScreen('brief')
  }

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#09090f] bg-ambient-violet overflow-hidden">
      <div className="flex-1 px-5 py-3 overflow-y-auto no-scrollbar">
        {/* Header Title & Icons */}
        <div className="flex items-center justify-between pt-2 pb-1">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Discover</h2>
            <p className="text-xs text-slate-400">Instant audio — explore the world.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goToScreen('notifications')}
              className="text-slate-400 hover:text-white"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => goToScreen('settings')}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-[10px] font-bold flex items-center justify-center"
            >
              A
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-3 mt-2">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stories, sources, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#13131e] border border-[#202030] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6366f1] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-400 text-black font-bold shadow-sm shadow-emerald-500/20'
                  : 'bg-[#151522] text-slate-400 hover:text-white border border-[#232336]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Story Feed */}
        <div className="flex flex-col gap-3.5 pb-4">
          {filteredStories.map((story) => {
            const isCurrentPlaying = currentStory.id === story.id && isPlaying

            return (
              <div
                key={story.id}
                className="p-4 rounded-2xl bg-[#12121d] border border-[#1f1f2e] hover:border-[#2a2a3e] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 uppercase tracking-wider">
                      {story.category}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 bg-[#161622] px-2 py-0.5 rounded border border-slate-700/50 uppercase tracking-wider">
                      {story.source}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-white leading-snug mb-1.5">
                  {story.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {story.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#1c1c2b]">
                  <span className="text-[10px] text-slate-400">{story.durationText}</span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleBookmark(story.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          story.bookmarked
                            ? 'fill-[#8b5cf6] text-[#8b5cf6]'
                            : 'text-slate-500'
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePlayStory(story)}
                      className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-3 h-3 fill-current" />
                      ) : (
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mini Player */}
      <MiniPlayer />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
