import React, { useState } from 'react';

interface ChatboxProps {
  chatInput: string;
  onChatInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChatboxSubmit: (message: string) => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ chatInput, onChatInputChange, onChatboxSubmit }) => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, chatInput]);
      onChatboxSubmit(chatInput);
      // Clear the input field
      onChatInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);

      const botResponse = generateBotResponse(chatInput);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }
  };

  const generateBotResponse = (userInput: string): string => {
    let response = '';

    switch (userInput.toLowerCase()) {
      case 'hi':
      case 'hello':
        response = 'Hi there!';
        break;
      case 'how are you?':
        response = 'I am good, thank you!';
        break;
      case 'what is your name?':
        response = 'My name is Chatbot.';
        break;
      default:
        response = "I'm sorry, I don't understand.";
        break;
    }

    return response;
  };

  return (
    <div className="chatbox">
      <div className="chatbox-messages">
        {messages.map((message, index) => (
          <div key={index} className="chatbox-message">
            {message}
          </div>
        ))}
      </div>
      <form className="chatbox-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message"
          value={chatInput}
          onChange={onChatInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbox;
