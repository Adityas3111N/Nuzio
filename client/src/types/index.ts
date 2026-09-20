export type ScreenId =
  | 'splash'
  | 'language'
  | 'login'
  | 'profession'
  | 'topics'
  | 'voice'
  | 'time'
  | 'notifications'
  | 'ready'
  | 'brief'
  | 'discover'
  | 'settings'
  | 'billing'

export type NavTab = 'brief' | 'discover' | 'saved' | 'settings'

export type LanguageCode = 'en' | 'hi'

export type PlanType = 'free' | 'pro' | 'pro_annual'

export interface Narrator {
  id: string
  name: string
  accent: string
  tags: string
  avatarLetter: string
  previewText: string
  color: string
}

export interface Story {
  id: string
  title: string
  excerpt: string
  category: string
  durationText: string
  audioDurationSec: number
  source: string
  publishedAt: string
  bookmarked?: boolean
}

export interface UserPreferences {
  name: string
  language: LanguageCode
  locationEnabled: boolean
  profession: string
  topics: string[]
  narratorId: string
  briefLengthMinutes: number
  scheduledTime: string
  scheduledPeriod: 'AM' | 'PM'
  notificationsEnabled: boolean
  plan: PlanType
  settings: {
    theme: 'dark' | 'light'
    offlineMode: boolean
    autoAdvance: boolean
    pushNotifications: boolean
  }
}
