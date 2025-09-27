import React, { useState, useEffect } from "react";
import "./captcha.css";

const Captcha = ({ onVerified }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [error, setError] = useState("");

  // Generate a random math question
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setQuestion(`What is ${num1} + ${num2}?`);
    setCorrectAnswer(num1 + num2);
    setAnswer("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === correctAnswer) {
      onVerified(); // Success → go to main app
    } else {
      setError("Incorrect, try again!");
      generateCaptcha(); // regenerate new captcha
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="captcha-overlay">
      <div className="captcha-container">
        <h2>Verify You're Human</h2>
        <p className="captcha-question">{question}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter answer"
          />
          <button type="submit">Verify</button>
        </form>
        <button className="refresh-btn" onClick={generateCaptcha}>
          ↻ New Question
        </button>
        {error && <div className="captcha-error">{error}</div>}
      </div>
    </div>
  );
};

export default Captcha;
