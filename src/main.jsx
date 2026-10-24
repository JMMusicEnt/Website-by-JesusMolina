import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { BASENAME } from './data/sites'

// Old HashRouter links (/#/concerts, /#/mister-molina#spotify) -> clean paths (/concerts, ...)
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', `${BASENAME}${window.location.hash.slice(1)}`)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
