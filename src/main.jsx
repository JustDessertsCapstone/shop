import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import ProductPage from './ProductPage.jsx'
import AboutPage from './AboutPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="43903682458-v5dr38m8qmeak6n5unja52qjt065p7p5.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/shop/" element={<App />} />
          <Route path="/shop/product/:productID" element={<ProductPage />} />
          <Route path="/shop/about/" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>,
)
