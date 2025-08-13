import React from 'react'
import Cookies from 'js-cookie'
import type { Chat } from '@/features/chat/data'
import { chats } from '@/features/chat/data'

export interface ChatContextType {
  defaultLayout: Array<number>
  setDefaultLayout: React.Dispatch<React.SetStateAction<Array<number>>>
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  selectedChatId: Chat['id'] | null
  setSelectedChatId: React.Dispatch<React.SetStateAction<Chat['id'] | null>>
}

export const ChatContext = React.createContext<ChatContextType>({
  defaultLayout: [],
  setDefaultLayout: () => {},
  isCollapsed: false,
  setIsCollapsed: () => {},
  selectedChatId: null,
  setSelectedChatId: () => {},
})

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [defaultLayout, setDefaultLayout] = React.useState<Array<number>>([
    20, 32, 48,
  ])
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [selectedChatId, setSelectedChatId] = React.useState<Chat['id'] | null>(
    chats.length > 0 ? chats[0].id : null,
  )

  React.useEffect(() => {
    const layoutCookie = Cookies.get('react-resizable-panels:layout:chat')
    const collapsedCookie = Cookies.get('react-resizable-panels:collapsed')
    const selectedChatCookie = Cookies.get('chat:selected')

    if (layoutCookie) {
      try {
        setDefaultLayout(JSON.parse(layoutCookie))
      } catch {}
    }
    if (collapsedCookie) {
      try {
        setIsCollapsed(JSON.parse(collapsedCookie))
      } catch {}
    }
    if (selectedChatCookie) {
      try {
        setSelectedChatId(JSON.parse(selectedChatCookie))
      } catch {}
    }
  }, [])

  // Optional: persist changes to cookies automatically
  React.useEffect(() => {
    Cookies.set(
      'react-resizable-panels:layout:chat',
      JSON.stringify(defaultLayout),
    )
  }, [defaultLayout])

  React.useEffect(() => {
    Cookies.set('react-resizable-panels:collapsed', JSON.stringify(isCollapsed))
  }, [isCollapsed])

  React.useEffect(() => {
    Cookies.set('chat:selected', JSON.stringify(selectedChatId))
  }, [selectedChatId])

  const value = React.useMemo(
    () => ({
      defaultLayout,
      setDefaultLayout,
      isCollapsed,
      setIsCollapsed,
      selectedChatId,
      setSelectedChatId,
    }),
    [defaultLayout, isCollapsed, selectedChatId],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => React.useContext(ChatContext)
