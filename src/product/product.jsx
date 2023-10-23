import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <header className="header">
        <h1 className="banner">Healthify</h1>
      </header>

      <main>
        <h1> Hello, welcome to Healthify</h1>
        <p>Yeah, this is all raw as hell HTML. It'll get there, promise.</p>
        <a href="/shop/">Home</a>
      </main>

      <footer>
        <p>
          Within Healthify, you will find that being rewarded for making better choices is so rewarding!
        </p>
      </footer>
  </React.StrictMode>,
)