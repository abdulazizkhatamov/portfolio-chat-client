import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { ChatDisplay } from '@/features/chat/components/ChatDisplay'
import AppSidebar from '@/features/app/components/AppSidebar'
import AppLayout from '@/shared/layouts/AppLayout'
import {
  useFetchChatById,
  useFetchChatMessages,
} from '@/features/chat/hooks/useChatQueries'
import { useChat } from '@/features/chat/hooks/useChat'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.user) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  const { selectedChatId } = useChat()

  // Fetch chat metadata
  const {
    data: chat,
    isLoading: chatLoading,
    isError: chatError,
  } = useFetchChatById(selectedChatId)

  // Fetch messages for this chat (first page)
  const {
    data: messagesData,
    isLoading: messagesLoading,
    isError: messagesError,
  } = useFetchChatMessages(selectedChatId, 1, 20)

  return (
    <AppLayout
      left={<AppSidebar />}
      middle={<Outlet />}
      right={
        chatLoading || messagesLoading ? (
          <div className="p-4">Loading chat...</div>
        ) : chatError || messagesError ? (
          <div className="p-4 text-red-500">Failed to load chat</div>
        ) : (
          <ChatDisplay
            chat={chat || null}
            messages={messagesData?.messages || []}
          />
        )
      }
    />
  )
}
