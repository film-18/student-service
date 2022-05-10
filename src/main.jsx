import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import 'antd/dist/antd.less';
import { GoogleProvider } from './contexts/GoogleContext';

ReactDOM.render(
  <React.StrictMode>
    <GoogleProvider>
      <App />
    </GoogleProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
