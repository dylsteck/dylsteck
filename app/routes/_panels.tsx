import { createFileRoute, Outlet } from '@tanstack/react-router'
import HomeContent from '../components/home-content'

export const Route = createFileRoute('/_panels')({
  component: PanelLayout,
})

function PanelLayout() {
  return (
    <HomeContent>
      <Outlet />
    </HomeContent>
  )
}
