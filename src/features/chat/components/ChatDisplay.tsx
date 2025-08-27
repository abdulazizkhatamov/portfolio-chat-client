'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Send } from 'lucide-react'

import type { Chat, Message } from '../api/chat.types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { Textarea } from '@/shared/components/ui/textarea'
import { socket } from '@/config/socket.config'
import { useAuth } from '@/features/auth/hooks/useAuth'

interface ChatDisplayProps {
  chat: Chat | null
  messages?: Array<Message>
}

export function ChatDisplay({ chat, messages = [] }: ChatDisplayProps) {
  const { user } = useAuth()
  const [messageList, setMessageList] = useState<Array<Message>>(messages)
  const [input, setInput] = useState('')

  // 🔹 Sync local state when new messages arrive from props (e.g. after reload/fetch)
  useEffect(() => {
    setMessageList(messages)
  }, [messages])

  // 🔹 Join chat room & listen for messages
  useEffect(() => {
    if (!chat) return

    socket.on('newMessage', (msg: Message) => {
      if (msg.chat === chat._id) {
        setMessageList((prev) => [...prev, msg])
      }
    })

    return () => {
      socket.off('newMessage')
    }
  }, [chat])

  // 🔹 Handle sending
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !chat) return

    socket.emit('sendMessage', {
      chatId: chat._id,
      senderId: user?.id,
      content: input,
    })

    setInput('')
  }

  if (!chat) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Select a chat to start messaging
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold text-lg">{chat.name}</h2>
        <span className="text-sm text-muted-foreground">
          {chat.members.length} members
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messageList.length === 0 ? (
          <p className="text-muted-foreground text-center">No messages yet</p>
        ) : (
          messageList.map((msg) => (
            <div key={msg._id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={''} />
                <AvatarFallback>
                  {msg.sender.first_name?.[0] ?? '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {msg.sender.first_name} {msg.sender.last_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(msg.createdAt), 'PPpp')}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Separator className="mt-auto" />

      {/* Input box */}
      <div className="p-4 border-t">
        <form onSubmit={handleSend} className="flex items-end gap-2">
          <Textarea
            className="flex-1 resize-none p-3"
            placeholder={`Message ${chat.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
