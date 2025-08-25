import { createFileRoute } from '@tanstack/react-router'
import { ChatList } from '@/features/chat/components/ChatList'

import { chats } from '@/features/chat/data'

export const Route = createFileRoute('/_chat/contacts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ChatList items={chats} />
}
