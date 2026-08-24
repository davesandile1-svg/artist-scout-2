'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSend } from 'react-icons/fi';

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  lastMessage: string;
  unread: boolean;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch conversations from API
    const mockConversations: Conversation[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'The Weeknd',
        userImage: 'https://via.placeholder.com/44',
        lastMessage: 'Thanks for the opportunity!',
        unread: true,
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'J. Cole',
        userImage: 'https://via.placeholder.com/44',
        lastMessage: 'I\'m interested in collaborating',
        unread: false,
      },
    ];
    setConversations(mockConversations);
    setLoading(false);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // TODO: Send message to API
    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: 'current_user',
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black pb-16">
      {/* Conversations List */}
      <div className="w-full md:w-96 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map(conversation => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-4 border-b border-gray-800 flex gap-3 hover:bg-gray-900 transition text-left ${
                selectedConversation === conversation.id ? 'bg-gray-900' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0">
                <img src={conversation.userImage} alt={conversation.userName} className="w-full h-full rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{conversation.userName}</p>
                <p className="text-gray-400 text-sm truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread && (
                <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0 mt-2"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700"></div>
              <div>
                <p className="font-semibold">
                  {conversations.find(c => c.id === selectedConversation)?.userName}
                </p>
                <p className="text-gray-400 text-xs">Active now</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'current_user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.senderId === 'current_user'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-600 transition"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <Link href="/feed" className="nav-item">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </Link>
        <Link href="/discover" className="nav-item">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Discover</span>
        </Link>
        <Link href="/create" className="nav-item">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create</span>
        </Link>
        <Link href="/messages" className="nav-item active">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span>Messages</span>
        </Link>
        <Link href="/profile" className="nav-item">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}
