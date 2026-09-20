import React from 'react'
import {
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  Headphones,
  Layers,
} from 'lucide-react'
import { NARRATORS } from '../../constants/data'
import { useApp } from '../../context/AppContext'

export const ReadyView: React.FC = () => {
  const { userPreferences, goToScreen } = useApp()

  const narrator =
    NARRATORS.find((n) => n.id === userPreferences.narratorId) || NARRATORS[0]

  const handleStartListening = () => {
    goToScreen('brief')
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#09090f] bg-ambient-mint overflow-y-auto no-scrollbar">
      <div>
        {/* Top Mini Badge */}
        <div className="flex items-center gap-1.5 py-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
            All Set
          </span>
        </div>

        {/* Big Glowing Checkmark Icon */}
        <div className="flex flex-col items-center text-center mt-2 mb-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-400/50 flex items-center justify-center shadow-2xl shadow-emerald-500/30 mb-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 stroke-[2.2]" />
          </div>

          <h2 className="text-2xl font-bold text-white tracking-tight">
            You're ready, <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">{userPreferences.name || 'Aarav'}.</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-[260px] leading-relaxed">
            Your first brief will be ready tomorrow at {userPreferences.scheduledTime || '7:00'}{' '}
            {userPreferences.scheduledPeriod || 'AM'}. We're already curating.
          </p>
        </div>

        {/* Smart Profile Summary Card */}
        <div className="p-4 rounded-2xl bg-[#11111c] border border-[#1f1f2e]">
          <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-3">
            Your Brief Profile
          </span>

          <div className="flex flex-col gap-3">
            {/* Profession */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-200 font-medium">
                  {userPreferences.profession}
                </span>
              </div>
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            </div>

            {/* Topics */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-200 font-medium">
                  {userPreferences.topics.slice(0, 2).join(', ')}
                  {userPreferences.topics.length > 2 && ' +1'}
                </span>
              </div>
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            </div>

            {/* Narrator */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-200 font-medium">
                  {narrator.name} — {narrator.accent.split(',')[0]}
                </span>
              </div>
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            </div>

            {/* Stories & Duration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-200 font-medium">
                  5 stories — ~{userPreferences.briefLengthMinutes} min
                </span>
              </div>
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            </div>

            {/* Delivery Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-200 font-medium">
                  Daily at {userPreferences.scheduledTime} {userPreferences.scheduledPeriod}
                </span>
              </div>
              <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-6">
        <button
          type="button"
          onClick={handleStartListening}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-600 text-black font-bold text-sm shadow-xl shadow-cyan-500/25 active:scale-[0.98] transition-transform"
        >
          Start listening →
        </button>
      </div>
    </div>
  )
}
