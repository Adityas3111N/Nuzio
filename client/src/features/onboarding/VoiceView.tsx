import React, { useState } from 'react'
import { ArrowLeft, Pause, Play } from 'lucide-react'
import { NARRATORS } from '../../constants/data'
import { useApp } from '../../context/AppContext'

const DURATION_OPTIONS = [
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
  { value: 20, label: 'Custom' },
]

export const VoiceView: React.FC = () => {
  const { userPreferences, updatePreferences, goToScreen } = useApp()
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null)

  const selectedVoice =
    NARRATORS.find((n) => n.id === userPreferences.narratorId) || NARRATORS[0]

  const handleSelectVoice = (id: string) => {
    updatePreferences({ narratorId: id })
  }

  const toggleSample = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setPlayingVoiceId((prev) => (prev === id ? null : id))
  }

  const handleSelectDuration = (min: number) => {
    updatePreferences({ briefLengthMinutes: min })
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#09090f] bg-ambient-violet overflow-y-auto no-scrollbar">
      <div>
        {/* Top Stepper */}
        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            onClick={() => goToScreen('topics')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-bold tracking-widest text-[#8b5cf6] uppercase">
            Step 3 of 5
          </span>

          <button
            type="button"
            onClick={() => goToScreen('time')}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Skip →
          </button>
        </div>

        {/* 5-step progress bar */}
        <div className="grid grid-cols-5 gap-1.5 my-3">
          <div className="h-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
        </div>

        {/* Headings */}
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">
          Pick a <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">narrator voice.</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-4">
          Tap to hear a 10 second sample.
        </p>

        {/* Voice Cards */}
        <div className="flex flex-col gap-2.5">
          {NARRATORS.map((voice) => {
            const isSelected = userPreferences.narratorId === voice.id
            const isPlaying = playingVoiceId === voice.id

            return (
              <div
                key={voice.id}
                onClick={() => handleSelectVoice(voice.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#18182b] border-[#6366f1] shadow-lg shadow-indigo-500/10'
                    : 'bg-[#101018] border-[#1e1e2c] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ backgroundColor: voice.color }}
                  >
                    {voice.avatarLetter}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{voice.name}</p>
                    <p className="text-[11px] text-slate-400">{voice.tags}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Sample play/pause button */}
                  <button
                    type="button"
                    onClick={(e) => toggleSample(e, voice.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isPlaying
                        ? 'bg-[#8b5cf6] text-white animate-pulse'
                        : 'bg-[#1e1e2f] text-slate-300 hover:text-white'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Ideal brief length section */}
        <div className="mt-5">
          <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
            Brief Length
          </span>
          <h3 className="text-sm font-semibold text-white tracking-tight mt-0.5">
            How long is your morning?
          </h3>
          <p className="text-xs text-slate-400 mb-3">Set your ideal brief length.</p>

          <div className="grid grid-cols-4 gap-2">
            {DURATION_OPTIONS.map((opt) => {
              const isSelected = userPreferences.briefLengthMinutes === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelectDuration(opt.value)}
                  className={`py-2 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#6366f1] border-[#6366f1] text-white shadow-sm shadow-indigo-500/30'
                      : 'bg-[#101018] border-[#1e1e2c] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA with dynamic voice name */}
      <div className="pt-6">
        <button
          type="button"
          onClick={() => goToScreen('time')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium text-sm shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition-transform"
        >
          Continue with {selectedVoice.name} • 5 stories →
        </button>
      </div>
    </div>
  )
}
