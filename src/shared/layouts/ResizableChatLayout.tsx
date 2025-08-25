import React from 'react'
import { TooltipProvider } from '@/shared/components/ui/tooltip'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable'
import { cn } from '@/core/lib/utils'
import { useChatLayout } from '@/features/chat/hooks/useChatLayout'

interface ResizableChatLayoutProps {
  left: React.ReactNode
  middle: React.ReactNode
  right: React.ReactNode
}

export default function ResizableChatLayout({
  left,
  middle,
  right,
}: ResizableChatLayoutProps) {
  const { defaultLayout, isCollapsed, setIsCollapsed } = useChatLayout()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: Array<number>) => {
          document.cookie = `react-resizable-panels:layout:chat=${JSON.stringify(sizes)}`
        }}
        className="h-full max-h-screen items-stretch"
      >
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
          {left}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {middle}
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          {right}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
