import { Bell, FileText, Video, MessageCircle, CheckCircle, Menu } from 'lucide-react';
import type { Screen, ProjectStatus } from '../App';

interface DashboardProps {
  status: ProjectStatus;
  onNavigateTo: (screen: Screen) => void;
  onUpdateStatus: (status: ProjectStatus) => void;
}

export function Dashboard({ status, onNavigateTo, onUpdateStatus }: DashboardProps) {
  const getStatusInfo = () => {
    switch (status) {
      case 'application-processing':
        return {
          title: 'Заявка обрабатывается',
          description: 'Наш менеджер скоро с вами свяжется',
          color: 'orange',
          progress: 10
        };
      case 'preparation':
        return {
          title: 'Подготовка к строительству',
          description: 'Документы готовы к подписанию',
          color: 'blue',
          progress: 25,
          action: () => onNavigateTo('documents')
        };
      case 'construction':
        return {
          title: 'Активная стройка',
          description: 'Этап: Возведение стен',
          color: 'green',
          progress: 45,
          action: () => onNavigateTo('video-stream')
        };
      case 'acceptance':
        return {
          title: 'Приемка объекта',
          description: 'Ваш дом построен!',
          color: 'purple',
          progress: 90,
          action: () => onNavigateTo('final-report')
        };
      case 'warranty':
        return {
          title: 'Гарантийное обслуживание',
          description: 'Объект передан',
          color: 'gray',
          progress: 100
        };
      default:
        return {
          title: 'Добро пожаловать',
          description: 'Выберите проект в каталоге',
          color: 'gray',
          progress: 0
        };
    }
  };

  const statusInfo = getStatusInfo();

  // Для демонстрации добавим кнопки перехода между статусами
  const renderDebugButtons = () => {
    return (
      <div className="p-4 bg-gray-50 border-t space-y-2">
        <div className="text-gray-500 mb-2">Демо: переключение статусов</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onUpdateStatus('preparation')}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
          >
            Подготовка
          </button>
          <button
            onClick={() => onUpdateStatus('construction')}
            className="px-3 py-2 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
          >
            Стройка
          </button>
          <button
            onClick={() => onUpdateStatus('acceptance')}
            className="px-3 py-2 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200"
          >
            Приемка
          </button>
          <button
            onClick={() => onUpdateStatus('warranty')}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            Гарантия
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-gray-600" />
            <h1>Личный кабинет</h1>
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
            {status === 'preparation' && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Status Card */}
        <div className="p-4">
          <div className="bg-white rounded-xl shadow-sm p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-3 h-3 bg-${statusInfo.color}-500 rounded-full`} />
              <h2>{statusInfo.title}</h2>
            </div>
            <p className="text-gray-600 mb-4">{statusInfo.description}</p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Прогресс</span>
                <span className="text-gray-900">{statusInfo.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${statusInfo.color}-500 transition-all duration-500`}
                  style={{ width: `${statusInfo.progress}%` }}
                />
              </div>
            </div>

            {statusInfo.action && (
              <button
                onClick={statusInfo.action}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {status === 'preparation' && 'Перейти к документам'}
                {status === 'construction' && 'Смотреть трансляцию'}
                {status === 'acceptance' && 'Принять работу'}
              </button>
            )}
          </div>

          {/* Notifications */}
          {status === 'preparation' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="flex gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-blue-900 mb-1">Документы готовы к подписанию</h3>
                  <p className="text-blue-700 mb-3">
                    Договор подряда, смета и график работ требуют вашего внимания
                  </p>
                  <button
                    onClick={() => onNavigateTo('documents')}
                    className="text-blue-600 hover:underline"
                  >
                    Перейти к документам →
                  </button>
                </div>
              </div>
            </div>
          )}

          {status === 'acceptance' && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-purple-900 mb-1">Поздравляем! Ваш дом построен</h3>
                  <p className="text-purple-700 mb-3">
                    Пожалуйста, ознакомьтесь с итоговым отчетом и подпишите акты приема-передачи
                  </p>
                  <button
                    onClick={() => onNavigateTo('final-report')}
                    className="text-purple-600 hover:underline"
                  >
                    Принять работу →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {status !== 'idle' && status !== 'application-processing' && (
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h3 className="mb-3">Быстрые действия</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigateTo('documents')}
                  className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-6 h-6 text-blue-600" />
                  <span>Документы</span>
                </button>
                
                {status === 'construction' && (
                  <button
                    onClick={() => onNavigateTo('video-stream')}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Video className="w-6 h-6 text-green-600" />
                    <span>Видео</span>
                  </button>
                )}
                
                <button
                  onClick={() => onNavigateTo('chat')}
                  className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                  <span>Чат</span>
                </button>
              </div>
            </div>
          )}

          {/* Project Info */}
          {status !== 'idle' && (
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="mb-3">Информация о проекте</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Проект:</span>
                  <span>Проект &quot;Современный&quot;</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Площадь:</span>
                  <span>180 м²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Дата начала:</span>
                  <span>15 сентября 2024</span>
                </div>
                {status === 'construction' && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Текущий этап:</span>
                    <span>Возведение стен</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Debug buttons */}
        {renderDebugButtons()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex justify-around">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <div className="w-6 h-6 bg-blue-100 rounded-full" />
            <span className="text-xs">Главная</span>
          </button>
          <button
            onClick={() => onNavigateTo('catalog')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <div className="w-6 h-6" />
            <span className="text-xs">Каталог</span>
          </button>
          <button
            onClick={() => onNavigateTo('chat')}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <div className="w-6 h-6" />
            <span className="text-xs">Чат</span>
          </button>
        </div>
      </div>
    </div>
  );
}
