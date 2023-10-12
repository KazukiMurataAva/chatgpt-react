import React from "react";

interface ChatMessage {
  id: number;
  message: string;
}

interface ChatHistoryProps {
  chatHistory: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
  return (
    <div className="chat-history">
      {chatHistory.map((message) => (
        <div key={message.id} className="message">
          {message.message}
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
