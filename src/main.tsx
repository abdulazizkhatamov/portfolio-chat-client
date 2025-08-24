import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles.css'
import { AppProviders } from '@/providers'
import reportWebVitals from '@/reportWebVitals'

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AppProviders />
    </StrictMode>,
  )
}

reportWebVitals()
