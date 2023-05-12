import React, { useState } from 'react';
import './App.css';
import Chatbox from './Chatbox';
import logo from './logo.png'; // Update the path if necessary
import { FaEnvelope, FaSlack, FaRobot, FaHandshake, FaTicketAlt } from 'react-icons/fa';

const App: React.FC = () => {
  const [chatInput, setChatInput] = useState('');

  const handleChatInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleChatboxSubmit = (message: string) => {
    setChatInput(message);
  };

  const handleConversations = () => {
    handleChatboxSubmit('Connect Slack/Email');
  };

  const handleTickets = () => {
    handleChatboxSubmit('Set up tickets');
  };

  const handleDeflection = () => {
    handleChatboxSubmit('Deflection and Auto responses');
  };

  const handleService = () => {
    handleChatboxSubmit('How to upload articles?');
  };

  return (
    <div className="page">
      <div className="container">
        <div className="box">
        <div className="card">
  <div className="card-logo">
  <FaSlack size={30} /> <FaEnvelope size={30}/>
  </div>
  <h1 className="title">Customer Conversations</h1>
  <p className="subtitle">
    Bring all your customer conversations at one place. Connect email or Slack. Click on Connect Conversations to know more.
  </p>
  <button className="btn" onClick={handleConversations}>
    Connect Conversations
  </button>
</div>
<div className="card">
  <div className="card-logo">
  <FaTicketAlt size={30}/>
  </div>
  <h1 className="title">Convos to Tickets</h1>
  <p className="subtitle">
    Sometimes conversations are not everything, trace your conversations and turn them into tickets by using Slack and PLuG widget.
  </p>
  <button className="btn" onClick={handleTickets}>
    Set up tickets
  </button>
</div>
<div className="card">
  <div className="card-logo">
    <FaRobot size={30}/>
  </div>
  <h1 className="title">Auto Responses and AI for Deflection</h1>
  <p className="subtitle">
    Answer common questions by GPT-powered customer responses. Set up auto response based on your team availability.
  </p>
  <button className="btn" onClick={handleDeflection}>
    Configure Responses and Deflection
  </button>
</div>
<div className="card">
  <div className="card-logo">
    <FaHandshake size={30}/>
  </div>
  <h1 className="title">Self Service</h1>
  <p className="subtitle">
    Got articles on your product which can give answers? Upload them and allow users to search through documentation via PLuG.
  </p>
  <button className="btn" onClick={handleService}>
    Upload Articles
  </button>
</div>

          {/* Add more cards as needed */}
        </div>
        <div className="chatbox-container">
        <div className="logo-container">
  <img src={logo} alt="Logo" className="logo-image" />
</div>
          <Chatbox
            chatInput={chatInput}
            onChatboxSubmit={handleChatboxSubmit}
            onChatInputChange={handleChatInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
