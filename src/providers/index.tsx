import { QueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ReduxProvider } from './redux-provider/provider'
import { QueryProvider } from './query-provider/provider'
import { AppRouterProvider } from './router-provider/provider'

export const AppProviders = () => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ReduxProvider>
      <QueryProvider>
        <AppRouterProvider queryClient={queryClient} />
      </QueryProvider>
    </ReduxProvider>
  )
}
