import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import './PollComponent.css';

const questions = [
  {
    title: "How was your day today?",
    options: [
      { icon: "", label: "Good" },
      { icon: "", label: "Very Good" },
      { icon: "", label: "Excellent" },
    ]
  },
  {
    title: "How much work did you do today?",
    options: [
      { icon: "", label: "some" },
      { icon: "", label: "Most" },
      { icon: "", label: "Alot" },
    ]
  },
  {
    title: "How much would you rate your day?",
    options: [
      { icon: "", label: "Good" },
      { icon: "", label: "Very Good" },
      { icon: "", label: "Excellent" },
    ]
  },
  // Add more questions as needed
];

const PollForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (Object.keys(answers).length === questions.length) {
      setShowSummary(true);
    }
  }, [answers]);

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [currentQuestionIndex]: option });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const unansweredIndex = questions.findIndex((_, index) => !answers[index]);
      if (unansweredIndex !== -1) {
        setCurrentQuestionIndex(unansweredIndex);
      } else {
        // console.log(answers);
        setShowSummary(true);
      }
    }
  };

  const handleNavigation = (index) => {
    console.log(answers);
    setCurrentQuestionIndex(index);
    setShowSummary(false);
  };

  const handleSubmit = () => {

    console.log("Submitting answers:", answers);
  };

  return (
    <div className="poll-form flex h-screen relative overflow-hidden">
  {!showSummary && (
    <div className="navigation-dots absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
      {questions.map((q, index) => (
        <button
          key={index}
          className={`nav-dot w-3 h-3 rounded-full border-none cursor-pointer transition-all ease-in-out duration-300 
                      ${currentQuestionIndex === index ? 'bg-white' : 'bg-white/50'} 
                      ${answers[index] ? 'bg-green-500' : ''}`}
          onClick={() => handleNavigation(index)}
        />
      ))}
    </div>
  )}
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
        {questions[currentQuestionIndex].options.map((option, index) => (
          <motion.button
            key={index}
            className={`option flex flex-col items-center p-4 border border-gray-300 rounded-md cursor-pointer transition-all ease-in-out duration-300 w-[calc(33.33%-1rem)] 
                        ${answers[currentQuestionIndex] === option ? 'bg-gray-200' : ''}`}
            onClick={() => handleOptionSelect(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="icon text-4xl mb-2">{option.icon}</span>
            <span className="label text-lg text-center">{option.label}</span>
          </motion.button>
        ))}
      </div>
    ) : (
      
      <div className="summary w-full">
        {Object.entries(answers).map(([index, answer]) => (
          <div key={index} className="summary-item mb-4">
            <p><strong>{questions[index].title}</strong></p>
            <p>{answer.label}</p>
          </div>
        ))}
        <button className="submit-button p-4 bg-purple-600 text-white border-none rounded-md text-lg cursor-pointer transition-colors ease-in-out duration-300 mt-4 hover:bg-purple-800" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    )}
  </motion.div>
</div>

  );
};

export default PollForm;