import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Checklist from './components/Checklist';
import './App.css';

function App() {
  const [quizData, setQuizData] = useState({
    answers: {},
    score: 0,
    profile: null
  });

  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('cleanStoreChecklist');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('cleanStoreChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route 
            path="/quiz" 
            element={<Quiz quizData={quizData} setQuizData={setQuizData} />} 
          />
          <Route 
            path="/results" 
            element={<Results quizData={quizData} />} 
          />
          <Route 
            path="/checklist" 
            element={
              <Checklist 
                checkedItems={checkedItems} 
                setCheckedItems={setCheckedItems} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;