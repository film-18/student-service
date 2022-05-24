import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';


import 'antd/dist/antd.less';
import { GoogleProvider } from './contexts/GoogleContext';
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider,createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('filmballpetenewbeer-token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});



// const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
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
