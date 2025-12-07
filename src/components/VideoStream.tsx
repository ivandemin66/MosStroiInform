import { ArrowLeft, Maximize2, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

interface VideoStreamProps {
  onBack: () => void;
}

const timeline = [
  { date: '15.09.2024', title: 'Начало работ', description: 'Подготовка участка' },
  { date: '22.09.2024', title: 'Фундамент', description: 'Заливка фундамента' },
  { date: '10.10.2024', title: 'Возведение стен', description: 'Кладка первого этажа' },
  { date: '01.11.2024', title: 'Второй этаж', description: 'Кладка второго этажа' },
  { date: '20.11.2024', title: 'Кровля', description: 'Монтаж крыши', active: true }
];

export function VideoStream({ onBack }: VideoStreamProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      {!isFullscreen && (
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-10">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2>Видеонаблюдение</h2>
        </div>
      )}

      {/* Video Container */}
      <div className={`${isFullscreen ? 'h-screen' : 'aspect-video'} bg-gray-900 relative`}>
        <img
          src="https://images.unsplash.com/photo-1634586648651-f1fb9ec10d90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNvbnN0cnVjdGlvbiUyMHByb2dyZXNzfGVufDF8fHx8MTc2NDkyNTM2NHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Construction site"
          className="w-full h-full object-cover"
        />
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span>Прямой эфир</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>06.12.2024</span>
                <Clock className="w-4 h-4 ml-2" />
                <span>14:32</span>
              </div>
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live indicator */}
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Timeline */}
      {!isFullscreen && (
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="mb-4">Хронология событий</h3>
          
          <div className="space-y-4">
            {timeline.map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      event.active ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-1" />
                  )}
                </div>
                
                <div className={`flex-1 pb-6 ${event.active ? '' : 'opacity-60'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{event.title}</h4>
                    {event.active && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">
                        Текущий этап
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 mb-1">{event.date}</p>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-900 mb-2">Прогресс строительства</h3>
            <div className="mb-3">
              <div className="flex justify-between text-blue-700 mb-1">
                <span>Возведение стен</span>
                <span>45%</span>
              </div>
              <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: '45%' }}
                />
              </div>
            </div>
            <p className="text-blue-700">
              Работы идут по графику. Следующий этап: монтаж кровли (планируется 25.11.2024)
            </p>
          </div>

          {/* Camera Info */}
          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <h3 className="mb-2">Информация о камере</h3>
            <div className="space-y-1 text-gray-700">
              <p>Камера №1 - Общий вид</p>
              <p className="text-gray-500">Обновление: каждые 5 минут</p>
              <p className="text-gray-500">Качество: HD 1080p</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
