import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GridBackground  from './components/GridBackground.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GridBackground>
      <App />
    </GridBackground>
  </React.StrictMode>,
)
