'use client'

export type FilterType = 'all' | 'blog' | 'farcaster' | 'video'
export type ViewMode = 'grid' | 'list'
export const FILTER_OPTIONS: FilterType[] = ['all', 'blog', 'farcaster', 'video']

interface FeedFilterProps {
  activeFilters: FilterType[]
  onFilterChange: (filters: FilterType[]) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export default function FeedFilter({ activeFilters, onFilterChange, viewMode, onViewModeChange }: FeedFilterProps) {
  const handleFilterClick = (filter: FilterType) => {
    if (filter === 'all') {
      onFilterChange(['all'])
    } else {
      // If "all" is currently active, replace it with the selected filter
      if (activeFilters.includes('all')) {
        onFilterChange([filter])
      } else {
        // Toggle the filter
        if (activeFilters.includes(filter)) {
          // If removing the last filter, go back to "all"
          const newFilters = activeFilters.filter(f => f !== filter)
          onFilterChange(newFilters.length > 0 ? newFilters : ['all'])
        } else {
          // Add the filter
          onFilterChange([...activeFilters, filter])
        }
      }
    }
  }

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilters.includes(filter)
              const label = filter === 'farcaster' ? 'Cast' : filter.charAt(0).toUpperCase() + filter.slice(1)

              return (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
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
