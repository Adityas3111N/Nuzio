import React from 'react'
import { useApp } from '../../context/AppContext'
import type { ScreenId } from '../../types'

interface MobileShellProps {
  children: React.ReactNode
}

const SCREENS: { id: ScreenId; label: string }[] = [
  { id: 'splash', label: '01 Splash' },
  { id: 'language', label: '02 Language' },
  { id: 'login', label: '03 Login' },
  { id: 'profession', label: '04 Profession' },
  { id: 'topics', label: '05 Topics' },
  { id: 'voice', label: '06 Voice' },
  { id: 'time', label: '07 Time' },
  { id: 'notifications', label: '08 Notifications' },
  { id: 'ready', label: '09 Ready' },
  { id: 'brief', label: '10 Morning Brief' },
  { id: 'discover', label: '11 Discover' },
  { id: 'settings', label: '12 Settings' },
  { id: 'billing', label: '13 Plan & Billing' },
]

export const MobileShell: React.FC<MobileShellProps> = ({ children }) => {
  const { currentScreen, goToScreen } = useApp()

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col items-center justify-center p-0 sm:p-6 select-none font-sans">
      {/* Top screen switcher bar for quick pixel-perfect preview and testing */}
      <header className="w-full max-w-5xl mb-4 px-4 hidden md:flex items-center justify-between border-b border-[#1b1b26] pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6] shadow-sm shadow-purple-500" />
          <h1 className="text-sm font-semibold text-white tracking-wide">Nuzio AI — Screen Inspector</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {SCREENS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => goToScreen(sc.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                  currentScreen === sc.id
                    ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-md shadow-indigo-500/20'
                    : 'bg-[#12121a] text-slate-400 hover:text-slate-200 hover:bg-[#1a1a26]'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* iPhone Device Frame */}
      <div className="relative w-full sm:w-[390px] h-[100dvh] sm:h-[844px] bg-[#09090f] sm:rounded-[52px] sm:border-[10px] sm:border-[#1d1d2b] shadow-2xl sm:shadow-indigo-950/40 flex flex-col overflow-hidden">
        {/* Screen Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>
      </div>
    </div>
  )
}
