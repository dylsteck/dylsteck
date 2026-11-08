import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/info')({
  beforeLoad: () => {
    throw redirect({ to: '/about', statusCode: 301 })
  },
})
