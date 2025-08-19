"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';

export default function QuizHeader({
  currentIndex,
  total,
  score,
}: {
  currentIndex: number;
  total: number;
  score: number;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="subtitle1">Question {currentIndex + 1}/{total}</Typography>
      <Typography variant="subtitle1">Score: {score}</Typography>
    </Box>
  );
}
