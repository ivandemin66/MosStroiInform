import { ArrowLeft, Download, CheckCircle } from 'lucide-react';

interface FinalReportProps {
  onBack: () => void;
  onSign: () => void;
}

const completedWorks = [
  'Фундамент (монолитная плита)',
  'Возведение стен (газобетон)',
  'Кровля (металлочерепица)',
  'Окна и двери',
  'Внутренняя отделка',
  'Инженерные коммуникации',
  'Благоустройство территории'
];

const finalPhotos = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NDk3MjYyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1758448756880-01dbaf85597d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDk3NTAyNHww&ixlib=rb-4.1.0&q=80&w=1080'
];

export function FinalReport({ onBack, onSign }: FinalReportProps) {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2>Итоговый отчет</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Congratulations */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="mb-2">Поздравляем!</h1>
          <p className="text-gray-700">
            Ваш дом успешно построен и готов к сдаче
          </p>
        </div>

        {/* Project Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="mb-4">Информация о проекте</h3>
          <div className="space-y-3">
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
              <span>15.09.2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Дата завершения:</span>
              <span>06.12.2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Срок строительства:</span>
              <span className="text-green-600">83 дня (по плану)</span>
            </div>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="mb-4">Финансовая сверка</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Стоимость по договору:</span>
              <span>8 500 000 ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Оплачено:</span>
              <span>6 550 000 ₽</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Дополнительные работы:</span>
              <span>0 ₽</span>
            </div>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="text-gray-700">К оплате:</span>
            <span className="text-blue-600">1 950 000 ₽</span>
          </div>
        </div>

        {/* Completed Works */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="mb-4">Выполненные работы</h3>
          <div className="space-y-2">
            {completedWorks.map((work, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{work}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="mb-4">Фотографии готового объекта</h3>
          <div className="grid grid-cols-2 gap-3">
            {finalPhotos.map((photo, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={photo}
                  alt={`Final photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <h3 className="mb-4">Документы к подписанию</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Акт приема-передачи</span>
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Закрывающие документы</span>
              <Download className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Warranty Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="text-blue-900 mb-2">Гарантийное обслуживание</h3>
          <p className="text-blue-700">
            После подписания акта приема-передачи вы получите гарантийный сертификат на 5 лет
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t p-4">
        <button
          onClick={onSign}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Перейти к подписанию акта
        </button>
      </div>
    </div>
  );
}
