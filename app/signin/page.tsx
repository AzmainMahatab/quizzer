"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Divider, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase/Auth';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (user) router.replace('/profile');
    });
    return () => unsub();
  }, [router]);

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace('/profile');
    } catch (e: any) {
      setError(e?.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/profile');
    } catch (e: any) {
      setError(e?.message || 'Email sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">Sign in</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleEmailSignIn}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" disabled={loading}>Sign in with Email</Button>
        </Box>
      </form>
      <Divider>OR</Divider>
      <Button onClick={handleGoogle} variant="outlined" disabled={loading}>Continue with Google</Button>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Typography>Don't have an account?</Typography>
        <Button variant="text" onClick={() => router.push('/signup')}>Create one</Button>
      </Box>
      <Button variant="text" onClick={() => router.push('/')}>Back to Home</Button>
    </Box>
  );
}
