import { Trophy, Download, Home, Award } from 'lucide-react';

interface CompletionProps {
  onUpdateStatus: () => void;
}

export function Completion({ onUpdateStatus }: CompletionProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center max-w-md">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-bounce">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span>🎉</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="mb-3">Дом официально передан вам!</h1>
        
        <p className="text-gray-700 mb-8">
          Поздравляем с успешным завершением строительства! Гарантийный сертификат сформирован и готов к использованию.
        </p>

        {/* Certificate Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h3>Гарантийный сертификат</h3>
              <p className="text-gray-500">№ГС-123/2024</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Срок гарантии:</span>
              <span>5 лет</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Действует до:</span>
              <span>06.12.2029</span>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-purple-700">
              В течение гарантийного срока мы устраним все выявленные дефекты строительства бесплатно
            </p>
          </div>
        </div>

        {/* Documents Download */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="mb-3">Ваши документы</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span>Договор подряда</span>
              <Download className="w-5 h-5 text-blue-600" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span>Акт приема-передачи</span>
              <Download className="w-5 h-5 text-blue-600" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span>Гарантийный сертификат</span>
              <Download className="w-5 h-5 text-blue-600" />
            </button>
          </div>
          
          <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Скачать все документы архивом
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="text-blue-900 mb-2">Что дальше?</h3>
          <ul className="space-y-1 text-blue-700 text-left">
            <li>• Наслаждайтесь вашим новым домом</li>
            <li>• Обращайтесь по гарантии при необходимости</li>
            <li>• Следите за статусом гарантии в личном кабинете</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onUpdateStatus}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Перейти в личный кабинет
          </button>
        </div>

        {/* Thank you message */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg">
          <p className="text-gray-600">
            Спасибо за то, что выбрали нас! Желаем вам счастливой жизни в новом доме! 🏡
          </p>
        </div>
      </div>
    </div>
  );
}
