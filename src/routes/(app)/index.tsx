import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ChatList } from '@/features/chat/components/ChatList'

import NewConversation from '@/features/chat/components/NewChat'
import { useFetchChats } from '@/features/chat/hooks/useChatQueries'

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useFetchChats()
  return (
    <React.Fragment>
      <ChatList items={data || []} />
      <NewConversation />
    </React.Fragment>
  )
}
