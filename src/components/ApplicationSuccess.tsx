import { CheckCircle } from 'lucide-react';

interface ApplicationSuccessProps {
  onBackToCatalog: () => void;
  onGoToDashboard: () => void;
}

export function ApplicationSuccess({ onBackToCatalog, onGoToDashboard }: ApplicationSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-white">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="mb-3">Ваша заявка принята</h1>
        
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          Менеджер свяжется с вами в ближайшее время для уточнения деталей и согласования проекта
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-8 max-w-sm mx-auto">
          <div className="text-gray-600 mb-1">Статус заявки</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span>Заявка обрабатывается</span>
          </div>
        </div>

        <div className="space-y-3 max-w-sm mx-auto">
          <button
            onClick={onGoToDashboard}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Перейти в личный кабинет
          </button>
          
          <button
            onClick={onBackToCatalog}
            className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Вернуться в каталог
          </button>
        </div>
      </div>
    </div>
  );
}
