"use client";

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export interface QuestionData {
  question: string;
  answers: string[];
  correct_answer: string;
}

export default function QuestionCard({
  data,
  selectedAnswer,
  disabled,
  onSelect,
}: {
  data: QuestionData;
  selectedAnswer: string | null;
  disabled?: boolean;
  onSelect: (answer: string) => void;
}) {
  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 1 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>{data.question}</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
        {data.answers.map((answer: string, index: number) => {
          const isSelected = selectedAnswer === answer;
          const color = isSelected
            ? (answer === data.correct_answer ? 'success' : 'error')
            : 'primary';
          return (
            <Button
              key={index}
              variant={isSelected ? 'contained' : 'outlined'}
              color={color as any}
              onClick={() => onSelect(answer)}
              disabled={!!disabled}
            >
              {answer}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
