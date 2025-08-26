import { useState } from 'react'
import { PlusIcon } from 'lucide-react'
import NewChatForm from './NewChatForm'
import { Button } from '@/shared/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet'

export default function NewChat() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="absolute bottom-6 right-6 z-10 h-10 w-10 rounded-full shadow-lg">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <NewChatForm onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
