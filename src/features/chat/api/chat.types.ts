export interface CreateChatPayload {
  members: Array<string>
  name: string
}

export interface ChatMember {
  _id: string
  email: string
  first_name?: string
  last_name?: string
}

export interface Message {
  _id: string
  chat: string
  content: string
  sender: ChatMember
  createdAt: string
  edited?: boolean
  deleted?: boolean
}

export interface Chat {
  _id: string
  name: string
  members: Array<ChatMember>
  lastMessage?: Message
  createdAt: string
  updatedAt: string
}

export interface PaginatedMessages {
  messages: Array<Message>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
