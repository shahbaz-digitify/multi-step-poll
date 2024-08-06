import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setSubmissionStatus, resetPoll } from '../redux/qSlice';
import { RootState, AppDispatch } from '../app/store';
import { Loader2, CheckCircle } from 'lucide-react';
import './load.css'

const SubmissionHandler: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const submissionStatus = useSelector((state: RootState) => state.poll.submissionStatus);

  const handleSubmit = () => {
    dispatch(setSubmissionStatus('submitting'));
    setTimeout(() => {
      dispatch(setSubmissionStatus('success'));
    }, 2000);
  };

  const handleOkClick = () => {
    dispatch(resetPoll());
  };

  return (
    <>
     {submissionStatus === 'idle' && <button 
        className="submit-button p-4 bg-purple-600 text-white border-none rounded-md text-lg cursor-pointer transition-colors ease-in-out duration-300 mt-4 hover:bg-purple-800" 
        onClick={handleSubmit}
      >
        Submit
      </button>
      }

      <AnimatePresence>
        {submissionStatus === 'submitting' && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* <Loader2 className="h-16 w-16 animate-spin text-black" /> */}
            <div className="relative inline-block w-[3rem] h-[3rem] ">
      <div className="spinner center">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`spinner-blade delay-${i + 1}`}></div>
        ))}
      </div>
    </div>
          </motion.div>
        )}

        {submissionStatus === 'success' && (
 
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4"
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
      >
        <CheckCircle className="circle text-green-500" />
      </motion.div>
      <motion.h2 
        className="text-h2 font-bold text-gray-800 mb-4 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Submission Successful!
      </motion.h2>
      <motion.p 
        className="text-gray-600 mb-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Your poll responses have been successfully recorded. Thank you for your participation!
      </motion.p>
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          className="close scroll-px-20 bg-purple-600 text-white border-none rounded-md text-lg cursor-pointer transition-colors ease-in-out duration-300 mt-4 hover:bg-purple-800"
          onClick={handleOkClick}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  </motion.div>

        )}
      </AnimatePresence>
    </>
  );
};

export default SubmissionHandler;