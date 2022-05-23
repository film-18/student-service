import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';


import 'antd/dist/antd.less';
import { GoogleProvider } from './contexts/GoogleContext';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'



// const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GoogleProvider>
          <App />
        </GoogleProvider>
      </BrowserRouter>
    // </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
