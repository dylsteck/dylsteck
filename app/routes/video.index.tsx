import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/video/')({
  beforeLoad: () => {
    throw redirect({
      to: '/feed',
      search: { filter: 'video' },
      statusCode: 301,
    })
  },
})
