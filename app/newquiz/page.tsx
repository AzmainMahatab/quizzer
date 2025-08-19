"use client";

import React, { useState } from 'react';
import { Button, Typography, Box, TextField, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { categories, difficulties, questionTypes } from '../../lib/constants/ApiConstants';
import { useRouter } from 'next/navigation';

export default function NewQuiz() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(10);
  const [category, setCategory] = useState<number>(categories[0].id);
  const [difficulty, setDifficulty] = useState<string>(difficulties[0]);
  const [questionType, setQuestionType] = useState<string>(questionTypes[0]);
  const router = useRouter();

  const handleStartQuiz = () => {
    dispatch({
      type: 'SET_QUIZ_PARAMS',
      payload: { amount, category, difficulty, type: questionType },
    });
    router.push('/quiz');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h3" component="h1">New Quiz</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(+(e.target.value))} />
        <TextField select label="Category" value={category} onChange={(e) => setCategory(+(e.target.value))}>
          {categories.map((option) => (
            <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {difficulties.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Type" value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
          {questionTypes.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Box>
        <Button variant="contained" color="primary" onClick={handleStartQuiz}>Start Quiz</Button>
      </Box>
    </Box>
  );
}
