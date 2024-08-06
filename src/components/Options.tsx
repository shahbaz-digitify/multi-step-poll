import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setAnswer } from '../redux/qSlice';
import { RootState, AppDispatch } from '../app/store';
import SubmissionHandler from './Submit';
import { Option } from '../redux/qSlice';

const OptionsPanel: React.FC = () => {
  const { currentQuestionIndex, showSummary, questions, answers, submissionStatus } = useSelector((state: RootState) => state.poll);
  const dispatch: AppDispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleOptionSelect = (option: Option) => {
    dispatch(setAnswer({ questionIndex: currentQuestionIndex, answer: option }));
  };

  return (
    <motion.div
      className="options-panel w-1/2 bg-white flex items-center justify-center p-8 overflow-hidden"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween", duration: 0.5 }}
      key={`options-${currentQuestionIndex}`}
    >
      {!showSummary ? (
        <div className="options-container flex flex-wrap justify-center gap-4 w-full">
          {questions[currentQuestionIndex].options.map((option: Option, index: number) => (
            <motion.button
              key={index}
              className={`option flex flex-col items-center p-4 rounded-md cursor-pointer transition-all ease-in-out duration-300 w-[calc(33.33%-1rem)] relative
                          ${answers[currentQuestionIndex] === option ? 'bg-gray-200' : ''}`}
              onClick={() => handleOptionSelect(option)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="icon text-4xl z-10 relative"> <img src={option.icon} alt={option.label} width="100" /> </span>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="label text-lg text-center absolute inset-0 flex items-center justify-center bg-white bg-opacity-90"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: -35, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {option.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      ) : (
        submissionStatus === 'idle' ? (<div className="summary w-full">
          {Object.entries(answers).map(([index, answer]: [string, Option]) => (
            <div key={index} className="summary-item mb-4">
              <p><strong>{questions[Number(index)].title}</strong></p>
              <p>{answer.label}</p>
            </div>
          ))}
          <SubmissionHandler />
        </div>) : (<SubmissionHandler />)
      )}
    </motion.div>
  );
};

export default OptionsPanel;