import React from 'react'
import { Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const LoginView: React.FC = () => {
  const { goToScreen } = useApp()

  const handleLogin = () => {
    goToScreen('profession')
  }

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-6 bg-[#09090f] bg-ambient-center">
      {/* Top Brand */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#a855f7] flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-white fill-white" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-white">Nuzio<span className="text-indigo-400">AI</span></span>
      </div>

      {/* Middle Heading */}
      <div className="my-auto">
        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
          Good morning.
        </h2>
        <h3 className="text-3xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 mt-1 mb-4">
          News on go.
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-[280px]">
          Personalised audio news for Indian professionals — curated every morning.
        </p>
      </div>

      {/* Bottom Auth CTA */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleLogin}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#151522] border border-[#2b2b3f] hover:border-slate-600 text-white font-medium text-sm flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all cursor-pointer"
        >
          {/* Google G logo SVG */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-[10px] text-slate-500 text-center">
          By continuing you agree to{' '}
          <span className="text-slate-400 underline cursor-pointer">Terms</span> and{' '}
          <span className="text-slate-400 underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}
