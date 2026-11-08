export type FilterType = 'all' | 'blog' | 'video'
export type ViewMode = 'grid' | 'list'
export const FILTER_OPTIONS: FilterType[] = ['all', 'blog', 'video']

interface FeedFilterProps {
  embedded?: boolean
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export default function FeedFilter({ embedded = false, activeFilter, onFilterChange, viewMode, onViewModeChange }: FeedFilterProps) {
  return (
    <div className="w-full">
      <div className={embedded ? 'py-1.5' : 'max-w-7xl mx-auto px-6 sm:px-8 py-1.5'}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter
              const label = filter.charAt(0).toUpperCase() + filter.slice(1)

              return (
                <button
                  key={filter}
                  onClick={() => onFilterChange(filter)}
                  aria-pressed={isActive}
                  className={`text-xs sm:text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'text-neutral-900 dark:text-neutral-100 font-medium'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`text-xs transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'text-neutral-900 dark:text-neutral-100 font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`text-xs transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'text-neutral-900 dark:text-neutral-100 font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
