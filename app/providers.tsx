"use client";

import React from 'react';
import { Provider } from 'react-redux';
import store from '../lib/model/store';
import { CssBaseline, Container, ThemeProvider } from '@mui/material';
import md3Theme from '../lib/theme/md3Theme';
import Header from './ui/Header';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={md3Theme}>
        <CssBaseline />
        <Header />
        <Container sx={{ py: 4 }}>
          {children}
        </Container>
      </ThemeProvider>
    </Provider>
  );
}
