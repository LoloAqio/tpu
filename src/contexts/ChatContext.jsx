import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isChatVisible, setIsChatVisible] = useState(true);

  const hideChatbot = () => setIsChatVisible(false);
  const showChatbot = () => setIsChatVisible(true);

  return (
    <ChatContext.Provider value={{ isChatVisible, hideChatbot, showChatbot }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat должен использоваться внутри ChatProvider');
  }
  return context;
};