"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Divider, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase/Auth';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
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

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (displayName.trim()) {
        await updateProfile(cred.user, { displayName: displayName.trim() });
      }
      router.replace('/profile');
    } catch (e: any) {
      setError(e?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">Create account</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleEmailSignUp}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Display name" value={displayName} onChange={e => setDisplayName(e.target.value)} />
          <TextField type="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <TextField type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <Button type="submit" variant="contained" disabled={loading}>Sign up with Email</Button>
        </Box>
      </form>
      <Divider>OR</Divider>
      <Button onClick={handleGoogle} variant="outlined" disabled={loading}>Continue with Google</Button>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Typography>Already have an account?</Typography>
        <Button variant="text" onClick={() => router.push('/signin')}>Sign in</Button>
      </Box>
      <Button variant="text" onClick={() => router.push('/')}>Back to Home</Button>
    </Box>
  );
}
