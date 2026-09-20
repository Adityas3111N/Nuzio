import React from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { PlanType } from '../../types'

export const BillingView: React.FC = () => {
  const { userPreferences, updatePreferences, goToScreen } = useApp()

  const handleSelectPlan = (plan: PlanType) => {
    updatePreferences({ plan })
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#09090f] overflow-y-auto no-scrollbar">
      <div>
        {/* Top bar with back arrow */}
        <div className="flex items-center gap-3 py-2 mb-2">
          <button
            type="button"
            onClick={() => goToScreen('settings')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold text-slate-300">Settings</span>
        </div>

        {/* Headings */}
        <h2 className="text-xl font-bold text-white tracking-tight">Plan & billing</h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Start free. Upgrade when mornings pay for themselves.
        </p>

        {/* Pricing Cards */}
        <div className="flex flex-col gap-3.5">
          {/* Free Tier */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              userPreferences.plan === 'free'
                ? 'bg-[#12121e] border-[#29293e]'
                : 'bg-[#0f0f18] border-[#1c1c28]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white">Free</h3>
              <span className="text-sm font-extrabold text-white">₹0<span className="text-xs font-normal text-slate-400">/mo</span></span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-3.5">
              1 article summary per topic daily. Ad-supported. Push notifications.
            </p>

            <button
              type="button"
              disabled={userPreferences.plan === 'free'}
              onClick={() => handleSelectPlan('free')}
              className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                userPreferences.plan === 'free'
                  ? 'bg-[#1a1a2a] text-slate-400 cursor-default'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              {userPreferences.plan === 'free' ? 'Current plan' : 'Downgrade to Free'}
            </button>
          </div>

          {/* Pro Tier (Popular) */}
          <div
            className={`p-4 rounded-2xl border relative transition-all ${
              userPreferences.plan === 'pro'
                ? 'bg-[#18182b] border-[#6366f1] shadow-xl shadow-indigo-500/10'
                : 'bg-[#131320] border-[#2d2d46]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Pro</h3>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-700/50 uppercase tracking-wider">
                  Popular
                </span>
              </div>
              <span className="text-sm font-extrabold text-white">₹79<span className="text-xs font-normal text-slate-400">/mo</span></span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed mb-3.5">
              Unlimited audio briefings, premium AI voices, multi-language support.
            </p>

            <button
              type="button"
              onClick={() => handleSelectPlan('pro')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all cursor-pointer"
            >
              {userPreferences.plan === 'pro' ? 'Current plan (Active)' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Pro Annual */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              userPreferences.plan === 'pro_annual'
                ? 'bg-[#18182b] border-[#6366f1]'
                : 'bg-[#0f0f18] border-[#1c1c28]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white">Pro Annual</h3>
              <span className="text-sm font-extrabold text-white">₹1,499<span className="text-xs font-normal text-slate-400">/yr</span></span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed mb-3.5">
              All Pro benefits, offline mode, priority features. Locks in lower rate.
            </p>

            <button
              type="button"
              onClick={() => handleSelectPlan('pro_annual')}
              className={`w-full py-2 rounded-xl text-xs font-semibold transition-all ${
                userPreferences.plan === 'pro_annual'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-[#1c1c2e] text-slate-300 hover:bg-[#25253d]'
              }`}
            >
              {userPreferences.plan === 'pro_annual' ? 'Active' : 'Choose Annual'}
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
        <Sparkles className="w-3 h-3 text-indigo-400" />
        <span>Cancel or change anytime</span>
      </div>
    </div>
  )
}
