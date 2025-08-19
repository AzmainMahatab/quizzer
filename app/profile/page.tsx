"use client";

import React, { useEffect, useState } from 'react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { Button, Typography, Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@mui/material';
import { auth, firestore } from '../../lib/firebase/Auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [previousQuizzes, setPreviousQuizzes] = useState<any[]>([]);

  useEffect(() => {
    setUser(auth.currentUser);
    if (!auth.currentUser) {
      router.push('/signin');
      return;
    }
    const fetchQuizSummaries = async () => {
      const query1 = query(collection(firestore, 'quizSummaries'), where('userId', '==', auth.currentUser!.uid));
      const querySnapshot = await getDocs(query1);
      const quizzes = querySnapshot.docs.map(doc => doc.data() as any);
      quizzes.sort((a: any, b: any) => {
        const dateA = new Date(a.submissionDate + ' ' + a.submissionTime);
        const dateB = new Date(b.submissionDate + ' ' + b.submissionTime);
        return (dateB as any) - (dateA as any);
      });
      setPreviousQuizzes(quizzes);
    };

    fetchQuizSummaries();
  }, [router]);

  const handleStartQuiz = () => {
    router.push('/newquiz');
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 1 }}>
        <Typography variant="h4">Welcome, {user?.displayName}</Typography>
        <Typography color="text.secondary">Email: {user?.email}</Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" color="primary" onClick={handleStartQuiz}>Start New Quiz</Button>
          <Button variant="outlined" onClick={() => router.push('/leaderboard')}>Leaderboard</Button>
          <Button variant="text" color="secondary" onClick={handleSignOut}>Sign Out</Button>
        </Box>
      </Box>
      <Typography variant="h6" component="div">Previous Records</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Time Took</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {previousQuizzes.map((quiz, index) => (
              <TableRow key={index}>
                <TableCell>{(quiz as any).submissionDate}</TableCell>
                <TableCell>{(quiz as any).submissionTime}</TableCell>
                <TableCell>{(quiz as any).topic}</TableCell>
                <TableCell>{(quiz as any).score}</TableCell>
                <TableCell>{(quiz as any).tookTimeToSolve}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
