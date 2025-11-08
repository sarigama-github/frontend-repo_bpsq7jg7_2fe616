import React, { useState } from 'react';

export default function OrderForm({ total, onPlaceOrder }) {
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  function handleSubmit(e) {
    e.preventDefault();
    if (!customerName.trim()) return;
    onPlaceOrder({ customerName, paymentMethod });
    setCustomerName('');
    setPaymentMethod('Cash');
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 space-y-3">
      <h3 className="text-lg font-semibold">Checkout</h3>
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Customer Name</label>
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-gray-600">Payment Method</label>
        <div className="flex gap-2">
          {['Cash', 'UPI', 'Card'].map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setPaymentMethod(m)}
              className={`px-3 py-1.5 rounded-md border text-sm ${
                paymentMethod === m ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Total</span>
        <span className="text-lg font-semibold">₹{total}</span>
      </div>
      <button
        type="submit"
        disabled={total === 0}
        className="w-full rounded-md bg-emerald-600 text-white py-2 font-medium hover:bg-emerald-700 disabled:opacity-50"
      >
        Place Order
      </button>
    </form>
  );
}
