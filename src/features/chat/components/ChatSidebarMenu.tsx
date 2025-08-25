import { LogOut, MoreVertical, User } from 'lucide-react'
import { cn } from '@/core/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

interface SidebarMenuProps {
  isCollapsed: boolean
}

export function SidebarMenu({ isCollapsed }: SidebarMenuProps) {
  return (
    <>
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
