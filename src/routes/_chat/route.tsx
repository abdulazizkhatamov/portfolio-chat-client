import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { ChatDisplay } from '@/features/chat/components/ChatDisplay'
import ChatSidebar from '@/features/chat/components/ChatSidebar'
import { chats } from '@/features/chat/data'
import { useChat } from '@/features/chat/hooks/useChat'
import ResizableChatLayout from '@/shared/layouts/ResizableChatLayout'
import ChatListLayout from '@/shared/layouts/ChatListLayout'

export const Route = createFileRoute('/_chat')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  const { selectedChatId } = useChat()

  return (
    <ResizableChatLayout
      left={<ChatSidebar />}
      middle={
        <ChatListLayout>
          <Outlet />
        </ChatListLayout>
      }
      right={
        <ChatDisplay
          chat={chats.find((item) => item.id === selectedChatId) || null}
        />
      }
    />
  )
}
