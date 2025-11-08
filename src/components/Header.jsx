import React from 'react';
import { Utensils, ChefHat } from 'lucide-react';

export default function Header({ view, onChangeView }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Eatery Hub</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Real-time ordering made simple</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => onChangeView('customer')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
              view === 'customer'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Utensils className="w-4 h-4" /> Customer
          </button>
          <button
            onClick={() => onChangeView('manager')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
              view === 'manager'
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ChefHat className="w-4 h-4" /> Manager
          </button>
        </nav>
      </div>
    </header>
  );
}
