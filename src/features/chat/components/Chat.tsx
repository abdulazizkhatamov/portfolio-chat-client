import * as React from 'react'
import { InboxIcon, SearchIcon, UserIcon, Users2Icon } from 'lucide-react'

import type { Chat } from '@/features/chat/data'
import { cn } from '@/lib/utils'
import { Input } from '@/components//ui/input'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components//ui/resizable'
import { Separator } from '@/components//ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components//ui/tabs'
import { TooltipProvider } from '@/components//ui/tooltip'
import { AccountSwitcher } from '@/features/chat/components/AccountSwitcher'
import { ChatList } from '@/features/chat/components/ChatList'
import { ChatDisplay } from '@/features/chat/components/ChatDisplay'
import { Nav } from '@/features/chat/components/Nav'
import { useChat } from '@/features/chat/ChatContext'

interface ChatProps {
  accounts: Array<{
    label: string
    email: string
    icon: React.ReactNode
  }>
  chats: Array<Chat>
  defaultLayout: Array<number> | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Chat({
  accounts,
  chats,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const { selectedChatId } = useChat()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: Array<number>) => {
          document.cookie = `react-resizable-panels:layout:chat=${JSON.stringify(
            sizes,
          )}`
        }}
        className="h-full max-h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true,
            )}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false,
            )}`
          }}
          className={cn(
            isCollapsed &&
              'min-w-[50px] transition-all duration-300 ease-in-out',
          )}
        >
          <div
            className={cn(
              'flex h-[52px] items-center justify-center',
              isCollapsed ? 'h-[52px]' : 'px-2',
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: 'All chats',
                label: '128',
                icon: InboxIcon,
                href: '/',
              },
              {
                title: 'Private chats',
                label: '972',
                icon: UserIcon,
                href: '/dms',
              },
              {
                title: 'Groups',
                label: '972',
                icon: Users2Icon,
                href: '/groups',
              },
            ]}
          />
          <Separator />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <ChatList items={chats} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <ChatList items={chats.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <ChatDisplay
            chat={chats.find((item) => item.id === selectedChatId) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
