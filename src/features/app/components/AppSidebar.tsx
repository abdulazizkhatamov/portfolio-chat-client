import { InboxIcon } from 'lucide-react'
import { cn } from '@/core/lib/utils'
import { AppSidebarMenu } from '@/features/app/components/AppSidebarMenu'
import { AppSidebarNav } from '@/features/app/components/AppSidebarNav'
import { useAppLayout } from '@/features/app/hooks/useAppLayout'
import { Separator } from '@/shared/components/ui/separator'

export default function AppSidebar() {
  const { isCollapsed } = useAppLayout()
  return (
    <>
      <div
        className={cn(
          'flex h-[52px] items-center justify-center',
          isCollapsed ? 'h-[52px]' : 'px-2',
        )}
      >
        <AppSidebarMenu isCollapsed={isCollapsed} />
      </div>
      <Separator />
      <AppSidebarNav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'All chats',
            label: '128',
            icon: InboxIcon,
            href: '/',
          },
        ]}
      />
      <Separator />
    </>
  )
}
