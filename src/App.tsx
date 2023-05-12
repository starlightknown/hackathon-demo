import React, { useState } from 'react';
import './App.css';
import Chatbox from './Chatbox';
import logo from './logo.png';
import { FaEnvelope, FaSlack, FaRobot, FaHandshake, FaTicketAlt, FaCheck } from 'react-icons/fa';

const App: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [clickedLinks, setClickedLinks] = useState<number[]>([]);

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

  const handleLinkClick = (cardIndex: number, linkIndex: number) => {
    setClickedLinks((prevClickedLinks) => {
      const updatedLinks = [...prevClickedLinks];
      updatedLinks[cardIndex] = linkIndex;
      return updatedLinks;
    });
  };

  const isCardFullyClicked = (cardIndex: number) => {
    const card = data[cardIndex];
    const cardLinks = card.links;
    const clickedLinksForCard = clickedLinks
      .map((linkIndex, index) => (index === cardIndex ? linkIndex : undefined))
      .filter((linkIndex) => linkIndex !== undefined) as number[];

    const uniqueClickedLinks = clickedLinksForCard.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    return uniqueClickedLinks.length === cardLinks.length;
  };

  const data = [
    {
      title: 'Customer Conversations',
      subtitle: 'Bring all your customer conversations at one place. Connect email or Slack. Click on Connect Conversations to know more.',
      links: [
        {
          index: 0,
          label: <FaSlack size={30} />,
          url: 'https://devrev.ai/marketplace/slack',
        },
        {
          index: 1,
          label: <FaEnvelope size={30} />,
          url: 'https://devrev.ai/marketplace/devrev-plug-with-email',
        },
      ],
      buttonText: 'Connect Conversations',
      onClick: handleConversations,
    },
    {
      title: 'Convos to Tickets',
      subtitle: 'Sometimes conversations are not everything, trace your conversations and turn them into tickets by using Slack and PLuG widget.',
      links: [
        {
          index: 0,
          label: <FaTicketAlt size={30} />,
          url: 'https://devrev.ai/docs/product/plug',
        },
      ],
      buttonText: 'Set up tickets',
      onClick: handleTickets,
    },
    {
      title: 'Auto Responses and AI for Deflection',
      subtitle: 'Answer common questions by GPT-powered customer responses. Set up auto response based on your team availability.',
      links: [
        {
          index: 0,
          label: <FaRobot size={30} />,
          url: 'https://devrev.ai/marketplace/article-suggestion',
        },
        {
          index: 1,
          label: <FaHandshake size={30} />,
          url: 'https://devrev.ai/marketplace/auto-reply',
        },
      ],
      buttonText: 'Configure Responses and Deflection',
      onClick: handleDeflection,
    },
    {
      title: 'Self Service',
      subtitle: 'Got articles on your product which can give answers? Upload them and allow users to search through documentation via PLuG.',
      links: [{
        index: 0,
        label: <FaRobot size={30} />,
        url: 'https://devrev.ai/marketplace/article-suggestion',
      }],
      buttonText: 'Upload Articles',
      onClick: handleService,
    },
  ];

  return (
    <div className="page">
      <div className="container">
        <div className="box">
          {data.map((card, cardIndex) => (
            <div className="card" key={cardIndex}>
              <div className="card-logo">
                {card.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    onClick={() => handleLinkClick(cardIndex, linkIndex)}
                    className={clickedLinks[cardIndex] === linkIndex ? 'clicked' : ''}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <h1 className="title">{card.title}</h1>
              <p className="subtitle">{card.subtitle}</p>
              <button className="btn" onClick={card.onClick}>
                {card.buttonText}
              </button>
              {isCardFullyClicked(cardIndex) && <FaCheck className="tick" />}
            </div>
          ))}
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
