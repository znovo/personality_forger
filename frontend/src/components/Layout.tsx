import { useAppContext } from '../context/AppContext'
import { Header } from './Header'
import { PersonalityForm } from './PersonalityForm'
import { PersonalityResult } from './PersonalityResult'
import { PersonalityList } from './PersonalityList'
import { useGenerate } from '../hooks/useGenerate'
import { usePersonality } from '../hooks/usePersonality'

export function Layout() {
  const { viewMode, selectedPersonality, isSidebarOpen, setSidebarOpen } = useAppContext()
  const { result, isLoading: isGenerating } = useGenerate()
  const { personality: loadedPersonality, isLoading: isLoadingPersonality } = usePersonality(
    viewMode === 'viewer' && selectedPersonality ? selectedPersonality : undefined
  )

  const currentPersonality = loadedPersonality || result?.personality || null

  const currentName = viewMode === 'viewer' ? selectedPersonality : null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:transform-none ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          aria-label="Lista de personalidades"
        >
          <PersonalityList />
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <main className="flex-1 flex flex-col lg:flex-row min-w-0">
          <div className={`flex-1 flex flex-col ${viewMode === 'generator' ? 'lg:w-1/2' : 'lg:w-1/2'}`}>
            <PersonalityForm />
          </div>
          
          <div className="flex-1 flex flex-col min-w-0">
            <PersonalityResult
              personality={currentPersonality}
              name={currentName}
              isLoading={isGenerating && viewMode === 'viewer' || isLoadingPersonality}
            />
          </div>
        </main>
      </div>
    </div>
  )
}