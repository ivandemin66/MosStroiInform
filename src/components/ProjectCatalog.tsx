// @ts-ignore
import { useState } from 'react';
import { Search, SlidersHorizontal, Home } from 'lucide-react';
import type { Project } from '../App';
import logo from 'figma:asset/08a338da177ceb846efc30ac73dde28d546b6b5f.png';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Проект "Современный"',
    area: 180,
    floors: 2,
    bedrooms: 4,
    price: 8500000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NDk3MjYyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Современный двухэтажный дом с панорамными окнами и террасой',
    features: ['Панорамные окна', 'Терраса', 'Гараж на 2 авто', 'Котельная']
  },
  {
    id: '2',
    name: 'Проект "Классика"',
    area: 220,
    floors: 2,
    bedrooms: 5,
    price: 10200000,
    image: 'https://images.unsplash.com/photo-1758448756880-01dbaf85597d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDk3NTAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Элегантный особняк в классическом стиле с просторной планировкой',
    features: ['Балконы', 'Кабинет', 'Гардеробная', 'Сауна']
  },
  {
    id: '3',
    name: 'Проект "Уют"',
    area: 140,
    floors: 1,
    bedrooms: 3,
    price: 6800000,
    image: 'https://images.unsplash.com/photo-1659720879268-818dea77efaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ5NTY3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Компактный одноэтажный дом для комфортной загородной жизни',
    features: ['Камин', 'Веранда', 'Кладовая', 'Просторная кухня-гостиная']
  },
  {
    id: '4',
    name: 'Проект "Премиум"',
    area: 320,
    floors: 2,
    bedrooms: 6,
    price: 15500000,
    image: 'https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NDk5OTUyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Роскошная вилла с бассейном и панорамным остеклением',
    features: ['Бассейн', 'Винный погреб', 'Домашний кинотеатр', 'Спортзал']
  }
];

interface ProjectCatalogProps {
  onSelectProject: (project: Project) => void;
  onNavigateToDashboard: () => void;
}

export function ProjectCatalog({ onSelectProject, onNavigateToDashboard }: ProjectCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minArea: '',
    maxArea: '',
    minPrice: '',
    maxPrice: '',
    floors: '',
    bedrooms: ''
  });

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesArea = (!filters.minArea || project.area >= Number(filters.minArea)) &&
                       (!filters.maxArea || project.area <= Number(filters.maxArea));
    
    const matchesPrice = (!filters.minPrice || project.price >= Number(filters.minPrice)) &&
                        (!filters.maxPrice || project.price <= Number(filters.maxPrice));
    
    const matchesFloors = !filters.floors || project.floors === Number(filters.floors);
    const matchesBedrooms = !filters.bedrooms || project.bedrooms === Number(filters.bedrooms);
    
    return matchesSearch && matchesArea && matchesPrice && matchesFloors && matchesBedrooms;
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <img src={logo} alt="МосСтройИнформ" className="h-8" />
          <button
            onClick={onNavigateToDashboard}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск проектов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${
              showFilters ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Площадь от, м²"
                value={filters.minArea}
                onChange={(e) => setFilters({...filters, minArea: e.target.value})}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Площадь до, м²"
                value={filters.maxArea}
                onChange={(e) => setFilters({...filters, maxArea: e.target.value})}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Цена от, ₽"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Цена до, ₽"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={filters.floors}
                onChange={(e) => setFilters({...filters, floors: e.target.value})}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Этажей</option>
                <option value="1">1 этаж</option>
                <option value="2">2 этажа</option>
                <option value="3">3 этажа</option>
              </select>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Спален</option>
                <option value="2">2 спальни</option>
                <option value="3">3 спальни</option>
                <option value="4">4 спальни</option>
                <option value="5">5 спален</option>
                <option value="6">6 спален</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-1">{project.name}</h3>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="text-gray-500">Площадь</div>
                  <div>{project.area} м²</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500">Этажей</div>
                  <div>{project.floors}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-500">Спален</div>
                  <div>{project.bedrooms}</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-gray-500">от</span>
                <span className="text-blue-600">{project.price.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}