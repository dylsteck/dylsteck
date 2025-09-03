function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 p-4 z-20">
      <div className="flex flex-row justify-between items-center">
        <ul className="font-sm flex flex-row space-x-4 text-neutral-600 dark:text-neutral-300">
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">rss</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/dylsteck/dylsteck"
            >
              <ArrowIcon />
              <p className="ml-2 h-7">github</p>
            </a>
          </li>
        </ul>
        <p className="text-neutral-600 dark:text-neutral-300">
          © {new Date().getFullYear()} MIT Licensed
        </p>
      </div>
    </footer>
  )
}
