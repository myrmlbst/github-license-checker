import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GithubLicenses from './GithubLicenses.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GithubLicenses />
  </StrictMode>,
)
