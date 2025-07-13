import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiArrowRight, FiCheckCircle } = FiIcons;

const questions = [
  {
    id: 1,
    question: "What's the first area you check when you arrive?",
    type: "multiple",
    options: [
      { value: "restrooms", label: "Restrooms", points: 25 },
      { value: "entryway", label: "Entryway", points: 20 },
      { value: "food_prep", label: "Food prep area", points: 30 },
      { value: "shelves", label: "Shelves and coolers", points: 15 }
    ]
  },
  {
    id: 2,
    question: "How often do you clean high-touch areas like handles and pin pads?",
    type: "multiple",
    options: [
      { value: "every_rush", label: "After every rush", points: 30 },
      { value: "once_shift", label: "Once a shift", points: 25 },
      { value: "end_day", label: "End of day", points: 15 },
      { value: "rarely", label: "Rarely", points: 5 }
    ]
  },
  {
    id: 3,
    question: "If a customer walked in right now, how would your floors look?",
    type: "multiple",
    options: [
      { value: "just_mopped", label: "Just mopped", points: 30 },
      { value: "pretty_clean", label: "Pretty clean", points: 25 },
      { value: "some_dirt", label: "Some dust/dirt", points: 15 },
      { value: "needs_work", label: "Needs serious work", points: 5 }
    ]
  },
  {
    id: 4,
    question: "How confident are you that your restroom would pass a surprise inspection?",
    type: "slider",
    min: 0,
    max: 10,
    points: (value) => value * 3
  },
  {
    id: 5,
    question: "Which of these do you check least often?",
    type: "multiple",
    options: [
      { value: "behind_counter", label: "Behind the counter", points: 10 },
      { value: "trash_cans", label: "Trash cans", points: 5 },
      { value: "cooler_doors", label: "Cooler doors", points: 15 },
      { value: "coffee_station", label: "Coffee station", points: 8 }
    ]
  }
];

function Quiz({ quizData, setQuizData }) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(quizData.answers || {});
  const [sliderValue, setSliderValue] = useState(5);

  const handleAnswer = (questionId, answer, points) => {
    const newAnswers = { ...answers, [questionId]: { answer, points } };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      if (questions[currentQuestion + 1].type === 'slider') {
        setSliderValue(answers[questions[currentQuestion + 1].id]?.answer || 5);
      }
    } else {
      // Calculate final score and profile
      const totalPoints = Object.values(answers).reduce((sum, answer) => sum + answer.points, 0);
      const maxPoints = 120; // Maximum possible points
      const score = Math.round((totalPoints / maxPoints) * 100);
      
      let profile;
      if (score >= 90) {
        profile = { 
          type: "Inspection Ace", 
          description: "Lead by example.",
          badge: "🏆",
          color: "from-green-500 to-green-600"
        };
      } else if (score >= 60) {
        profile = { 
          type: "Trust Builder", 
          description: "Almost manager-ready.",
          badge: "⭐",
          color: "from-blue-500 to-blue-600"
        };
      } else {
        profile = { 
          type: "Sanitation Rookie", 
          description: "Time to brush up.",
          badge: "🌱",
          color: "from-orange-500 to-orange-600"
        };
      }

      setQuizData({ answers, score, profile });
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      if (questions[currentQuestion - 1].type === 'slider') {
        setSliderValue(answers[questions[currentQuestion - 1].id]?.answer || 5);
      }
    }
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button 
            onClick={() => currentQuestion === 0 ? navigate('/') : handlePrevious()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="text-xl text-gray-600" />
          </button>
          <div className="text-center">
            <div className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</div>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
              <motion.div 
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {currentQ.question}
              </h2>

              {currentQ.type === 'multiple' && (
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(currentQ.id, option.value, option.points)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        answers[currentQ.id]?.answer === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {answers[currentQ.id]?.answer === option.value && (
                          <SafeIcon icon={FiCheckCircle} className="text-blue-500" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {currentQ.type === 'slider' && (
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{sliderValue}</div>
                    <div className="text-sm text-gray-500">out of 10</div>
                  </div>
                  <input
                    type="range"
                    min={currentQ.min}
                    max={currentQ.max}
                    value={sliderValue}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setSliderValue(value);
                      handleAnswer(currentQ.id, value, currentQ.points(value));
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Not confident</span>
                    <span>Very confident</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!isAnswered}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
              isAnswered
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}</span>
            <SafeIcon icon={FiArrowRight} className="text-lg" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;