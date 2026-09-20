import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import type { AppState, ViewMode } from '../types/personality'

interface AppContextType extends AppState {
  setViewMode: (mode: ViewMode) => void
  setSelectedPersonality: (name: string | null) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    viewMode: 'generator',
    selectedPersonality: null,
    isSidebarOpen: true,
  })

  const setViewMode = useCallback((mode: ViewMode) => {
    setState(prev => ({ ...prev, viewMode: mode }))
  }, [])

  const setSelectedPersonality = useCallback((name: string | null) => {
    setState(prev => ({ ...prev, selectedPersonality: name }))
  }, [])

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }))
  }, [])

  const setSidebarOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, isSidebarOpen: open }))
  }, [])

  return (
    <AppContext.Provider value={{ ...state, setViewMode, setSelectedPersonality, toggleSidebar, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}