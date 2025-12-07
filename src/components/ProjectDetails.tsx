import { ArrowLeft, MessageCircle } from 'lucide-react';
import type { Project } from '../App';

interface ProjectDetailsProps {
  project: Project | null;
  onBack: () => void;
  onOrder: () => void;
  onChat: () => void;
}

export function ProjectDetails({ project, onBack, onOrder, onChat }: ProjectDetailsProps) {
  if (!project) return null;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2>Детали проекта</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-4">
          <h1 className="mb-2">{project.name}</h1>
          <div className="text-blue-600 mb-4">
            от {project.price.toLocaleString('ru-RU')} ₽
          </div>

          <p className="text-gray-700 mb-6">
            {project.description}
          </p>

          {/* Characteristics */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="mb-3">Характеристики</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 mb-1">Общая площадь</div>
                <div>{project.area} м²</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Этажность</div>
                <div>{project.floors} {project.floors === 1 ? 'этаж' : 'этажа'}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Спальни</div>
                <div>{project.bedrooms} шт</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Срок строительства</div>
                <div>6-8 месяцев</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="mb-3">Особенности проекта</h3>
            <div className="space-y-2">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="mb-2">Что входит в стоимость</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Разработка проектной документации</li>
              <li>• Строительные материалы</li>
              <li>• Работы под ключ</li>
              <li>• Гарантия 5 лет</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t p-4 space-y-2">
        <button
          onClick={onOrder}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Заказать проект
        </button>
        <button
          onClick={onChat}
          className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Написать менеджеру
        </button>
      </div>
    </div>
  );
}
