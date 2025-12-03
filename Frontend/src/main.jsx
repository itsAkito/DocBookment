import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ScrollTop from './components/ScrollTop.jsx'
import axios from 'axios'
import './app.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx';

axios.defaults.baseURL = 'http://localhost:5000'; // adjust to your backend URL
axios.defaults.headers.common['Content-Type'] = 'application/json';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <ScrollTop />
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);