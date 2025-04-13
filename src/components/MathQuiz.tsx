"use client";

import React, { useState, useEffect } from "react";

// Define the structure for a math question
interface MathQuestion {
  operand1: number;
  operand2: number;
  operator: "+"; // For now, only addition
  correctAnswer: number;
}

// Function to generate a random math question
const generateQuestion = (): MathQuestion => {
  const operand1 = Math.floor(Math.random() * 10) + 1; // Numbers between 1 and 10
  const operand2 = Math.floor(Math.random() * 10) + 1;
  const operator = "+"; // Only addition for now
  const correctAnswer = operand1 + operand2;
  return { operand1, operand2, operator, correctAnswer };
};

const MathQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(
    null
  );
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [questionNumber, setQuestionNumber] = useState<number>(0); // Track number of questions answered
  const totalQuestions = 5; // Let's have 5 questions per quiz

  // Generate the first question when the component mounts
  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    setScore(0);
    setQuestionNumber(0);
    setFeedback("");
    setUserAnswer("");
    setCurrentQuestion(generateQuestion());
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
    setFeedback(""); // Clear feedback when user types
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentQuestion) return; // Should not happen if quiz started

    const answer = parseInt(userAnswer, 10);
    if (isNaN(answer)) {
      setFeedback("Please enter a valid number.");
      return;
    }

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(
        `Incorrect. The answer was ${currentQuestion.correctAnswer}.`
      );
    }

    // Move to the next question or end the quiz
    const nextQuestionNum = questionNumber + 1;
    setQuestionNumber(nextQuestionNum);
    setUserAnswer(""); // Clear input field

    if (nextQuestionNum < totalQuestions) {
      // Wait a moment before showing the next question to let user see feedback
      setTimeout(() => {
        setCurrentQuestion(generateQuestion());
        setFeedback(""); // Clear feedback for the new question
      }, 1500); // 1.5 second delay
    } else {
      // Quiz finished
      setFeedback(
        `Quiz finished! Your score: ${
          score + (answer === currentQuestion.correctAnswer ? 1 : 0)
        }/${totalQuestions}`
      );
      setCurrentQuestion(null); // Indicate quiz is over
    }
  };

  return (
    <div>
      <h3>Basic Addition Quiz</h3>
      {currentQuestion ? (
        <form onSubmit={handleSubmit}>
          <p>
            Question {questionNumber + 1} / {totalQuestions}
          </p>
          <p style={{ fontSize: "1.5em", margin: "1rem 0" }}>
            {currentQuestion.operand1} {currentQuestion.operator}{" "}
            {currentQuestion.operand2} = ?
          </p>
          <input
            type="number"
            value={userAnswer}
            onChange={handleAnswerChange}
            required
            autoFocus // Focus the input field automatically
          />
          <button type="submit" style={{ marginLeft: "0.5rem" }}>
            Submit
          </button>
        </form>
      ) : (
        <p>Loading quiz...</p> // Initial state or after finishing
      )}
      {feedback && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{feedback}</p>
      )}
      {/* Show score only after quiz is finished */}
      {!currentQuestion && questionNumber >= totalQuestions && (
        <div>
          <p>
            Final Score: {score}/{totalQuestions}
          </p>
          <button onClick={startNewQuiz} style={{ marginTop: "1rem" }}>
            Start New Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default MathQuiz;
