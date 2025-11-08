import React from 'react';

export default function Cart({ cart, onUpdateQty, onClear }) {
  const items = Object.values(cart);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <aside className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 sticky top-20 h-max">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        {items.length > 0 && (
          <button onClick={onClear} className="text-sm text-gray-500 hover:text-gray-700">Clear</button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 mt-2">No items yet. Add some delicious dishes!</p>
      ) : (
        <ul className="divide-y divide-gray-100 mt-2">
          {items.map((i) => (
            <li key={i.id} className="py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{i.name}</p>
                <p className="text-xs text-gray-500">₹{i.price} × {i.qty}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQty(i.id, i.qty - 1)}
                  className="px-2 py-1 rounded border text-sm hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-medium">{i.qty}</span>
                <button
                  onClick={() => onUpdateQty(i.id, i.qty + 1)}
                  className="px-2 py-1 rounded border text-sm hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">Total</span>
        <span className="text-lg font-semibold">₹{total}</span>
      </div>
    </aside>
  );
}
