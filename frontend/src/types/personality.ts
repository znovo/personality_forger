export interface PersonalityFormData {
  prompt: string
  name: string
}

export interface PersonalityFormErrors {
  prompt?: string
  name?: string
}

export type ViewMode = 'generator' | 'viewer'

export interface AppState {
  viewMode: ViewMode
  selectedPersonality: string | null
  isSidebarOpen: boolean
}