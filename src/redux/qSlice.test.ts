import { pollReducer, setAnswer, setCurrentQuestionIndex, resetPoll, setSubmissionStatus } from './qSlice';

interface Option {
  icon: string;
  label: string;
}

interface Question {
  title: string;
  options: Option[];
}

interface PollState {
  currentQuestionIndex: number;
  answers: { [key: number]: Option };
  showSummary: boolean;
  questions: Question[];
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
}

describe('poll reducer', () => {
  const initialState: PollState = {
    currentQuestionIndex: 0,
    answers: {},
    showSummary: false,
    submissionStatus: 'idle',
    questions: [
      {
        title: "How was your day today?",
        options: [
          { icon: "", label: "Good" },
          { icon: "", label: "Very Good" },
          { icon: "", label: "Excellent" },
        ]
      },
      // ... (other questions)
    ],
  };

  it('should handle initial state', () => {
    expect(pollReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setAnswer', () => {
    const actual = pollReducer(initialState, setAnswer({ questionIndex: 0, answer: { label: "Good", icon: "" } }));
    expect(actual.answers[0]).toEqual({ label: "Good", icon: "" });
    expect(actual.currentQuestionIndex).toEqual(1);
  });

  it('should handle setCurrentQuestionIndex', () => {
    const actual = pollReducer(initialState, setCurrentQuestionIndex(2));
    expect(actual.currentQuestionIndex).toEqual(2);
    expect(actual.showSummary).toEqual(false);
  });

  it('should handle resetPoll', () => {
    const stateBeforeReset: PollState = {
      ...initialState,
      currentQuestionIndex: 2,
      answers: { 0: { label: "Good", icon: "" }, 1: { label: "Most", icon: "" } },
      showSummary: true,
      submissionStatus: 'success',
    };
    const actual = pollReducer(stateBeforeReset, resetPoll());
    expect(actual).toEqual(initialState);
  });

  it('should handle setSubmissionStatus', () => {
    const actual = pollReducer(initialState, setSubmissionStatus('submitting'));
    expect(actual.submissionStatus).toEqual('submitting');
  });

  it('should set showSummary to true when all questions are answered', () => {
    const stateWithAllAnswers: PollState = {
      ...initialState,
      answers: {
        0: { label: "Good", icon: "" },
        1: { label: "Very Good", icon: "" },
        // Add answers for all questions in your initialState
      },
      currentQuestionIndex: initialState.questions.length - 1,
    };
    const actual = pollReducer(stateWithAllAnswers, setAnswer({ 
      questionIndex: initialState.questions.length - 1, 
      answer: { label: "Excellent", icon: "" } 
    }));
    expect(actual.showSummary).toEqual(true);
  });

  it('should handle setSubmissionStatus through all states', () => {
    let state = pollReducer(initialState, setSubmissionStatus('submitting'));
    expect(state.submissionStatus).toEqual('submitting');

    state = pollReducer(state, setSubmissionStatus('success'));
    expect(state.submissionStatus).toEqual('success');

    state = pollReducer(state, setSubmissionStatus('error'));
    expect(state.submissionStatus).toEqual('error');

    state = pollReducer(state, setSubmissionStatus('idle'));
    expect(state.submissionStatus).toEqual('idle');
  });
});