"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { categories } from '../../lib/constants/ApiConstants';
import { addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from '../../lib/firebase/Auth';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import QuizActions from './components/QuizActions';
import { decodeHtml, shuffleArray, formatTime } from '../../lib/quiz/utils';

export default function QuizPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const quizParams = useSelector((state: any) => state.quizParams);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isAnswered, setIsAnswered] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  // Build SWR key (URL) only when quizParams exist
  const apiUrl = useMemo(() => {
    if (!quizParams) return null;
    const params = new URLSearchParams();
    Object.entries(quizParams).forEach(([k, v]) => params.append(k, String(v)));
    return `https://opentdb.com/api.php?${params.toString()}`;
  }, [quizParams]);

  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
  });

  // Transform questions when data changes
  useEffect(() => {
    if (data?.results) {
      const mapped = data.results.map((question: any) => ({
        ...question,
        question: decodeHtml(question.question),
        answers: shuffleArray([
          ...question.incorrect_answers.map((a: string) => decodeHtml(a)),
          decodeHtml(question.correct_answer),
        ]),
      }));
      setQuestions(mapped);
    }
  }, [data]);

  useEffect(() => {
    if (!quizParams) {
      router.push('/newquiz');
    }
    // reset timer on mount or when quiz params change
    startTimeRef.current = Date.now();
  }, [quizParams, router]);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (!isUploaded) {
        setIsUploaded(true);
        const endDate = new Date();
        const user = auth.currentUser;
        const topicName = categories.find(category => category.id === quizParams.category)!.name;
        const quizSummary = {
          userId: user?.uid,
          displayName: user?.displayName ?? 'Guest',
          submissionDate: endDate.toISOString().split('T')[0],
          submissionTime: endDate.toTimeString().split(' ')[0],
          topic: topicName,
          score: `${score}/${questions.length}`,
          numericScore: score,
          totalQuestions: questions.length,
          tookTimeToSolve: formatTime(Date.now() - startTimeRef.current),
        } as any;
        dispatch({ type: 'SET_QUIZ_SUMMARY', payload: quizSummary });
        if (user) {
          // Persist to Firestore for authenticated users
          Promise.all([
            addDoc(collection(firestore, 'quizSummaries'), quizSummary),
            addDoc(collection(firestore, 'leaderboard'), {
              userId: user.uid,
              displayName: user.displayName,
              submissionDate: quizSummary.submissionDate,
              submissionTime: quizSummary.submissionTime,
              topic: topicName,
              numericScore: score,
              totalQuestions: questions.length,
              tookTimeToSolve: quizSummary.tookTimeToSolve,
            }),
          ]).then(() => router.push('/result'));
        } else {
          // Guest mode: persist locally only
          try {
            const existing = typeof window !== 'undefined' ? localStorage.getItem('guestQuizSummaries') : null;
            const arr = existing ? JSON.parse(existing) : [];
            arr.unshift(quizSummary);
            if (typeof window !== 'undefined') localStorage.setItem('guestQuizSummaries', JSON.stringify(arr));
          } catch (e) {
            console.warn('Failed to save guest summary locally', e);
          }
          router.push('/result');
        }
      }
    }
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      if (answer === questions[currentQuestion].correct_answer) {
        setScore(score + 1);
      }
      setTimeout(() => {
        handleNextQuestion();
        setIsAnswered(false);
      }, 500);
    }
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <QuizHeader currentIndex={currentQuestion} total={questions.length} score={score} />
      {error ? (
        <Typography color="error">Failed to load questions.</Typography>
      ) : isLoading ? (
        <Typography>Loading...</Typography>
      ) : questions.length > 0 ? (
        <>
          <QuestionCard
            data={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            disabled={isAnswered}
            onSelect={handleAnswer}
          />
          <QuizActions
            onNext={handleNextQuestion}
            isLast={currentQuestion >= questions.length - 1}
          />
        </>
      ) : (
        <Typography>No questions found. Try different parameters.</Typography>
      )}
    </Box>
  );
}
