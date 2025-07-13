import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShare2, FiCheckSquare, FiRefreshCw, FiTrendingUp, FiAward } = FiIcons;

function Results({ quizData }) {
  const navigate = useNavigate();
  const { score, profile } = quizData;

  const shareScore = async () => {
    const shareData = {
      title: 'Clean Store Champion',
      text: `I scored ${score}% on the Clean Store Challenge. Can you beat me?`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
        fallbackShare(shareData);
      }
    } else {
      fallbackShare(shareData);
    }
  };

  const fallbackShare = (shareData) => {
    const text = `${shareData.text}\n\n${shareData.url}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Score copied to clipboard!');
    });
  };

  const getNextSteps = () => {
    if (score >= 90) {
      return [
        "Mentor a teammate on your cleaning techniques",
        "Document your best practices for the team",
        "Lead by example during busy periods"
      ];
    } else if (score >= 60) {
      return [
        "Focus on consistent high-touch area cleaning",
        "Create a personal inspection checklist",
        "Ask for feedback from experienced team members"
      ];
    } else {
      return [
        "Start with the daily checklist below",
        "Shadow a top performer during their shift",
        "Focus on one area at a time for improvement"
      ];
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          {/* Badge */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className={`w-20 h-20 mx-auto bg-gradient-to-br ${profile.color} rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg`}
            >
              {profile.badge}
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{profile.type}</h1>
            <p className="text-gray-600">{profile.description}</p>
          </div>

          {/* Score Display */}
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-800 mb-2">{score}%</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className={`h-3 bg-gradient-to-r ${profile.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <SafeIcon icon={FiTrendingUp} className="text-blue-500 text-xl mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Your Assessment</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {score >= 90 && "You're setting the standard for cleanliness! Your attention to detail and proactive approach make you a natural leader."}
                  {score >= 60 && score < 90 && "You have solid fundamentals but there's room to elevate your game. Focus on consistency and you'll be management material."}
                  {score < 60 && "Every expert was once a beginner. Use the tools below to build habits that will boost your confidence and career prospects."}
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <SafeIcon icon={FiAward} className="text-blue-500 mr-2" />
              Suggested Next Steps
            </h3>
            <ul className="space-y-2">
              {getNextSteps().map((step, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={shareScore}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiShare2} className="text-lg" />
              <span>Share My Score</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/checklist')}
              className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiCheckSquare} className="text-lg" />
              <span>View Daily Checklist</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/quiz')}
              className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiRefreshCw} className="text-lg" />
              <span>Retake Quiz</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="font-semibold text-gray-800 mb-4">Pro Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <span className="text-blue-500">📸</span>
              <span>Snap a before/after photo once a week to track your progress</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500">👥</span>
              <span>Ask a teammate to grade your zone today</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500">⏰</span>
              <span>Set phone reminders for high-touch area cleaning</span>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;