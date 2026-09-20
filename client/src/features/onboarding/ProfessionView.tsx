import React from 'react'
import {
  Activity,
  ArrowLeft,
  Briefcase,
  Building2,
  Cpu,
  GraduationCap,
  HeartPulse,
  Landmark,
  Megaphone,
  Rocket,
  Scale,
  TrendingUp,
} from 'lucide-react'
import { PROFESSIONS } from '../../constants/data'
import { useApp } from '../../context/AppContext'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Scale,
  Cpu,
  HeartPulse,
  Briefcase,
  Megaphone,
  Landmark,
  Building2,
  GraduationCap,
  Rocket,
}

export const ProfessionView: React.FC = () => {
  const { userPreferences, updatePreferences, goToScreen } = useApp()

  const handleSelect = (label: string) => {
    updatePreferences({ profession: label })
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#09090f] bg-ambient-violet overflow-y-auto no-scrollbar">
      <div>
        {/* Top Stepper Header */}
        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            onClick={() => goToScreen('login')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-bold tracking-widest text-[#8b5cf6] uppercase">
            Step 1 of 5
          </span>

          <button
            type="button"
            onClick={() => goToScreen('topics')}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Skip →
          </button>
        </div>

        {/* 5-step progress bar */}
        <div className="grid grid-cols-5 gap-1.5 my-3">
          <div className="h-1 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
        </div>

        {/* Headings */}
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">
          What's your <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">profession?</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          We'll tune every brief to what actually moves your day.
        </p>

        {/* 2-column profession grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {PROFESSIONS.map((item) => {
            const Icon = ICON_MAP[item.icon] || Activity
            const isSelected = userPreferences.profession === item.label
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.label)}
                className={`px-3 py-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#18182b] border-[#6366f1] text-white shadow-md shadow-indigo-500/10'
                    : 'bg-[#101018] border-[#1e1e2c] text-slate-300 hover:border-slate-700'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-[#8b5cf6]' : 'text-slate-400'
                  }`}
                />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <button
          type="button"
          onClick={() => goToScreen('topics')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium text-sm shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition-transform"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
