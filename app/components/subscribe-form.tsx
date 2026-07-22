import { useState } from 'react'

type Variant = 'fixed' | 'inline'

export default function SubscribeForm({ variant }: { variant: Variant }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to subscribe')
        return
      }
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong')
    }
  }

  const isFixed = variant === 'fixed'

  return (
    <div
      className={
        isFixed
          ? 'fixed bottom-6 right-6 z-30 pointer-events-auto text-right'
          : 'mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800'
      }
    >
      <div className="text-sm text-neutral-500 dark:text-neutral-500 max-w-xs">
        {isFixed && !isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="cursor-pointer transition-all duration-300 hover:opacity-80 no-underline text-[10px] uppercase tracking-[0.3em]"
          >
            [ subscribe ]
          </button>
        ) : (
          <>
            {!isFixed && (
              <p className="text-neutral-600 dark:text-neutral-400 mb-3">Get new posts by email</p>
            )}
            {isFixed && (
              <button
                onClick={() => setIsExpanded(false)}
                className="block mb-2 text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer"
              >
                [ subscribe ]
              </button>
            )}
            {status === 'success' ? (
              <p className="text-neutral-600 dark:text-neutral-400">Thanks, you&apos;re subscribed.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  disabled={status === 'loading'}
                  className="bg-transparent border-b border-neutral-300 dark:border-neutral-600 py-1 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-400 min-w-[180px]"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-opacity disabled:opacity-50 cursor-pointer self-start sm:self-auto"
                >
                  {status === 'loading' ? '...' : '→'}
                </button>
              </form>
            )}
            {status === 'error' && errorMessage && (
              <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errorMessage}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
