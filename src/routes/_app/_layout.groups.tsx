import { createFileRoute } from '@tanstack/react-router'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'
import { Separator } from '@/shared/components/ui/separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import { ChatList } from '@/features/chat/components/ChatList'
import { chats } from '@/features/chat/data'

export const Route = createFileRoute('/_app/_layout/groups')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Tabs defaultValue="all" className="flex flex-col">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Groups</h1>
        <TabsList className="ml-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
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
      <TabsContent value="all" className="flex-1 overflow-auto">
        <ChatList items={chats} />
      </TabsContent>
      <TabsContent value="unread" className="flex-1 overflow-auto">
        <ChatList items={chats.filter((item) => !item.read)} />
      </TabsContent>
    </Tabs>
  )
}
