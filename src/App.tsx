import React, { useState } from 'react';
import './App.css';
import Chatbox from './Chatbox';

const App: React.FC = () => {
  const [chatInput, setChatInput] = useState('');

  const handleChatInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleChatboxSubmit = (message: string) => {
    setChatInput(message);
  };

  const handleGetStarted = () => {
    handleChatboxSubmit('Hi');
  };

  return (
    <div className="page">
      <div className="container">
        <div className="box">
          <div className="card">
            <h1 className="title">Designed For Work</h1>
            <p className="subtitle">
              Introducing the first ever 5G enabled tablet. You've got a tablet that lets you
              play harder and work smarter.
            </p>
            <button className="btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
          <div className="card">{/* Add additional cards here */}</div>
          <div className="card">{/* Add additional cards here */}</div>
          {/* Add more cards as needed */}
        </div>
        <div className="chatbox-container">
          <Chatbox
            chatInput={chatInput}
            onChatboxSubmit={handleChatboxSubmit}
            onChatInputChange={handleChatInputChange}
          />
        </div>
        <div className="blob"></div>
      </div>
    </div>
  );
};

export default App;
