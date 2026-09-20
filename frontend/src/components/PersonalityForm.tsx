import { useState, useRef, useEffect } from 'react'
import { useGenerate } from '../hooks/useGenerate'
import { useAppContext } from '../context/AppContext'
import type { PersonalityFormData, PersonalityFormErrors } from '../types/personality'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorAlert } from './ErrorAlert'

export function PersonalityForm() {
  const { generate, isLoading, error, result, clearError } = useGenerate()
  const { setViewMode, setSelectedPersonality } = useAppContext()
  const [formData, setFormData] = useState<PersonalityFormData>({
    prompt: '',
    name: '',
  })
  const [errors, setErrors] = useState<PersonalityFormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const promptRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (result) {
      setViewMode('viewer')
      setSelectedPersonality(result.name)
    }
  }, [result, setViewMode, setSelectedPersonality])

  const validateField = (name: keyof PersonalityFormData, value: string): string | undefined => {
    if (name === 'prompt' && !value.trim()) {
      return 'A descrição da personalidade é obrigatória'
    }
    if (name === 'name' && !value.trim()) {
      return 'O nome é obrigatório'
    }
    if (name === 'name' && value.trim().length > 50) {
      return 'O nome deve ter no máximo 50 caracteres'
    }
    return undefined
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    const error = validateField(name as keyof PersonalityFormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    
    const error = validateField(name as keyof PersonalityFormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const promptError = validateField('prompt', formData.prompt)
    const nameError = validateField('name', formData.name)
    
    if (promptError || nameError) {
      setErrors({ prompt: promptError, name: nameError })
      setTouched({ prompt: true, name: true })
      return
    }

    await generate({ prompt: formData.prompt.trim(), name: formData.name.trim() })
  }

  const handleNew = () => {
    setFormData({ prompt: '', name: '' })
    setErrors({})
    setTouched({})
    clearError()
    promptRef.current?.focus()
  }

  return (
    <div className="card flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Criar Personalidade</h2>
        <p className="text-sm text-gray-500">Descreva o conceito e gere uma personalidade completa</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-5 overflow-y-auto">
        <ErrorAlert message={error} onDismiss={clearError} />
        
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1.5">
            Descrição da Personalidade <span className="text-red-500">*</span>
          </label>
          <textarea
            ref={promptRef}
            id="prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`textarea ${touched.prompt && errors.prompt ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="Ex: Uma IA curiosa, analítica e com humor seco, que vê o mundo como sistemas a serem compreendidos..."
            rows={6}
            disabled={isLoading}
            aria-invalid={touched.prompt && !!errors.prompt}
            aria-describedby={touched.prompt && errors.prompt ? 'prompt-error' : undefined}
          />
          {touched.prompt && errors.prompt && (
            <p id="prompt-error" className="mt-1 text-sm text-red-600" role="alert">{errors.prompt}</p>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`input ${touched.name && errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            placeholder="minha-personalidade"
            maxLength={50}
            disabled={isLoading}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          />
          {touched.name && errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Gerando...
              </>
            ) : (
              'Gerar Personalidade'
            )}
          </button>
          
          {!isLoading && result && (
            <button
              type="button"
              onClick={handleNew}
              className="btn-secondary"
            >
              Nova Personalidade
            </button>
          )}
        </div>

        {!isLoading && !result && (
          <p className="text-xs text-gray-500 text-center">
            A geração pode levar alguns segundos. O resultado será salvo automaticamente.
          </p>
        )}
      </form>
    </div>
  )
}