"use client";

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {auth} from '../lib/firebase/Auth';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {Button, Typography, Box} from '@mui/material';

export default function Page() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        router.push('/profile');
    };

    const handleButtonClick = () => {
        if (isSignedIn) {
            router.push('/profile');
        } else {
            void signInWithGoogle();
        }
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 3}}>
            <Typography variant="h2" component="h1">Quiz Me</Typography>
            <Typography variant="h6" color="text.secondary" sx={{maxWidth: 700}}>
                Welcome to Quiz Me, the ultimate quiz app for trivia enthusiasts! Choose a category and compete with
                others.
            </Typography>
            <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center'}}>
                <Button variant="contained" color="primary" onClick={() => router.push('/newquiz')}>
                    Start Quiz
                </Button>
            </Box>
        </Box>
    );
}
