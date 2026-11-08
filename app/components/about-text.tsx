import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import CoinbaseIcon from './icons/coinbase-icon'

const linkClass =
  'underline underline-offset-4 hover:opacity-70 transition-opacity'

export default function AboutText() {
  const [isFirstExpanded, setIsFirstExpanded] = useState(false)
  const [isSecondExpanded, setIsSecondExpanded] = useState(false)

  return (
    <div className="max-w-sm text-left text-sm text-neutral-500">
      <p>
        <button
          type="button"
          onClick={() => setIsFirstExpanded(!isFirstExpanded)}
          className="cursor-pointer text-left transition-opacity hover:opacity-80"
        >
          Engineer at{' '}
          <span className="mx-1 inline-flex items-center align-middle">
            <CoinbaseIcon className="h-4 w-4 text-[#0052FF] dark:text-white" />
          </span>
          Coinbase{isFirstExpanded ? '' : '.'}
        </button>
        {isFirstExpanded && (
          <>
            {' '}
            working on{' '}
            <a
              href="https://wallet.coinbase.com"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Coinbase Wallet
            </a>
            .
          </>
        )}
      </p>
      <p>
        <button
          type="button"
          onClick={() => setIsSecondExpanded(!isSecondExpanded)}
          className="cursor-pointer text-left transition-opacity hover:opacity-80"
        >
          Building products that give people more agency
          {isSecondExpanded ? '' : '.'}
        </button>
        {isSecondExpanded && (
          <>
            {' '}
            and exploring{' '}
            <a
              href="https://withcortex.com"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              personal operating systems
            </a>{' '}
            and{' '}
            <Link
              to="/blog/$id"
              params={{ id: 'agentic-workspaces' }}
              className={linkClass}
            >
              agentic work
            </Link>
            .
          </>
        )}
      </p>
    </div>
  )
}
