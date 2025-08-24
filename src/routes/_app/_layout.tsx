import { Outlet, createFileRoute } from '@tanstack/react-router'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable'
import { TooltipProvider } from '@/shared/components/ui/tooltip'
import { chats } from '@/features/chat/data'
import { cn } from '@/core/lib/utils'
import { ChatDisplay } from '@/features/chat/components/ChatDisplay'
import Sidebar from '@/features/sidebar/components/Sidebar'
import { useChat } from '@/features/chat/hooks/useChat'

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
            <Sidebar />
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
