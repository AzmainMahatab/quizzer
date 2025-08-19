"use client";

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '../../lib/firebase/Auth';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isSignedIn = !!auth.currentUser;

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => router.push('/') }>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Quizzer</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant={pathname === '/' ? 'contained' : 'text'} onClick={() => router.push('/')}>Home</Button>
          <Button variant={pathname?.startsWith('/newquiz') ? 'contained' : 'text'} onClick={() => router.push('/newquiz')}>New Quiz</Button>
          <Button variant={pathname?.startsWith('/leaderboard') ? 'contained' : 'text'} onClick={() => router.push('/leaderboard')}>Leaderboard</Button>
          {isSignedIn ? (
            <Button variant={pathname?.startsWith('/profile') ? 'contained' : 'outlined'} onClick={() => router.push('/profile')}>Profile</Button>
          ) : (
            <Button variant="outlined" onClick={() => router.push('/signin')}>Sign in</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
