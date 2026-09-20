import { usePersonalities } from '../hooks/usePersonalities'
import { useAppContext } from '../context/AppContext'
import { PersonalityCard } from './PersonalityCard'
import { LoadingSpinner } from './LoadingSpinner'
import { EmptyState } from './EmptyState'

export function PersonalityList() {
  const { personalities, isLoading, error, deletePersonality, refresh } = usePersonalities()
  const { selectedPersonality, setSelectedPersonality, setViewMode, setSidebarOpen } = useAppContext()

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm font-medium">Erro ao carregar</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <button onClick={refresh} className="btn-secondary text-sm w-full">
          Tentar novamente
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
          Personalidades Salvas ({personalities.length})
        </h2>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden btn-ghost p-1"
          aria-label="Fechar lista"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {personalities.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <EmptyState
            icon="📦"
            title="Nenhuma personalidade salva"
            description="As personalidades geradas aparecerão aqui automaticamente"
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
          {personalities.map((name) => (
            <PersonalityCard
              key={name}
              name={name}
              isActive={selectedPersonality === name}
              onSelect={() => {
                setSelectedPersonality(name)
                setViewMode('viewer')
              }}
              onDelete={() => deletePersonality(name)}
            />
          ))}
        </div>
      )}
    </div>
  )
}