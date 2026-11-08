import { Link } from '@tanstack/react-router'
import Image from '../components/image'
import { appGroups, type App } from './apps'

interface AppsGridProps {
  apps: App[]
}

export default function AppsGrid({ apps }: AppsGridProps) {
  const groups = appGroups
    .map((group) => ({
      ...group,
      apps: apps.filter((app) => app.group === group.id),
    }))
    .filter((group) => group.apps.length > 0)

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-20 sm:pt-24 pb-16">
      {groups.map((group) => (
        <section key={group.id} className="mb-14">
          <h2 className="mb-6 text-[10px] uppercase tracking-[0.3em] text-neutral-400">
            {group.label}
          </h2>
          <div className="flex flex-wrap gap-x-8 gap-y-10 sm:gap-x-12">
            {group.apps.map((app) => (
              <AppTile key={app.name} app={app} />
            ))}
          </div>
        </section>
      ))}
      <p className="text-sm text-neutral-500 text-center">
        More on{' '}
        <a
          href="https://github.com/dylsteck"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  )
}

function AppTile({ app }: { app: App }) {
  return (
    <div className="flex w-[calc(50%-1rem)] flex-col items-center text-center sm:w-40">
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full flex-col items-center"
      >
        <div className="relative mb-3 h-20 w-20 transition-transform duration-300 ease-out group-hover:scale-110 sm:h-24 sm:w-24">
          <Image
            src={app.imageUrl}
            alt={app.name}
            fill
            className={`rounded-[22%] object-cover shadow-lg dark:shadow-xl ${
              app.hidden ? 'opacity-20' : ''
            }`}
            sizes="(max-width: 640px) 80px, 96px"
          />
        </div>
        <span className="w-full px-1 text-sm font-medium text-neutral-600 transition-colors duration-200 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-200">
          {app.hidden ? '***' : app.name}
        </span>
      </a>
      <p className="mt-1 px-1 text-xs leading-snug text-neutral-500">
        {app.line}
      </p>
      {app.note && (
        <Link
          to="/blog/$id"
          params={{ id: app.note }}
          className="mt-1 text-xs text-neutral-500 underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          note
        </Link>
      )}
    </div>
  )
}
