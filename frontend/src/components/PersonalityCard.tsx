import { useState } from 'react'
import { LoadingSpinner } from './LoadingSpinner'

interface PersonalityCardProps {
  name: string
  isActive: boolean
  onSelect: () => void
  onDelete: () => void
}

export function PersonalityCard({ name, isActive, onSelect, onDelete }: PersonalityCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete()
    setIsDeleting(false)
    setShowConfirm(false)
  }

  const preview = name.length > 20 ? `${name.slice(0, 17)}...` : name

  return (
    <div className="relative group">
      <button
        onClick={onSelect}
        className={`sidebar-item w-full text-left ${isActive ? 'sidebar-item-active' : ''}`}
        aria-current={isActive ? 'page' : undefined}
        aria-pressed={isActive}
        disabled={isDeleting}
      >
        <span className="flex-1 truncate font-medium" title={name}>{preview}</span>
        {!isDeleting && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowConfirm(true)
            }}
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
            aria-label={`Excluir ${name}`}
            disabled={isDeleting}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-in fade-in duration-150"
             onClick={() => setShowConfirm(false)}
             role="dialog"
             aria-modal="true"
             aria-labelledby="delete-confirm-title"
        >
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 animate-in zoom-in-95 duration-150"
               onClick={(e) => e.stopPropagation()}>
            <h3 id="delete-confirm-title" className="text-lg font-semibold text-gray-900 mb-2">
              Excluir personalidade
            </h3>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir <strong>{name}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="btn-danger"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Excluindo...
                  </>
                ) : (
                  'Excluir'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}