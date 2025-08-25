// providers/ReduxProvider.tsx
import { Provider } from 'react-redux'
import { store } from '@/providers/redux-provider/store'

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}
