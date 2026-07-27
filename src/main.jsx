import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LearnLog } from './LearnLog.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LearnLog />
  </StrictMode>,
)
