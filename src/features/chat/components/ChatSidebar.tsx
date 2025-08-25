import { InboxIcon, UserIcon, Users2Icon } from 'lucide-react'
import { Separator } from '@/shared/components/ui/separator'
import { SidebarNav } from '@/features/chat/components/ChatSidebarNav'
import { cn } from '@/core/lib/utils'
import { SidebarMenu } from '@/features/chat/components/ChatSidebarMenu'
import { useChatLayout } from '@/features/chat/hooks/useChatLayout'

export default function ChatSidebar() {
  const { isCollapsed } = useChatLayout()
  return (
    <>
      <div
        className={cn(
          'flex h-[52px] items-center justify-center',
          isCollapsed ? 'h-[52px]' : 'px-2',
        )}
      >
        <SidebarMenu isCollapsed={isCollapsed} />
      </div>
      <Separator />
      <SidebarNav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'All chats',
            label: '128',
            icon: InboxIcon,
            href: '/',
          },
          {
            title: 'Contacts',
            label: '972',
            icon: UserIcon,
            href: '/contacts',
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
    </>
  )
}
