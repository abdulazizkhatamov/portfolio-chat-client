import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { ChatProvider } from '@/features/chat/ChatContext'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return (
    <ChatProvider>
      <Outlet />
    </ChatProvider>
  )
}
