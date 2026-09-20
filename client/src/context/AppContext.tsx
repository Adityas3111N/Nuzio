import React, { createContext, useContext, useState } from 'react'
import { DEFAULT_PREFERENCES, SAMPLE_STORIES } from '../constants/data'
import type { NavTab, ScreenId, Story, UserPreferences } from '../types'

interface AppContextType {
  currentScreen: ScreenId
  activeTab: NavTab
  userPreferences: UserPreferences
  stories: Story[]
  selectedCategory: string
  goToScreen: (screen: ScreenId) => void
  setActiveTab: (tab: NavTab) => void
  updatePreferences: (patch: Partial<UserPreferences>) => void
  toggleBookmark: (storyId: string) => void
  setSelectedCategory: (category: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('brief') // Default to main brief, can switch to any
  const [activeTab, setActiveTab] = useState<NavTab>('brief')
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES)
  const [stories, setStories] = useState<Story[]>(SAMPLE_STORIES)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const goToScreen = (screen: ScreenId) => {
    setCurrentScreen(screen)
  }

  React.useEffect(() => {
    // Load user preferences from backend
    fetch('/api/preferences')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && (data._id || data.userId)) {
          setUserPreferences((prev) => ({
            ...prev,
            ...data,
          }))
        }
      })
      .catch(() => {})

    // Load live stories from backend
    fetch('/api/stories')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.stories && data.stories.length > 0) {
          setStories(data.stories)
        }
      })
      .catch(() => {})
  }, [])

  const updatePreferences = (patch: Partial<UserPreferences>) => {
    setUserPreferences((prev) => {
      const next = { ...prev, ...patch }
      fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next),
      }).catch(() => {})
      return next
    })
  }

  const toggleBookmark = (storyId: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === storyId ? { ...s, bookmarked: !s.bookmarked } : s)),
    )
    fetch('/api/preferences/bookmark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storyId }),
    }).catch(() => {})
  }

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        activeTab,
        userPreferences,
        stories,
        selectedCategory,
        goToScreen,
        setActiveTab,
        updatePreferences,
        toggleBookmark,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
