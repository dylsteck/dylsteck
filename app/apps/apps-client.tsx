import AppsGrid from './grid'
import type { App } from './apps'

interface AppsPageClientProps {
  apps: App[]
}

export default function AppsPageClient({ apps }: AppsPageClientProps) {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <AppsGrid apps={apps} />
    </div>
  )
}
