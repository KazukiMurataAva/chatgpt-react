import React from "react";

interface InputChatProps {
  inputText: string;
  handleSendMessage: () => void;
  setInputText: React.Dispatch<React.SetStateAction<string>>; 
}

const InputChat: React.FC<InputChatProps> = ({ inputText, handleSendMessage, setInputText }) => {
  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default InputChat;
