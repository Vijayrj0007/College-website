import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

const botResponses = {
  greeting: [
    "Hello! I'm here to help you navigate the college portal. What would you like to know?",
    "Hi there! How can I assist you with the college portal today?",
    "Welcome! I'm your college portal assistant. What can I help you find?"
  ],
  admission: [
    "For admission queries, please visit the Admissions section on our portal or contact the admission office at +91-6546-123456.",
    "Admission applications are currently open! Visit the 'Apply Online' link in our Admissions section.",
    "You can check your admission status in the Quick Links section. For more details, contact our admission counselors."
  ],
  results: [
    "To check your exam results, head to your Dashboard after logging in, or use the 'Exam Results' quick link.",
    "Results are usually published within 15 days of examination completion. Check the Results portal for updates.",
    "For result-related queries, please contact the examination cell or check the latest notices section."
  ],
  fees: [
    "Fee payment can be made through the 'Fee Payment' portal in Quick Links. We accept online payments via various methods.",
    "For fee structure details, visit the Academics section or download the fee structure document from our website.",
    "If you're having trouble with fee payment, please contact the accounts department at accounts@ucet.edu."
  ],
  library: [
    "Access our digital library resources through the 'Library e-Resources' quick link. You'll need your student credentials to log in.",
    "Library hours are 8 AM to 8 PM on weekdays and 9 AM to 5 PM on weekends. Extended hours during exam periods.",
    "For library card issues or book renewals, visit the library help desk or contact library@ucet.edu."
  ],
  faculty: [
    "Faculty information and contact details can be found in the Departments section of our website.",
    "To contact faculty members, you can use the internal messaging system after logging into your dashboard.",
    "Faculty office hours are usually posted on their individual profiles in the faculty directory."
  ],
  default: [
    "I'm here to help! You can ask me about admissions, results, fees, library resources, or general college information.",
    "For specific queries, I recommend contacting the relevant department directly. You can find contact information in the Contact section.",
    "If you need immediate assistance, please call our helpline at +91-6546-123456 or email info@ucet.edu."
  ]
};

export const ChatBot: React.FC = () => {
  const { isChatOpen, toggleChat, chatMessages, addChatMessage } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    } else if (lowerMessage.includes('admission') || lowerMessage.includes('apply')) {
      return botResponses.admission[Math.floor(Math.random() * botResponses.admission.length)];
    } else if (lowerMessage.includes('result') || lowerMessage.includes('exam') || lowerMessage.includes('grade')) {
      return botResponses.results[Math.floor(Math.random() * botResponses.results.length)];
    } else if (lowerMessage.includes('fee') || lowerMessage.includes('payment') || lowerMessage.includes('tuition')) {
      return botResponses.fees[Math.floor(Math.random() * botResponses.fees.length)];
    } else if (lowerMessage.includes('library') || lowerMessage.includes('book') || lowerMessage.includes('resource')) {
      return botResponses.library[Math.floor(Math.random() * botResponses.library.length)];
    } else if (lowerMessage.includes('faculty') || lowerMessage.includes('teacher') || lowerMessage.includes('professor')) {
      return botResponses.faculty[Math.floor(Math.random() * botResponses.faculty.length)];
    } else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    addChatMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      addChatMessage(botMessage);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 shadow-lg transition-all ${
          isChatOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-label={isChatOpen ? 'Close chat' : 'Open chat assistant'}
      >
        {isChatOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Chat Window */}
      {isChatOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-96 h-[500px] shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <CardHeader className="bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>College Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[calc(500px-4rem)]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[85%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-blue-100 dark:bg-blue-900' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-white dark:bg-gray-800"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!inputMessage.trim() || isTyping}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};