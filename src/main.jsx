import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ProductPage from './ProductPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/shop/" element={<App />} />
        <Route path="/shop/product/:productID" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
