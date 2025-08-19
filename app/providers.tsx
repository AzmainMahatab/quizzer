"use client";

import React from 'react';
import { Provider } from 'react-redux';
import store from '../lib/model/store';
import { CssBaseline, Container, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../lib/theme/md3Theme';
import { ThemeProvider, useTheme } from '../lib/context/ThemeContext';
import Header from './ui/Header';

function AppContent({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme === 'light' ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Header />
      <Container sx={{ py: 4 }}>
        {children}
      </Container>
    </MuiThemeProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent>
          {children}
        </AppContent>
      </ThemeProvider>
    </Provider>
  );
}
