import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import AppRoutes from './routes';
import { theme } from './theme';
import { cache } from './cache';

export const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme.default}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
