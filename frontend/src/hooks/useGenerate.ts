import { useState, useCallback } from 'react'
import { apiClient } from '../api/client'
import type { GenerateRequest, GenerateResponse } from '../api/types'

export function useGenerate() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<GenerateResponse | null>(null)

  const generate = useCallback(async (request: GenerateRequest): Promise<GenerateResponse | null> => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiClient.generate(request)
      setResult(response)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao gerar personalidade'
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResult = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    generate,
    isLoading,
    error,
    result,
    clearResult,
    clearError,
  }
}