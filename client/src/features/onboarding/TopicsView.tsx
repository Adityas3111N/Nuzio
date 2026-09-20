import React from 'react'
import {
  Activity,
  ArrowLeft,
  Atom,
  Bot,
  Building,
  Compass,
  FileText,
  Globe,
  Leaf,
  LineChart,
  Palette,
  Trophy,
  Zap,
} from 'lucide-react'
import { TOPICS } from '../../constants/data'
import { useApp } from '../../context/AppContext'

const TOPIC_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  LineChart,
  Building,
  Globe,
  Zap,
  Atom,
  Compass,
  Activity,
  Leaf,
  Trophy,
  Palette,
  FileText,
}

export const TopicsView: React.FC = () => {
  const { userPreferences, updatePreferences, goToScreen } = useApp()
  const selectedTopics = userPreferences.topics || []

  const toggleTopic = (label: string) => {
    if (selectedTopics.includes(label)) {
      updatePreferences({
        topics: selectedTopics.filter((t) => t !== label),
      })
    } else {
      if (selectedTopics.length < 3) {
        updatePreferences({
          topics: [...selectedTopics, label],
        })
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#09090f] overflow-y-auto no-scrollbar">
      <div>
        {/* Top Stepper */}
        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            onClick={() => goToScreen('profession')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-bold tracking-widest text-[#8b5cf6] uppercase">
            Step 2 of 5
          </span>

          <button
            type="button"
            onClick={() => goToScreen('voice')}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Skip →
          </button>
        </div>

        {/* 5-step progress bar */}
        <div className="grid grid-cols-5 gap-1.5 my-3">
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
        </div>

        {/* Headings with counter pill */}
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">
          What moves your world?
        </h2>
        <div className="flex items-center justify-between mt-1 mb-5">
          <p className="text-xs text-slate-400">Pick up to 3 topics</p>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#1b1b2a] text-[#8b5cf6] border border-[#2b2b40]">
            {selectedTopics.length}/3
          </span>
        </div>

        {/* 2-column topic pills */}
        <div className="grid grid-cols-2 gap-2.5">
          {TOPICS.map((item) => {
            const Icon = TOPIC_ICON_MAP[item.icon] || Zap
            const isSelected = selectedTopics.includes(item.label)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleTopic(item.label)}
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
          onClick={() => goToScreen('voice')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium text-sm shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition-transform"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
