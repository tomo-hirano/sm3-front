import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmployeeManagement from './EmployeeManagement.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeManagement />
  </StrictMode>,
)
