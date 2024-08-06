import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Options from './Options';
import { setAnswer } from '../redux/qSlice';

// Define the correct types
interface Option {
  key: number;
  icon: string;
  label: string;
}

interface PollState {
  currentQuestionIndex: number;
  showSummary: boolean;
  questions: Array<{
    title: string;
    options: Option[];
  }>;
  answers: Record<number, Option>;
}

const mockStore = configureStore([]);

describe('Options Component', () => {
  let store: any;
  const initialState: { poll: PollState } = {
    poll: {
      currentQuestionIndex: 0,
      showSummary: false,
      questions: [
        {
          title: "Test Question",
          options: [
            { key: 1, icon: "icon1", label: "Option 1" },
            { key: 2, icon: "icon2", label: "Option 2" },
          ],
        },
      ],
      answers: {},
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders options and handles click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Options />
      </Provider>
    );

    const option1 = getByText('Option 1');
    fireEvent.click(option1);

    expect(store.dispatch).toHaveBeenCalledWith(setAnswer({
      questionIndex: 0,
      answer: { icon: "icon1", label: "Option 1" },
    }));
  });
});