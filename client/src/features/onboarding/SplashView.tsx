import React from 'react'
import { Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const SplashView: React.FC = () => {
  const { goToScreen } = useApp()

  return (
    <div
      onClick={() => goToScreen('language')}
      className="flex-1 flex flex-col justify-between items-center px-6 py-12 bg-radial-[at_50%_45%] from-[#1f1938] via-[#0b0b12] to-[#08080c] cursor-pointer"
    >
      <div className="w-full flex justify-end">
        {/* Top spacer */}
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Glowing Logo */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-lg shadow-purple-500/40">
            <Sparkles className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Nuzio<span className="text-indigo-400">AI</span></span>
        </div>

        {/* Tagline */}
        <h2 className="text-3xl font-serif italic text-slate-100 tracking-tight mb-2">
          News on go
        </h2>
        <p className="text-[10px] tracking-[0.25em] text-slate-400 font-semibold uppercase">
          Your audio brief, every morning
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-3 pb-4">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-medium text-slate-500 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span>Creating your brief...</span>
        </div>
      </div>
    </div>
  )
}
