import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GridBackground  from './components/GridBackground.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink} from '@apollo/client';
const client = new ApolloClient({
  link:new HttpLink({
  uri: import.meta.env.VITE_BASE_URL,
  credentials:'include'
  }),
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GridBackground>
  </React.StrictMode>,
)
