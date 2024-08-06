import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from 'redux';
import QuestionPanel from './Questions';
import { RootState } from '../app/store'; // Assuming you have this type defined

const mockStore = configureStore([]);

describe('QuestionPanel', () => {
  let store: Store<RootState>;
  let component: RenderResult;

  beforeEach(() => {
    store = mockStore({
      poll: {
        currentQuestionIndex: 0,
        showSummary: false,
        questions: [{ title: "How was your day today?" }],
      },
    } as RootState);

    component = render(
      <Provider store={store}>
        <QuestionPanel />
      </Provider>
    );
  });

  it('renders the current question', () => {
    expect(component.getByText("How was your day today?")).toBeInTheDocument();
  });

  it('renders "Summary" when showSummary is true', () => {
    store = mockStore({
      poll: {
        currentQuestionIndex: 0,
        showSummary: true,
        questions: [{ title: "How was your day today?" }],
      },
    } as RootState);

    component.rerender(
      <Provider store={store}>
        <QuestionPanel />
      </Provider>
    );

    expect(component.getByText("Summary")).toBeInTheDocument();
  });
});