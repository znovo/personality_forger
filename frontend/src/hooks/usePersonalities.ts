import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '../api/client'

export function usePersonalities() {
  const [personalities, setPersonalities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPersonalities = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await apiClient.listPersonalities()
      setPersonalities(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar personalidades')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPersonalities()
  }, [fetchPersonalities])

  const deletePersonality = useCallback(async (name: string) => {
    try {
      await apiClient.deletePersonality(name)
      setPersonalities(prev => prev.filter(p => p !== name))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir personalidade')
      return false
    }
  }, [])

  const refresh = useCallback(() => {
    fetchPersonalities()
  }, [fetchPersonalities])

  return {
    personalities,
    isLoading,
    error,
    deletePersonality,
    refresh,
  }
}