import { Link, useRouterState } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/core/lib/utils'
import { buttonVariants } from '@/shared/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'

interface SidebarNavProps {
  isCollapsed: boolean
  links: Array<{
    title: string
    label?: string
    icon: LucideIcon
    href: string
  }>
}

export function SidebarNav({ links, isCollapsed }: SidebarNavProps) {
  const router = useRouterState()

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => {
          const isActive = router.location.pathname === link.href
          const variant = isActive ? 'default' : 'ghost'

          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={link.href}
                  className={cn(
                    buttonVariants({ variant, size: 'icon' }),
                    'h-9 w-9',
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              to={link.href}
              className={cn(
                buttonVariants({ variant, size: 'sm' }),
                'justify-start',
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && <span className="ml-auto">{link.label}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
