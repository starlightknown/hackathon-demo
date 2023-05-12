import React, { useState, useRef, useEffect } from 'react';

interface ChatboxProps {
  chatInput: string;
  onChatInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChatboxSubmit: (message: string) => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ chatInput, onChatInputChange, onChatboxSubmit }) => {
  const [messages, setMessages] = useState<{ content: string; isUser: boolean }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: chatInput, isUser: true },
      ]);
      onChatboxSubmit(chatInput);
      // Clear the input field
      onChatInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);

      const botResponse = generateBotResponse(chatInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: botResponse, isUser: false },
      ]);
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
      case 'connect slack/email':
        response = '&lt;a href="https://devrev.ai/marketplace/devrev-plug-with-email"&gt;Email integration&lt;/a&gt; is a predefined automation that has been used by several organizations. It allows you to manage support conversations that come through email directly from the DevRev PLuG inbox, eliminating the need to manage two inboxes. This integration allows you to manage all end-user communication from one place so you never have to leave the context of the conversation to create a ticket and communicate with your development team. Email integration through SendGrid and other providers with DMARC are also available. <br><br> Connect with &lt;a href="https://devrev.ai/marketplace/slack""&gt;Slack&lt;/a&gt and ensure your customer or internal conversations are always in sync.';
        break;
      case 'set up tickets':
          response = 'You can create tickets in DevRev from Slack messages. To activate this feature in a private channel, you will need to invite the @DevRev bot. Use the ⋮ actions menu to create a ticket from an existing Slack conversation. When you use this action, your ticket will contain a link back to the Slack conversations. <br><br> Install the PLuG widget into your application with just a few lines of code and immediately bring the voice of your customer to your entire team. You can also test the PLuG widget by clicking DevRev Org settings (top left DevRev icon) -> Support -> Try out PLuG. Follow step by step guide and copy and paste code from the link here -> &lt;a href="https://devrev.ai/docs/plug/installation"&gt;Installation&lt;/a&gt';
          break;
      case 'deflection and auto responses':
         response = '&lt;a href="https://devrev.ai/marketplace/article-suggestion""&gt;Deflection&lt;/a&gt - Instead of sending a generic message with a link to one or more articles that may match the customer query, respond with the specific paragraph from that article that is most likely to answer their question. The first step is to upload and publish the knowledge base articles that you would like to be made available to your customers through DevRev. This is done in Settings > Articles. Next, enable this snap-in by clicking the Install button and following the installation steps. <br><br> &lt;a href="https://devrev.ai/marketplace/auto-reply""&gt;Auto response&lt;/a&gt - You can take control of what DevRev bot replies to the customer when your customer sends the first message to your PLuG inbox. You can also set different messages during working hours and non-working hours. Include a call to action to your users within your auto replies with customizable, interactive buttons. Use these to prompt actions such as book a demo, watch video, and read documentation.';
          break;
      case 'how to upload articles?':
          response = 'Login to your org and go to "Settings". Under the support category, you will find "Articles". Click the button and upload articles or add links. You can also copy paste this link to do it - `https://app.devrev.ai/org-slug/settings/articles`. Replace `org-slug` with your org slug.';
            break;
      default:
        response = "I'm sorry, I don't understand.";
        break;
    }

    return response;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const renderMessageContent = (content: string) => {
    const urlRegex = /(&lt;a href="[^"]*"&gt;[^<]*<\/a&gt;)/g;
    const sanitizedContent = content.replace(urlRegex, (match) => {
      const linkRegex = /&lt;a href="([^"]*)"&gt;([^<]*)<\/a&gt;/;
      const [, url, text] = match.match(linkRegex) || [];
      if (url && text) {
        return `<a href="${url}&gt;${text}</a>`;
      }
      return match;
    });
    const decodedContent = new DOMParser().parseFromString(sanitizedContent, 'text/html').documentElement.textContent;
    return { __html: decodedContent } as { __html: string | TrustedHTML };
  };

  return (
    <div className="chatbox">
      <div className="chatbox-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chatbox-message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            <div
              className="message-content"
              dangerouslySetInnerHTML={renderMessageContent(message.content)}
            ></div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="chatbox-input-container">
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
    </div>
  );
};

export default Chatbox;