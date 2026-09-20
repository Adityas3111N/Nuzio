import React from 'react'
import { MobileShell } from './components/layout/MobileShell'
import { AppProvider, useApp } from './context/AppContext'
import { AudioProvider } from './context/AudioContext'
import { SplashView } from './features/onboarding/SplashView'
import { LanguageView } from './features/onboarding/LanguageView'
import { LoginView } from './features/onboarding/LoginView'
import { ProfessionView } from './features/onboarding/ProfessionView'
import { TopicsView } from './features/onboarding/TopicsView'
import { VoiceView } from './features/onboarding/VoiceView'
import { TimeView } from './features/onboarding/TimeView'
import { NotificationsView } from './features/onboarding/NotificationsView'
import { ReadyView } from './features/onboarding/ReadyView'
import { MorningBriefView } from './features/player/MorningBriefView'
import { DiscoverView } from './features/feed/DiscoverView'
import { SettingsView } from './features/settings/SettingsView'
import { BillingView } from './features/billing/BillingView'

const ScreenRouter: React.FC = () => {
  const { currentScreen } = useApp()

  switch (currentScreen) {
    case 'splash':
      return <SplashView />
    case 'language':
      return <LanguageView />
    case 'login':
      return <LoginView />
    case 'profession':
      return <ProfessionView />
    case 'topics':
      return <TopicsView />
    case 'voice':
      return <VoiceView />
    case 'time':
      return <TimeView />
    case 'notifications':
      return <NotificationsView />
    case 'ready':
      return <ReadyView />
    case 'brief':
      return <MorningBriefView />
    case 'discover':
      return <DiscoverView />
    case 'settings':
      return <SettingsView />
    case 'billing':
      return <BillingView />
    default:
      return <MorningBriefView />
  }
}

export function App() {
  return (
    <AppProvider>
      <AudioProvider>
        <MobileShell>
          <ScreenRouter />
        </MobileShell>
      </AudioProvider>
    </AppProvider>
  )
}

export default App
