import { InboxIcon, UserIcon, Users2Icon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useChat } from '@/features/chat/ChatContext'
import { SidebarNav } from '@/features/sidebar/components/SidebarNav'
import { cn } from '@/lib/utils'
import { SidebarMenu } from '@/features/sidebar/components/SidebarMenu'

export default function Sidebar() {
  const { isCollapsed } = useChat()
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
    </>
  )
}
