import { createFileRoute } from '@tanstack/react-router'
import HomeContent from '../components/home-content'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return <HomeContent />
}
