import React from 'react'
import { ArrowLeft, Bell, Sparkles, Zap } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const NotificationsView: React.FC = () => {
  const { userPreferences, updatePreferences, goToScreen } = useApp()

  const handleAllow = () => {
    updatePreferences({ notificationsEnabled: true })
    goToScreen('ready')
  }

  const handleSkip = () => {
    updatePreferences({ notificationsEnabled: false })
    goToScreen('ready')
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#09090f] overflow-y-auto no-scrollbar">
      <div>
        {/* Top Stepper */}
        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            onClick={() => goToScreen('time')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-bold tracking-widest text-[#8b5cf6] uppercase">
            Step 5 of 5
          </span>

          <button
            type="button"
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Skip →
          </button>
        </div>

        {/* 5-step progress bar (all 5 filled) */}
        <div className="grid grid-cols-5 gap-1.5 my-3">
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
        </div>

        {/* Headings */}
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">
          Stay in the loop.
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Turn on notifications so you never miss your brief.
        </p>

        {/* Simulated iOS Push Notification Banner */}
        <div className="p-3.5 rounded-2xl bg-[#141420] border border-[#262638] shadow-lg shadow-black/40 mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white fill-white" />
              </div>
              <span className="text-[11px] font-semibold text-slate-300">Nuzio</span>
            </div>
            <span className="text-[10px] text-slate-500">1m ago</span>
          </div>

          <h3 className="text-xs font-bold text-white mb-0.5">Your morning brief is ready</h3>
          <p className="text-[11px] text-slate-400 leading-snug">
            6 stories • AI & Tech, Markets, Startups • Listen now • 10:15
          </p>
        </div>

        {/* What You'll Receive List */}
        <div>
          <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
            What you'll receive
          </span>

          <div className="flex flex-col gap-3 mt-3">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#101018] border border-[#1b1b28]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-[#8b5cf6] flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Morning brief ready</p>
                  <p className="text-[10px] text-slate-400">Your daily audio briefing is waiting</p>
                </div>
              </div>
              <span className="text-[10px] font-medium text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-800/40">
                Daily at {userPreferences.scheduledTime || '7:00'} {userPreferences.scheduledPeriod || 'AM'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-[#101018] border border-[#1b1b28]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Breaking story</p>
                  <p className="text-[10px] text-slate-400">A major event just broke in your topics</p>
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-400 bg-[#161622] px-2 py-0.5 rounded-md border border-[#222232]">
                Real-time
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6 flex flex-col items-center gap-2.5">
        <button
          type="button"
          onClick={handleAllow}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium text-sm shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition-transform"
        >
          Allow notifications
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="text-xs text-slate-500 hover:text-slate-300 py-1"
        >
          Not now
        </button>
      </div>
    </div>
  )
}
