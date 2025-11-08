import React from 'react';
import { Plus, Minus } from 'lucide-react';

export default function MenuItemCard({ item, quantity = 0, onAdd, onRemove }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="aspect-video bg-gradient-to-br from-amber-50 to-orange-100" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-gray-900">{item.name}</h3>
          <span className="text-emerald-700 font-semibold">₹{item.price}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Decrease"
              onClick={onRemove}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40"
              disabled={quantity === 0}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{quantity}</span>
            <button
              aria-label="Increase"
              onClick={onAdd}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={onAdd}
            className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
