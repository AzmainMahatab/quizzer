import {configureStore} from '@reduxjs/toolkit';

export interface QuizParams {
    amount: number;
    category: number;
    difficulty: string;
    type: string;
}

export interface QuizSummary {
    userId?: string; // guest mode has no userId
    displayName?: string; // for leaderboard display
    submissionDate: string;
    submissionTime: string;
    topic: string;
    score: string; // e.g., "7/10"
    numericScore?: number; // for leaderboard sorting
    totalQuestions?: number; // for leaderboard display
    tookTimeToSolve: string; // human-readable duration
}

export interface RootState {
    quizParams: QuizParams | null;
    quizSummary: QuizSummary | null;
}

const initialState: RootState = {
    quizParams: null,
    quizSummary: null,
};

// Simple reducer maintaining original action shapes
const quizReducer = (state: RootState = initialState, action: any): RootState => {
    switch (action.type) {
        case 'SET_QUIZ_PARAMS':
            return {...state, quizParams: action.payload};
        case 'SET_QUIZ_SUMMARY':
            return {...state, quizSummary: action.payload};
        case 'CLEAR_QUIZ_SUMMARY':
            return {...state, quizSummary: null};
        default:
            return state;
    }
};

const store = configureStore({
    reducer: quizReducer,
});

export type AppDispatch = typeof store.dispatch;
export default store;
