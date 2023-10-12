import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatApp.css';
import InputChat from './Form';
import ChatHistory from './ChatHistory';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from "./firebase";
import { User, signInWithRedirect, getRedirectResult } from 'firebase/auth';

interface UserInfoProps {
  user: User | null;
}

const domain = "https://api-by-node.azurewebsites.net";

function UserInfo({ user }: UserInfoProps) {
  return <>{user && <img src={user.photoURL as string} alt="User" />}</>;
}

function SignInButton() {
  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <button onClick={signInWithGoogle}>
      <p>Googleでログイン</p>
    </button>
  );
}

function SignOutButton() {
  return (
    <button onClick={() => auth.signOut()}>
      <p>サインアウト</p>
    </button>
  );
}


const ChatComponent = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState<{ id: number; message: string }[]>([]);

  const handleSendMessage = async () => {
    try {
      const userMessage = { id: chatHistory.length + 1, message: `You: ${inputText}` };
      setChatHistory((prevHistory) => [...prevHistory, userMessage]);

      const response = await axios.post( domain + '/api/chat', { inputText });
      const gptMessage = { id: response.data.lastMessageId, message: `GPT: ${response.data.response}` };
      setChatHistory((prevHistory) => [...prevHistory, gptMessage]);

      setInputText('');
    } catch (error) {
      const errorMessage = { id: chatHistory.length + 1, message: `GPT: 通信に失敗しました。` };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    }
  };

  return (
    <div>
      <div className="chat-container">
        <ChatHistory chatHistory={chatHistory} />
      </div>
      <div className="input-container">
        <footer>
          <InputChat inputText={inputText} handleSendMessage={handleSendMessage} setInputText={setInputText} />
        </footer>
      </div>
    </div>
  );
};



const App = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        await getRedirectResult(auth);
      } catch (error) {
        console.error('ログイン処理のリダイレクト結果を取得できませんでした。', error);
      }
    };

    if (!loading) {
      handleRedirectResult();
    }
  }, [loading]);

  return (
    <div>
      {loading ? (
        <div className='loading'>
          <p>Loading...</p>
        </div>
      ) : user ? (
        <div>
          <header className="app-header">
            <h3 id='title'>GPT-3.5</h3>
            <div className='user-info'>
              <UserInfo user={user} />
              <SignOutButton />
            </div>
          </header>
          <main>
            <ChatComponent />
          </main>
        </div>
      ) : (
        <div className='signin-button'>
          <SignInButton />
        </div>
      )}
    </div>
  );
};



export default App;
