import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Popup from './popup/Popup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className='w-full min-h-screen flex justify-center items-center'>
    <Popup/>
    </main>
  </StrictMode>,
)
