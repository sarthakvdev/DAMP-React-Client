import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { MoralisProvider } from 'react-moralis';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <MoralisProvider
        appId="yH6HTyE59GwhK3NUpG1Nn0igKwlkz0xoGeQMyh7f"
        serverUrl="https://4v0nmcoywkk8.usemoralis.com:2053/server"
      >
        <Router>
          <App />
        </Router>
      </MoralisProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
