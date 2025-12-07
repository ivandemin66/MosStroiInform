import { ArrowLeft, FileText, CheckCircle, Clock } from 'lucide-react';

interface DocumentsProps {
  onBack: () => void;
  onSelectDocument: (docId: string) => void;
}

const documents = [
  {
    id: 'contract',
    name: 'Договор подряда №123',
    status: 'pending',
    date: '01.12.2024'
  },
  {
    id: 'estimate',
    name: 'Смета',
    status: 'pending',
    date: '01.12.2024'
  },
  {
    id: 'schedule',
    name: 'График работ',
    status: 'pending',
    date: '01.12.2024'
  }
];

export function Documents({ onBack, onSelectDocument }: DocumentsProps) {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2>Документы</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-blue-900 mb-1">Требуется ваше внимание</h3>
          <p className="text-blue-700">
            {documents.filter(d => d.status === 'pending').length} документа ожидают подписания
          </p>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(doc.id)}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1">{doc.name}</h3>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>от {doc.date}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-2">
                    {doc.status === 'pending' ? (
                      <>
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span className="text-orange-600">Ожидает подписания</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">Подписан</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="mb-2">Справка</h3>
          <p className="text-gray-600">
            Для подписания документа вам потребуется ввести код из SMS, который будет отправлен на ваш номер телефона
          </p>
        </div>
      </div>
    </div>
  );
}
