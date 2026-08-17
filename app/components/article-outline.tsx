import { useEffect, useState } from 'react'
import type { ArticleSection } from '../lib/headings'

export default function ArticleOutline({
  sections,
}: {
  sections: ArticleSection[]
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    if (sections.length === 0) return

    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el != null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
          return
        }

        const above = headings.filter(
          (heading) => heading.getBoundingClientRect().top < 120
        )
        const lastAbove = above[above.length - 1]
        if (lastAbove) setActiveId(lastAbove.id)
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: [0, 1],
      }
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [sections])

  if (sections.length < 2) return null

  const activeTitle =
    sections.find((section) => section.id === activeId)?.title ??
    sections[0].title

  return (
    <nav
      aria-label="On this page"
      className="group/outline pointer-events-auto fixed top-1/2 left-3 z-20 hidden -translate-y-1/2 min-[900px]:block lg:left-4 2xl:left-8"
    >
      <div className="relative flex flex-col items-start">
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-md px-1 py-1">
          {sections.map((section) => {
            const isActive = section.id === activeId
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-label={section.title}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveId(section.id)}
                className={`block h-1 rounded-full no-underline transition-[width,background-color] duration-200 ${
                  isActive
                    ? 'w-4 bg-neutral-900 dark:bg-white'
                    : section.level === 3
                      ? 'w-2.5 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500'
                      : 'w-4 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500'
                }`}
              />
            )
          })}
        </div>

        <div className="pointer-events-none absolute top-1/2 left-full z-30 w-64 -translate-y-1/2 pl-3 opacity-0 invisible translate-x-1 transition-all duration-150 group-hover/outline:pointer-events-auto group-hover/outline:visible group-hover/outline:translate-x-0 group-hover/outline:opacity-100 group-focus-within/outline:pointer-events-auto group-focus-within/outline:visible group-focus-within/outline:translate-x-0 group-focus-within/outline:opacity-100">
          <div className="max-h-[min(24rem,70vh)] overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            {sections.map((section) => {
              const isActive = section.id === activeId
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveId(section.id)}
                  className={`block truncate rounded-xl px-3 py-1.5 text-left text-[13px] leading-snug no-underline transition-colors ${
                    section.level === 3 ? 'pl-5' : ''
                  } ${
                    isActive
                      ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-white'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/70 dark:hover:text-white'
                  }`}
                >
                  {section.title}
                </a>
              )
            })}
          </div>
        </div>

        <p className="mt-3 max-w-[9.5rem] truncate rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-500 opacity-0 transition-opacity duration-150 group-hover/outline:opacity-100 group-focus-within/outline:opacity-100 dark:bg-neutral-900 dark:text-neutral-400">
          {activeTitle}
        </p>
      </div>
    </nav>
  )
}
