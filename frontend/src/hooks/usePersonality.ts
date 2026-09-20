import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '../api/client'


export function usePersonality(name?: string) {
  const [personality, setPersonality] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPersonality = useCallback(async (name: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await apiClient.getPersonality(name)
      setPersonality(data.personality)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar personalidade'
      setError(message)
      setPersonality(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (name) {
      loadPersonality(name)
    }
  }, [name, loadPersonality])

  const refresh = useCallback(() => {
    if (name) {
      loadPersonality(name)
    }
  }, [name, loadPersonality])

  return {
    personality,
    isLoading,
    error,
    refresh,
  }
}