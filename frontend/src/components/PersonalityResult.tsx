import { MarkdownRenderer } from '../utils/markdown'
import { useAppContext } from '../context/AppContext'
import { LoadingSpinner } from './LoadingSpinner'
import { EmptyState } from './EmptyState'

interface PersonalityResultProps {
  personality: string | null
  name: string | null
  isLoading?: boolean
}

export function PersonalityResult({ personality, name, isLoading }: PersonalityResultProps) {
  const { setViewMode } = useAppContext()

  if (isLoading) {
    return (
      <div className="card flex-1 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!personality) {
    return (
      <div className="card flex-1">
        <EmptyState
          icon="📝"
          title="Nenhuma personalidade selecionada"
          description="Crie uma nova personalidade ou selecione uma da lista ao lado"
          actionLabel="Criar Personalidade"
          onAction={() => setViewMode('generator')}
        />
      </div>
    )
  }

  return (
    <div className="card flex-1 flex flex-col">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500 mt-0.5">Personalidade gerada</p>
        </div>
        <button
          onClick={() => setViewMode('generator')}
          className="btn-ghost text-sm"
          aria-label="Voltar para criar nova personalidade"
        >
          ← Nova Personalidade
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <MarkdownRenderer content={personality} />
      </div>
    </div>
  )
}