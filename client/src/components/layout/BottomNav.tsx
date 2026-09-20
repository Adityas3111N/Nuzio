import React from 'react'
import { Bookmark, Compass, Headphones, Settings } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { NavTab } from '../../types'

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, goToScreen } = useApp()

  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'brief', label: 'Brief', icon: Headphones },
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleSelect = (id: NavTab) => {
    setActiveTab(id)
    if (id === 'brief') goToScreen('brief')
    if (id === 'discover') goToScreen('discover')
    if (id === 'saved') goToScreen('discover')
    if (id === 'settings') goToScreen('settings')
  }

  return (
    <nav className="md:hidden h-16 bg-[#0e0e16]/95 backdrop-blur-md border-t border-[#1e1e2d] px-6 flex items-center justify-between z-30 shrink-0">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleSelect(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive ? 'text-[#8b5cf6]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
            <span className={`text-[10px] font-medium tracking-tight ${isActive ? 'text-white' : 'text-slate-500'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
