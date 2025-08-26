import React from 'react'
import { TooltipProvider } from '@/shared/components/ui/tooltip'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/shared/components/ui/resizable'
import { cn } from '@/core/lib/utils'
import { useAppLayout } from '@/features/app/hooks/useAppLayout'

interface AppLayoutProps {
  left: React.ReactNode
  middle: React.ReactNode
  right: React.ReactNode
}

export default function AppLayout({ left, middle, right }: AppLayoutProps) {
  const { defaultLayout, isCollapsed, setIsCollapsed } = useAppLayout()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: Array<number>) => {
          document.cookie = `react-resizable-panels:layout:app=${JSON.stringify(sizes)}`
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
          <div className="relative h-screen">{middle}</div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          {right}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
