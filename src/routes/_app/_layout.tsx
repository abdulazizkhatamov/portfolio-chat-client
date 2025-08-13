import { Outlet, createFileRoute } from '@tanstack/react-router'
import { InboxIcon, UserIcon, Users2Icon } from 'lucide-react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { accounts, chats } from '@/features/chat/data'
import { cn } from '@/lib/utils'
import { AccountSwitcher } from '@/features/chat/components/AccountSwitcher'
import { Nav } from '@/features/chat/components/Nav'
import { useChat } from '@/features/chat/ChatContext'
import { ChatDisplay } from '@/features/chat/components/ChatDisplay'

export const Route = createFileRoute('/_app/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  const { defaultLayout, isCollapsed, setIsCollapsed, selectedChatId } =
    useChat()

  return (
    <div className="flex-col md:flex h-screen">
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: Array<number>) => {
            document.cookie = `react-resizable-panels:layout:chat=${JSON.stringify(sizes)}`
          }}
          className="h-full max-h-screen items-stretch"
        >
          {/* Sidebar */}
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={4}
            collapsible
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              setIsCollapsed(true)
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
            }}
            onResize={() => {
              setIsCollapsed(false)
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
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

          {/* Middle Panel (chat list) */}
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <Outlet /> {/* Child routes render just the chat list UI */}
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel (chat display) */}
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <ChatDisplay
              chat={chats.find((item) => item.id === selectedChatId) || null}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  )
}
