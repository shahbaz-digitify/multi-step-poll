import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Option {
  icon: string;
  label: string;
}

export interface Question {
  title: string;
  options: Option[];
}

export interface PollState {
  currentQuestionIndex: number;
  answers: { [key: number]: Option };
  showSummary: boolean;
  questions: Question[];
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
}

const initialState: PollState = {
  currentQuestionIndex: 0,
  answers: {},
  showSummary: false,
  submissionStatus: 'idle',
  questions: [
    {
      title: "How was your day today?",
      options: [
        { icon: "https://em-content.zobj.net/source/apple/391/thumbs-up_1f44d.png", label: "Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/ok-hand_1f44c.png", label: "Very Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/star-struck_1f929.png", label: "Excellent" },
      ]
    },
    {
      title: "How was your work today?",
      options: [
        { icon: "https://em-content.zobj.net/source/apple/391/thumbs-up_1f44d.png", label: "Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/ok-hand_1f44c.png", label: "Very Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/star-struck_1f929.png", label: "Excellent" },
      ]
    },
    {
      title: "How was your food today?",
      options: [
        { icon: "https://em-content.zobj.net/source/apple/391/thumbs-up_1f44d.png", label: "Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/ok-hand_1f44c.png", label: "Very Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/star-struck_1f929.png", label: "Excellent" },
      ]
    },
    {
      title: "How was your sleep today?",
      options: [
        { icon: "https://em-content.zobj.net/source/apple/391/thumbs-up_1f44d.png", label: "Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/ok-hand_1f44c.png", label: "Very Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/star-struck_1f929.png", label: "Excellent" },
      ]
    },
    {
      title: "How do you rate your day?",
      options: [
        { icon: "https://em-content.zobj.net/source/apple/391/thumbs-up_1f44d.png", label: "Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/ok-hand_1f44c.png", label: "Very Good" },
        { icon: "https://em-content.zobj.net/source/apple/391/star-struck_1f929.png", label: "Excellent" },
      ]
    },
    // Add more questions here...
  ],
};

export const pollSlice = createSlice({
  name: 'poll',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionIndex: number; answer: Option }>) => {
      const { questionIndex, answer } = action.payload;
      state.answers[questionIndex] = answer;
      if (questionIndex < state.questions.length - 1) {
        state.currentQuestionIndex = questionIndex + 1;
      } else {
        const unansweredIndex = state.questions.findIndex((_, index) => !state.answers[index]);
        if (unansweredIndex !== -1) {
          state.currentQuestionIndex = unansweredIndex;
        } else {
          state.showSummary = true;
        }
      }
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
      state.showSummary = false;
    },
    resetPoll: (state) => {
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.showSummary = false;
      state.submissionStatus = 'idle';
    },
    setSubmissionStatus: (state, action: PayloadAction<'idle' | 'submitting' | 'success' | 'error'>) => {
      state.submissionStatus = action.payload;
    },
  },
});

export const { setAnswer, setCurrentQuestionIndex, resetPoll, setSubmissionStatus } = pollSlice.actions;

export const pollReducer = pollSlice.reducer;