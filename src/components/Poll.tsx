import React from 'react';
import { useSelector } from 'react-redux';
import NavigationDots from './Navdots';
import QuestionPanel from './Questions';
import OptionsPanel from './Options';
import { RootState } from '../app/store';

const PollForm: React.FC = () => {
  const { showSummary } = useSelector((state: RootState) => state.poll);

  return (
    <div className="poll-form flex h-screen relative overflow-hidden">
      {!showSummary && <NavigationDots />}
      <QuestionPanel />
      <OptionsPanel />
    </div>
  );
};

export default PollForm;