import { useState } from 'react';
import { ArrowLeft, Paperclip, Send, Phone, Video } from 'lucide-react';

interface ChatProps {
  onBack: () => void;
}

const initialMessages = [
  {
    id: 1,
    sender: 'manager',
    text: 'Добрый день! Я ваш персональный менеджер Алексей. Готов ответить на все вопросы по проекту.',
    time: '10:30',
    date: '05.12.2024'
  },
  {
    id: 2,
    sender: 'user',
    text: 'Здравствуйте! Подскажите, когда планируется завершение кровельных работ?',
    time: '11:15',
    date: '05.12.2024'
  },
  {
    id: 3,
    sender: 'manager',
    text: 'Согласно графику работ, кровельные работы будут завершены к 25 ноября. На данный момент мы идем по плану.',
    time: '11:18',
    date: '05.12.2024'
  },
  {
    id: 4,
    sender: 'manager',
    text: 'Вы можете следить за прогрессом в режиме реального времени через видеонаблюдение.',
    time: '11:18',
    date: '05.12.2024'
  },
  {
    id: 5,
    sender: 'user',
    text: 'Отлично, спасибо! А можно ли внести изменения в планировку второго этажа?',
    time: '14:22',
    date: '06.12.2024'
  },
  {
    id: 6,
    sender: 'manager',
    text: 'Да, изменения возможны. Давайте обсудим детали. Какие именно изменения вы хотите внести?',
    time: '14:25',
    date: '06.12.2024'
  }
];

export function Chat({ onBack }: ChatProps) {
  const [messages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      // In a real app, this would send the message
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span>АП</span>
            </div>
            <div className="flex-1">
              <h3>Алексей Петров</h3>
              <p className="text-gray-500">Персональный менеджер</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => {
          const showDate = index === 0 || messages[index - 1].date !== message.date;
          
          return (
            <div key={message.id}>
              {showDate && (
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full">
                    {message.date}
                  </span>
                </div>
              )}
              
              <div
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t p-4">
        <div className="flex items-end gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Paperclip className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Введите сообщение..."
              rows={1}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`p-2 rounded-lg transition-colors ${
              inputText.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
