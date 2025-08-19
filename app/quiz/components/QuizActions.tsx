"use client";

import React from 'react';
import { Box, Button } from '@mui/material';

export default function QuizActions({
  onNext,
  isLast,
}: {
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="contained" color="primary" onClick={onNext}>
        {isLast ? 'Finish' : 'Next Question'}
      </Button>
    </Box>
  );
}
