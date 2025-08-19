"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../lib/firebase/Auth';
import { Box, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { categories } from '../../lib/constants/ApiConstants';

interface LeaderboardEntry {
  userId: string;
  displayName: string;
  topic: string;
  numericScore: number;
  totalQuestions: number;
  submissionDate: string;
  submissionTime: string;
  tookTimeToSolve?: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [topic, setTopic] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const base = collection(firestore, 'leaderboard');
        let q;
        if (topic === 'all') {
          q = query(base, orderBy('numericScore', 'desc'), limit(50));
        } else {
          // Avoid composite index requirement: fetch by topic only and sort client-side
          q = query(base, where('topic', '==', topic), limit(100));
        }
        const snapshot = await getDocs(q);
        let list = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as any[];
        if (topic !== 'all') {
          list.sort((a: any, b: any) => (b.numericScore ?? 0) - (a.numericScore ?? 0));
          list = list.slice(0, 50);
        }
        if (!list.length) {
          // Fallback to local guest summaries (if any)
          try {
            const raw = typeof window !== 'undefined' ? localStorage.getItem('guestQuizSummaries') : null;
            if (raw) {
              const guest = JSON.parse(raw) as any[];
              const mapped: LeaderboardEntry[] = guest.map(g => ({
                userId: g.userId || 'guest',
                displayName: g.displayName || 'Guest',
                topic: g.topic,
                numericScore: g.numericScore ?? parseInt(String(g.score).split('/')[0] || '0', 10),
                totalQuestions: g.totalQuestions ?? parseInt(String(g.score).split('/')[1] || '0', 10),
                submissionDate: g.submissionDate,
                submissionTime: g.submissionTime,
                tookTimeToSolve: g.tookTimeToSolve,
              }));
              const filtered = topic === 'all' ? mapped : mapped.filter(m => m.topic === topic);
              filtered.sort((a, b) => b.numericScore - a.numericScore);
              list = filtered.slice(0, 50);
            }
          } catch (e) {
            // ignore guest fallback errors
          }
        }
        setEntries(list as LeaderboardEntry[]);
      } catch (e: any) {
        console.error('Failed to load leaderboard', e);
        setError(e?.message || 'Failed to load leaderboard');
        // Try local fallback on error
        try {
          const raw = typeof window !== 'undefined' ? localStorage.getItem('guestQuizSummaries') : null;
          if (raw) {
            const guest = JSON.parse(raw) as any[];
            const mapped: LeaderboardEntry[] = guest.map(g => ({
              userId: g.userId || 'guest',
              displayName: g.displayName || 'Guest',
              topic: g.topic,
              numericScore: g.numericScore ?? parseInt(String(g.score).split('/')[0] || '0', 10),
              totalQuestions: g.totalQuestions ?? parseInt(String(g.score).split('/')[1] || '0', 10),
              submissionDate: g.submissionDate,
              submissionTime: g.submissionTime,
              tookTimeToSolve: g.tookTimeToSolve,
            }));
            const filtered = topic === 'all' ? mapped : mapped.filter(m => m.topic === topic);
            filtered.sort((a, b) => b.numericScore - a.numericScore);
            setEntries(filtered.slice(0, 50));
          }
        } catch (_) {}
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [topic]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h3">Leaderboard</Typography>
      <Typography variant="body1">Top scores across all users. Filter by topic to compete within a category.</Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField select label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} sx={{ minWidth: 220 }}>
          <MenuItem value="all">All topics</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
          ))}
        </TextField>
        <Box sx={{ flex: 1 }} />
        <Button variant="outlined" onClick={() => router.push('/')}>Home</Button>
        <Button variant="contained" onClick={() => router.push('/newquiz')}>Start Quiz</Button>
      </Box>
      {loading ? (
        <Typography>Loading leaderboard…</Typography>
      ) : entries.length === 0 ? (
        <Typography color="text.secondary">No records yet. Be the first to appear on the leaderboard!</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((e, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{e.displayName || 'Anonymous'}</TableCell>
                  <TableCell>{e.topic}</TableCell>
                  <TableCell>{e.numericScore}/{e.totalQuestions}</TableCell>
                  <TableCell>{e.submissionDate}</TableCell>
                  <TableCell>{e.submissionTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
