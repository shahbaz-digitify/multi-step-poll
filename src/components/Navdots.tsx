import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuestionIndex } from '../redux/qSlice';
import { RootState, AppDispatch } from '../app/store';

const NavigationDots: React.FC = () => {
  const { currentQuestionIndex, showSummary, questions, answers } = useSelector((state: RootState) => state.poll);
  const dispatch: AppDispatch = useDispatch();

  const handleNavigation = (index: number) => {
    dispatch(setCurrentQuestionIndex(index));
  };

  if (showSummary) return null;

  return (
    <div className="navigation-dots absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
      {questions.map((_, index) => (
        <button
          key={index}
          className={`nav-dot w-3 h-3 rounded-full border-none cursor-pointer transition-all ease-in-out duration-300 
                      ${currentQuestionIndex === index ? 'bg-white' : 'bg-white/50'} 
                      ${answers[index] ? 'bg-green-500' : ''}`}
          onClick={() => handleNavigation(index)}
        />
      ))}
    </div>
  );
};

export default NavigationDots;