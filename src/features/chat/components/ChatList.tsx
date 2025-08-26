import { formatDistanceToNow } from 'date-fns'
import { SearchIcon } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import type { Chat } from '../api/chat.types'

import { cn } from '@/core/lib/utils'
import { Input } from '@/shared/components/ui/input'
import { ScrollArea } from '@/shared/components/ui/scroll-area'

interface ChatListProps {
  items: Array<Chat>
}

export function ChatList({ items }: ChatListProps) {
  const { selectedChatId, setSelectedChatId } = useChat()

  return (
    <div className="flex flex-col h-screen">
      {/* Search */}
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {items.length === 0 && (
            <div className="text-muted-foreground text-sm text-center mt-4">
              No conversations yet
            </div>
          )}

          {items.map((item) => {
            const lastMessageText = item.lastMessage?.content ?? ''

            return (
              <button
                key={item._id}
                className={cn(
                  'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                  selectedChatId === item._id && 'bg-muted',
                )}
                onClick={() => setSelectedChatId(item._id)}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{item.name}</div>
                    </div>
                    <div
                      className={cn(
                        'ml-auto text-xs',
                        selectedChatId === item._id
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {formatDistanceToNow(
                        new Date(item.updatedAt || item.createdAt),
                        { addSuffix: true },
                      )}
                    </div>
                  </div>
                </div>

                <div className="line-clamp-2 text-xs text-muted-foreground">
                  {lastMessageText.substring(0, 300)}
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
