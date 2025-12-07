import { ArrowLeft, ZoomIn, ZoomOut, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface DocumentViewerProps {
  documentId: string | null;
  onBack: () => void;
  onSign: () => void;
  onChat: () => void;
}

export function DocumentViewer({ documentId, onBack, onSign, onChat }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100);

  const getDocumentTitle = () => {
    switch (documentId) {
      case 'contract':
        return 'Договор подряда №123';
      case 'estimate':
        return 'Смета';
      case 'schedule':
        return 'График работ';
      default:
        return 'Документ';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2>{getDocumentTitle()}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-gray-600 min-w-[3rem] text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div
          className="bg-white shadow-lg mx-auto p-8 max-w-2xl"
          style={{ fontSize: `${zoom}%` }}
        >
          <div className="text-center mb-6">
            <h2>ДОГОВОР ПОДРЯДА №123</h2>
            <p className="text-gray-600">от 01 декабря 2024 года</p>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Заказчик:</strong> Иванов Иван Иванович
            </p>
            <p>
              <strong>Подрядчик:</strong> ООО &quot;СтройДом&quot;, ИНН 1234567890
            </p>

            <div className="border-t pt-4 mt-4">
              <h3 className="mb-2">1. ПРЕДМЕТ ДОГОВОРА</h3>
              <p>
                1.1. Подрядчик обязуется по заданию Заказчика выполнить строительные работы по возведению жилого дома согласно проекту &quot;Современный&quot; (далее - &quot;Объект&quot;), а Заказчик обязуется принять результат работ и оплатить их.
              </p>
              <p>
                1.2. Общая площадь объекта: 180 м²
              </p>
              <p>
                1.3. Этажность: 2 этажа
              </p>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="mb-2">2. СТОИМОСТЬ РАБОТ И ПОРЯДОК РАСЧЕТОВ</h3>
              <p>
                2.1. Общая стоимость работ по настоящему договору составляет 8 500 000 (восемь миллионов пятьсот тысяч) рублей 00 копеек, включая НДС 20%.
              </p>
              <p>
                2.2. Оплата производится поэтапно согласно графику платежей:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Аванс 30% - 2 550 000 руб.</li>
                <li>После завершения фундамента - 2 000 000 руб.</li>
                <li>После возведения стен и кровли - 2 000 000 руб.</li>
                <li>Финальный платеж после приемки - 1 950 000 руб.</li>
              </ul>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="mb-2">3. СРОКИ ВЫПОЛНЕНИЯ РАБОТ</h3>
              <p>
                3.1. Срок выполнения работ: 6-8 месяцев с момента подписания договора
              </p>
              <p>
                3.2. Дата начала работ: в течение 10 рабочих дней после получения аванса
              </p>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="mb-2">4. ГАРАНТИЙНЫЕ ОБЯЗАТЕЛЬСТВА</h3>
              <p>
                4.1. Подрядчик предоставляет гарантию на выполненные работы сроком 5 лет с момента подписания акта приема-передачи.
              </p>
            </div>

            <div className="border-t pt-4 mt-4 text-center">
              <p className="text-gray-500">
                [Полный текст договора доступен для скачивания]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t p-4 space-y-2">
        <button
          onClick={onSign}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Согласовать и подписать
        </button>
        <button
          onClick={onChat}
          className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Задать вопрос
        </button>
      </div>
    </div>
  );
}
