import { useState } from 'react'
import { LogOut, MoreVertical, PlusCircle, User, UserPlus } from 'lucide-react'
import { cn } from '@/core/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Sheet } from '@/shared/components/ui/sheet'
import NewGroupForm from '@/features/sidebar/forms/NewGroupForm'
import NewContactForm from '@/features/sidebar/forms/NewContactForm'

interface SidebarMenuProps {
  isCollapsed: boolean
}

type SheetType = 'group' | 'contact' | null

export function SidebarMenu({ isCollapsed }: SidebarMenuProps) {
  const [activeSheet, setActiveSheet] = useState<SheetType>(null)

  const closeSheet = () => setActiveSheet(null)

  return (
    <>
      {/* Group Sheet */}
      <Sheet
        open={activeSheet === 'group'}
        onOpenChange={(open) => setActiveSheet(open ? 'group' : null)}
      >
        <NewGroupForm close={closeSheet} />
      </Sheet>

      {/* Contact Sheet */}
      <Sheet
        open={activeSheet === 'contact'}
        onOpenChange={(open) => setActiveSheet(open ? 'contact' : null)}
      >
        <NewContactForm close={closeSheet} />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'w-full flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted focus:outline-none',
              isCollapsed &&
                'flex h-9 w-9 shrink-0 items-center justify-center p-0',
            )}
            aria-label="Open actions menu"
          >
            <MoreVertical className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span>Menu</span>}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem
            className="gap-2"
            onClick={() => setActiveSheet('group')}
          >
            <PlusCircle className="h-4 w-4" />
            New Group
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            onClick={() => setActiveSheet('contact')}
          >
            <UserPlus className="h-4 w-4" />
            New Contact
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-2">
            <User className="h-4 w-4" />
            My Account
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
            <LogOut className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
