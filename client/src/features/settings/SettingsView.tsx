import React from 'react'
import {
  Bookmark,
  ChevronRight,
  CreditCard,
  Moon,
  Sun,
} from 'lucide-react'
import { BottomNav } from '../../components/layout/BottomNav'
import { MiniPlayer } from '../../components/layout/MiniPlayer'
import { useApp } from '../../context/AppContext'

export const SettingsView: React.FC = () => {
  const { userPreferences, updatePreferences, stories, goToScreen } = useApp()

  const savedCount = stories.filter((s) => s.bookmarked).length

  const handleToggle = (key: 'offlineMode' | 'autoAdvance' | 'pushNotifications') => {
    updatePreferences({
      settings: {
        ...userPreferences.settings,
        [key]: !userPreferences.settings[key],
      },
    })
  }

  const handleThemeChange = (theme: 'dark' | 'light') => {
    updatePreferences({
      settings: {
        ...userPreferences.settings,
        theme,
      },
    })
  }

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#09090f] bg-ambient-violet overflow-hidden">
      <div className="flex-1 px-5 py-3 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="pt-2 mb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Settings</h2>
          <p className="text-xs text-slate-400">Tune your morning.</p>
        </div>

        {/* Profile Card */}
        <div className="p-3.5 rounded-2xl bg-[#12121e] border border-[#202032] flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] text-white font-bold text-sm flex items-center justify-center">
              {userPreferences.name?.[0] || 'A'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {userPreferences.name || 'Aarav'} Sharma
              </p>
              <p className="text-[11px] text-slate-400">
                {userPreferences.profession} • Mumbai, India
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => goToScreen('profession')}
            className="text-[11px] font-medium text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-900/40 hover:border-indigo-700 transition-colors"
          >
            Edit ›
          </button>
        </div>

        {/* Saved & Billing links */}
        <div className="flex flex-col gap-2 mb-5">
          <button
            type="button"
            onClick={() => goToScreen('discover')}
            className="p-3.5 rounded-2xl bg-[#101018] border border-[#1d1d2b] flex items-center justify-between hover:border-slate-700 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-[#8b5cf6] flex items-center justify-center">
                <Bookmark className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-white">Saved stories</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-[11px]">{savedCount}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => goToScreen('billing')}
            className="p-3.5 rounded-2xl bg-[#101018] border border-[#1d1d2b] flex items-center justify-between hover:border-slate-700 transition-all text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Plan & billing</p>
                <p className="text-[10px] text-slate-400">
                  {userPreferences.plan === 'free' ? 'Free — upgrade for unlimited' : 'Pro Member'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Appearance Section */}
        <div className="mb-5">
          <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-2.5">
            Appearance
          </span>

          {/* Theme Selector */}
          <div className="p-1 rounded-xl bg-[#12121c] border border-[#1e1e2d] flex items-center">
            <button
              type="button"
              onClick={() => handleThemeChange('dark')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                userPreferences.settings.theme === 'dark'
                  ? 'bg-[#1e1e2f] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3 h-3" />
              Dark
            </button>
            <button
              type="button"
              onClick={() => handleThemeChange('light')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                userPreferences.settings.theme === 'light'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3 h-3" />
              Light
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div>
          <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block mb-2.5">
            Preferences
          </span>

          {/* Toggle 1: Offline mode */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#101018] border border-[#1b1b28] mb-2">
            <div>
              <p className="text-xs font-semibold text-white">Offline mode</p>
              <p className="text-[10px] text-slate-400">Download briefs for the commute</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('offlineMode')}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                userPreferences.settings.offlineMode ? 'bg-[#10b981]' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  userPreferences.settings.offlineMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Auto-advance */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#101018] border border-[#1b1b28] mb-2">
            <div>
              <p className="text-xs font-semibold text-white">Auto-advance</p>
              <p className="text-[10px] text-slate-400">Play the next story automatically</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('autoAdvance')}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                userPreferences.settings.autoAdvance ? 'bg-[#10b981]' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  userPreferences.settings.autoAdvance ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Push notifications */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#101018] border border-[#1b1b28]">
            <div>
              <p className="text-xs font-semibold text-white">Push notifications</p>
              <p className="text-[10px] text-slate-400">Daily brief ready reminders</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('pushNotifications')}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                userPreferences.settings.pushNotifications ? 'bg-[#10b981]' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  userPreferences.settings.pushNotifications ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
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
