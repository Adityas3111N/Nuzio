import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const TIME_SLOTS = ['6:00', '6:30', '7:00', '7:30', '8:00', '8:30']

export const TimeView: React.FC = () => {
  const { userPreferences, updatePreferences, goToScreen } = useApp()

  const handlePeriodChange = (period: 'AM' | 'PM') => {
    updatePreferences({ scheduledPeriod: period })
  }

  const handleTimeSelect = (time: string) => {
    updatePreferences({ scheduledTime: time })
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#09090f] overflow-y-auto no-scrollbar">
      <div>
        {/* Top Stepper */}
        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            onClick={() => goToScreen('voice')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-bold tracking-widest text-[#8b5cf6] uppercase">
            Step 4 of 5
          </span>

          <button
            type="button"
            onClick={() => goToScreen('notifications')}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Skip →
          </button>
        </div>

        {/* 5-step progress bar */}
        <div className="grid grid-cols-5 gap-1.5 my-3">
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#8b5cf6]" />
          <div className="h-1 rounded-full bg-[#1e1e2d]" />
        </div>

        {/* Headings */}
        <h2 className="text-xl font-bold text-white tracking-tight mt-2">
          When do you want your brief?
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Nuzio will have your brief ready and waiting each morning.
        </p>

        {/* AM / PM Segmented Control */}
        <div className="p-1 rounded-2xl bg-[#12121c] border border-[#212133] flex items-center mb-6">
          <button
            type="button"
            onClick={() => handlePeriodChange('AM')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              userPreferences.scheduledPeriod === 'AM'
                ? 'bg-[#6366f1] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AM
          </button>
          <button
            type="button"
            onClick={() => handlePeriodChange('PM')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              userPreferences.scheduledPeriod === 'PM'
                ? 'bg-[#6366f1] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            PM
          </button>
        </div>

        {/* Time Slots Wheel list */}
        <div className="flex flex-col items-center gap-2 py-2">
          {TIME_SLOTS.map((slot) => {
            const isSelected = userPreferences.scheduledTime === slot
            return (
              <button
                key={slot}
                type="button"
                onClick={() => handleTimeSelect(slot)}
                className={`w-full py-3 px-6 rounded-2xl transition-all flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#18182b] border-2 border-[#6366f1] text-white shadow-lg shadow-indigo-500/20 scale-105'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span
                  className={`text-lg tracking-wider font-semibold ${
                    isSelected ? 'text-2xl text-white font-bold' : ''
                  }`}
                >
                  {slot}
                </span>
                {isSelected && (
                  <span className="text-xs font-bold text-[#8b5cf6] ml-2">
                    {userPreferences.scheduledPeriod}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <button
          type="button"
          onClick={() => goToScreen('notifications')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium text-sm shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition-transform"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
