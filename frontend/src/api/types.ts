export interface GenerateRequest {
  prompt: string
  name: string
}

export interface GenerateResponse {
  name: string
  personality: string
  saved: boolean
}

export interface Personality {
  name: string
  personality: string
}

export interface PersonalitiesListResponse {
  personalities: string[]
}

export interface HealthResponse {
  status: string
}

export interface ApiError {
  detail: string
}