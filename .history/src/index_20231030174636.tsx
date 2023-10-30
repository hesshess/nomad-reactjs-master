import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme, lightTheme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider theme={ isDark? darkTheme : lightTheme }> */}
      <ThemeProvider theme={lightTheme }>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
