import type { 
  GenerateRequest, 
  GenerateResponse, 
  Personality, 
  PersonalitiesListResponse,
  HealthResponse 
} from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  }

  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/health')
  }

  async generate(request: GenerateRequest): Promise<GenerateResponse> {
    return this.request<GenerateResponse>('/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  async listPersonalities(): Promise<string[]> {
    const response = await this.request<PersonalitiesListResponse>('/personalities')
    return response.personalities
  }

  async getPersonality(name: string): Promise<Personality> {
    return this.request<Personality>(`/personalities/${encodeURIComponent(name)}`)
  }

  async deletePersonality(name: string): Promise<{ name: string; deleted: boolean }> {
    return this.request(`/personalities/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    })
  }
}

export const apiClient = new ApiClient()