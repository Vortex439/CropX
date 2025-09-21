import React, { useState } from 'react'
import { PaperAirplaneIcon, UserIcon, CpuChipIcon } from '@heroicons/react/24/outline'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI farming assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me help you with that.",
        "I understand your concern. Here's what I recommend...",
        "Based on your query, I suggest checking the quality guidelines.",
        "For better crop yields, consider these farming practices...",
        "I can help you with pricing strategies for your crops.",
        "Let me provide you with some market insights for your region."
      ]
      
      const aiResponse: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const quickQuestions = [
    "How to improve crop quality?",
    "What's the best pricing strategy?",
    "How to use AI quality check?",
    "Market trends for my crops"
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg h-96 flex flex-col">
      {/* Header */}
      <div className="bg-primary-500 text-white p-4 rounded-t-lg">
        <div className="flex items-center">
          <CpuChipIcon className="h-6 w-6 mr-2" />
          <h3 className="font-semibold">AI Farming Assistant</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isUser
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start">
                {!message.isUser && (
                  <CpuChipIcon className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                )}
                {message.isUser && (
                  <UserIcon className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <CpuChipIcon className="h-4 w-4 mr-2" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-2 border-t">
        <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-1">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputText(question)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything about farming..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatBox
