import React from 'react'
import {
  Bell,
  Bookmark,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Search,
  Sparkles,
} from 'lucide-react'
import { BottomNav } from '../../components/layout/BottomNav'
import { MiniPlayer } from '../../components/layout/MiniPlayer'
import { NARRATORS } from '../../constants/data'
import { useApp } from '../../context/AppContext'
import { useAudio } from '../../context/AudioContext'

const CATEGORIES = ['All', 'AI & Tech', 'Markets', 'Startups', 'Science']

export const MorningBriefView: React.FC = () => {
  const { userPreferences, selectedCategory, setSelectedCategory, goToScreen, toggleBookmark } =
    useApp()
  const {
    currentStory,
    isPlaying,
    currentTime,
    duration,
    playbackRate,
    waveformBars,
    togglePlay,
    skip,
    setRate,
  } = useAudio()

  const narrator =
    NARRATORS.find((n) => n.id === userPreferences.narratorId) || NARRATORS[0]

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const remaining = Math.max(0, duration - currentTime)

  const handleNextRate = () => {
    if (playbackRate === 1) setRate(1.25)
    else if (playbackRate === 1.25) setRate(1.5)
    else setRate(1)
  }

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#09090f] bg-ambient-violet overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 px-5 py-3 overflow-y-auto no-scrollbar">
        {/* Top App Bar */}
        <header className="flex items-center justify-between py-2 border-b border-[#181826]/70">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white fill-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">Nuzio</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => goToScreen('notifications')}
              className="relative text-slate-400 hover:text-white"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
            </button>

            <button
              type="button"
              onClick={() => goToScreen('discover')}
              className="text-slate-400 hover:text-white"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => goToScreen('settings')}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-[10px] font-bold flex items-center justify-center"
            >
              {userPreferences.name?.[0] || 'A'}
            </button>
          </div>
        </header>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 py-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-400 text-black font-bold shadow-sm shadow-emerald-500/20'
                  : 'bg-[#151522] text-slate-400 hover:text-white border border-[#232336]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Greeting & Date Header */}
        <div className="mt-2 mb-4">
          <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-1">
            Sunday • 20 July • Morning Brief
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
            Good morning, {userPreferences.name || 'Aarav'} —{' '}
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              6 things.
            </span>
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-[#141422] text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-900/40">
              <Headphones className="w-2.5 h-2.5" />
              {narrator.name} (Voice)
            </span>
            <span className="text-[10px] text-slate-400 bg-[#141420] px-2 py-0.5 rounded-full border border-[#212133]">
              6 stories
            </span>
            <span className="text-[10px] text-slate-400 bg-[#141420] px-2 py-0.5 rounded-full border border-[#212133]">
              10:15
            </span>
          </div>
        </div>

        {/* Main Audio Player Card */}
        <div className="p-4 rounded-3xl bg-[#12121e] border border-[#232338] shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800/40 uppercase tracking-wider">
                Now Playing
              </span>
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40 uppercase tracking-wider">
                {currentStory.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-medium text-slate-500">01 / 06</span>
              <button
                type="button"
                onClick={() => toggleBookmark(currentStory.id)}
                className="text-slate-400 hover:text-white"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    currentStory.bookmarked
                      ? 'fill-[#8b5cf6] text-[#8b5cf6]'
                      : 'text-slate-400'
                  }`}
                />
              </button>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-white leading-snug mb-1.5">
            {currentStory.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
            {currentStory.excerpt}
          </p>

          {/* Source Attribution Link */}
          <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-3">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">{currentStory.source}</span>
            <span>•</span>
            <span>{currentStory.durationText.split('•')[1] || '3 min'}</span>
            <span>•</span>
            <span className="text-indigo-400 hover:underline cursor-pointer">Source ↗</span>
          </div>

          {/* Dynamic Waveform Visualizer */}
          <div className="h-10 flex items-center justify-between gap-1 px-1 mb-2">
            {waveformBars.map((height, i) => (
              <span
                key={i}
                style={{ height: `${height}%` }}
                className={`w-1 rounded-full transition-all duration-150 ${
                  i < 10
                    ? 'bg-gradient-to-t from-[#6366f1] to-[#8b5cf6]'
                    : 'bg-[#2b2b40]'
                }`}
              />
            ))}
          </div>

          {/* Time Scrubber Values */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-4 px-1">
            <span>{formatTime(currentTime)}</span>
            <span>-{formatTime(remaining)}</span>
          </div>

          {/* Player Controls Bar */}
          <div className="flex items-center justify-between px-2 pt-1 border-t border-[#1e1e30]">
            <button
              type="button"
              onClick={handleNextRate}
              className="text-[11px] font-bold text-slate-400 hover:text-white px-2 py-1 rounded bg-[#1a1a2b] border border-[#27273d]"
            >
              {playbackRate}x
            </button>

            <button
              type="button"
              onClick={() => skip(-15)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Glowing Big Play Button */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] blur-md opacity-50" />
              <button
                type="button"
                onClick={togglePlay}
                className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center shadow-xl shadow-indigo-600/50 active:scale-95 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => skip(15)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => goToScreen('discover')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Next →
            </button>
          </div>
        </div>
        </div>

      {/* Mini Player */}
      <MiniPlayer />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
