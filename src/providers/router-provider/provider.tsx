import { RouterProvider, createRouter } from '@tanstack/react-router'
import { LoaderIcon } from 'lucide-react'
import type { QueryClient } from '@tanstack/react-query'
import { routeTree } from '@/routeTree.gen'
import { useAuth } from '@/features/auth/hooks/useAuth'

// create router (only type shape, no hooks here)
const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
    auth: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// provider component that supplies runtime context
export const AppRouterProvider = ({
  queryClient,
}: {
  queryClient: QueryClient
}) => {
  const auth = useAuth()

  // Show loader until auth is ready
  if (!auth.isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoaderIcon className="animate-spin h-8 w-8 text-gray-600" />
      </div>
    )
  }
  return <RouterProvider router={router} context={{ queryClient, auth }} />
}
