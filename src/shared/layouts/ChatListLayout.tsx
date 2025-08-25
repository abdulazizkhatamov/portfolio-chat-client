import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Button } from '../components/ui/button'

interface ChatListLayoutProps {
  children: React.ReactNode
}

export default function ChatListLayout({ children }: ChatListLayoutProps) {
  return (
    <div className="relative h-full">
      <div>{children}</div>
      <Button className="absolute bottom-6 right-6 z-10 h-10 w-10 rounded-full shadow-lg">
        <PlusIcon className="h-6 w-6" />
      </Button>
    </div>
  )
}
