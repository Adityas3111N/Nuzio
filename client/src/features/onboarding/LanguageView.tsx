import React from 'react'
import { Check, MapPin, Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { LanguageCode } from '../../types'

export const LanguageView: React.FC = () => {
  const { userPreferences, updatePreferences, goToScreen } = useApp()

  const handleSelectLanguage = (lang: LanguageCode) => {
    updatePreferences({ language: lang })
  }

  const toggleLocation = () => {
    updatePreferences({ locationEnabled: !userPreferences.locationEnabled })
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-6 bg-[#09090f] bg-ambient-violet overflow-y-auto no-scrollbar">
      <div>
        {/* Top Mini Brand */}
        <div className="flex items-center justify-center gap-1.5 pt-2 pb-6">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#a855f7] flex items-center justify-center">
            <Sparkles className="w-2.5 h-2.5 text-white fill-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">Nuzio<span className="text-indigo-400">AI</span></span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
          Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-serif italic">language</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Select the language for your daily brief.
        </p>

        {/* Language Selection Cards */}
        <div className="flex flex-col gap-3">
          {/* English Option */}
          <div
            onClick={() => handleSelectLanguage('en')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              userPreferences.language === 'en'
                ? 'bg-[#151522] border-[#6366f1] shadow-lg shadow-indigo-500/10'
                : 'bg-[#101018] border-[#1e1e2c] hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1e1e2e] text-xs font-bold flex items-center justify-center text-slate-300 border border-[#2a2a3e]">
                GB
              </span>
              <div>
                <p className="text-sm font-semibold text-white">English</p>
                <p className="text-xs text-slate-400">Briefings delivered in English</p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                userPreferences.language === 'en'
                  ? 'border-[#6366f1] bg-[#6366f1]'
                  : 'border-slate-600'
              }`}
            >
              {userPreferences.language === 'en' && <Check className="w-3 h-3 text-white stroke-[3]" />}
            </div>
          </div>

          {/* Hindi Option */}
          <div
            onClick={() => handleSelectLanguage('hi')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              userPreferences.language === 'hi'
                ? 'bg-[#151522] border-[#6366f1] shadow-lg shadow-indigo-500/10'
                : 'bg-[#101018] border-[#1e1e2c] hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1e1e2e] text-xs font-bold flex items-center justify-center text-slate-300 border border-[#2a2a3e]">
                IN
              </span>
              <div>
                <p className="text-sm font-semibold text-white">हिंदी</p>
                <p className="text-xs text-slate-400">हिंदी में समाचार सुनें</p>
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                userPreferences.language === 'hi'
                  ? 'border-[#6366f1] bg-[#6366f1]'
                  : 'border-slate-600'
              }`}
            >
              {userPreferences.language === 'hi' && <Check className="w-3 h-3 text-white stroke-[3]" />}
            </div>
          </div>
        </div>

        {/* Enable Location Card */}
        <div className="mt-5 p-4 rounded-2xl bg-[#101018] border border-[#1e1e2c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1e1e2e] flex items-center justify-center text-indigo-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Enable Location</p>
              <p className="text-xs text-slate-400">Get hyper-local news tailored to your city.</p>
              <span className="inline-block mt-1 text-[9px] font-bold text-slate-400 bg-[#161622] px-2 py-0.5 rounded-full border border-slate-700/40 uppercase tracking-wider">
                + Set as priority
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleLocation}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
              userPreferences.locationEnabled ? 'bg-[#6366f1]' : 'bg-slate-700'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                userPreferences.locationEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <button
          type="button"
          onClick={() => goToScreen('login')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-medium text-sm shadow-lg shadow-indigo-600/30 active:scale-[0.98] transition-transform"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
