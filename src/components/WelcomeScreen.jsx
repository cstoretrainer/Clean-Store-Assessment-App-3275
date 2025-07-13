import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiCheckCircle, FiTrendingUp } = FiIcons;

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        {/* Hero Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <SafeIcon icon={FiStar} className="text-4xl text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Could You Pass a Surprise Inspection?
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-gray-600 mb-8 leading-relaxed"
        >
          Take the 5-question challenge. Become a Clean Store Champion.
        </motion.p>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 gap-4 mb-8"
        >
          <div className="flex items-center text-left bg-white p-4 rounded-lg shadow-sm">
            <SafeIcon icon={FiCheckCircle} className="text-2xl text-green-500 mr-3 flex-shrink-0" />
            <span className="text-gray-700">Quick 5-question assessment</span>
          </div>
          <div className="flex items-center text-left bg-white p-4 rounded-lg shadow-sm">
            <SafeIcon icon={FiTrendingUp} className="text-2xl text-blue-500 mr-3 flex-shrink-0" />
            <span className="text-gray-700">Personalized improvement plan</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/quiz')}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <SafeIcon icon={FiStar} className="text-xl" />
          <span className="text-lg">Start Quiz</span>
        </motion.button>

        {/* Secondary CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => navigate('/checklist')}
          className="w-full mt-4 text-blue-600 font-medium py-3 px-6 rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-all duration-200"
        >
          View Daily Checklist
        </motion.button>
      </motion.div>
    </div>
  );
}

export default WelcomeScreen;