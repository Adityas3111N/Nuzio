import React from 'react'
import { Pause, Play } from 'lucide-react'
import { useAudio } from '../../context/AudioContext'
import { useApp } from '../../context/AppContext'

export const MiniPlayer: React.FC = () => {
  const { currentStory, isPlaying, togglePlay } = useAudio()
  const { goToScreen } = useApp()

  if (!currentStory) return null

  return (
    <div className="md:hidden px-4 py-2 bg-[#09090e] border-t border-[#1a1a28] flex items-center justify-between gap-3 shrink-0">
      <div
        className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
        onClick={() => goToScreen('brief')}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <p className="text-[11px] text-slate-300 truncate font-normal">
          <span className="text-slate-500 mr-1">Now narrating —</span>
          {currentStory.title}
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          togglePlay()
        }}
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
      </button>
    </div>
  )
}
