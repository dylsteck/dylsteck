import Link from 'next/link'
import Topbar from './components/topbar'

export default function NotFound() {
  return (
    <>
      <Topbar />
      <div className="min-h-screen bg-white dark:bg-black pt-16">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-medium text-neutral-900 dark:text-neutral-100 mb-4 tracking-tight">
              404
            </h1>
            <Link
              href="/"
              className="inline-block text-sm sm:text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors underline underline-offset-4"
            >
              return to home
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}