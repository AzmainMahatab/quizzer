"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const quizSummary = useSelector((state: any) => state.quizSummary);
  const router = useRouter();

  if (!quizSummary) {
    router.push('/newquiz');
  }

  const handleNewQuiz = () => {
    router.push('/newquiz');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {quizSummary && (
        <>
          <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 1 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>Quiz Result</Typography>
            <Typography>Topic: {quizSummary.topic}</Typography>
            <Typography>Your score: {quizSummary.score}</Typography>
            <Typography>Time Took: {quizSummary.tookTimeToSolve}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary" onClick={handleNewQuiz}>Start New Quiz</Button>
            <Button variant="outlined" onClick={() => router.push('/leaderboard')}>Leaderboard</Button>
            <Button variant="text" color="secondary" onClick={handleProfile}>Go to Profile</Button>
          </Box>
        </>
      )}
    </Box>
  );
}
