import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../app/store';

const QuestionPanel: React.FC = () => {
  const { currentQuestionIndex, showSummary, questions } = useSelector((state: RootState) => state.poll);

  return (
    <motion.div
      className="question-panel w-1/2 bg-purple-600 text-white flex items-center justify-center p-8 relative overflow-hidden"
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", duration: 0.5 }}
      key={currentQuestionIndex}
    >
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentQuestionIndex}
          className="question text-4xl text-center"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.5 }}
        >
          {showSummary ? "Summary" : questions[currentQuestionIndex].title}
        </motion.h2>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionPanel;