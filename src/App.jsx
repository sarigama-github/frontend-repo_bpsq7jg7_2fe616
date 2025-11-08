import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import MenuItemCard from './components/MenuItemCard';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';

function App() {
  const [view, setView] = useState('customer'); // 'customer' | 'manager'
  const menu = useMemo(
    () => [
      { id: 'm1', name: 'Margherita Pizza', price: 299, description: 'Classic cheese pizza with fresh basil.' },
      { id: 'm2', name: 'Paneer Tikka Roll', price: 199, description: 'Smoky paneer wrapped in soft rumali roti.' },
      { id: 'm3', name: 'Veg Biryani', price: 249, description: 'Aromatic basmati rice with mixed veggies and spices.' },
      { id: 'm4', name: 'Masala Dosa', price: 179, description: 'Crisp dosa stuffed with spiced potatoes.' },
      { id: 'm5', name: 'Chicken Butter Masala', price: 349, description: 'Creamy tomato gravy with tender chicken.' },
      { id: 'm6', name: 'Cold Coffee', price: 129, description: 'Chilled and frothy, lightly sweet.' },
    ],
    []
  );

  const [cart, setCart] = useState({}); // { [id]: { id, name, price, qty } }
  const [orders, setOrders] = useState([]); // local preview for manager

  const total = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

  function addItem(item) {
    setCart((c) => {
      const existing = c[item.id];
      const nextQty = (existing?.qty || 0) + 1;
      return { ...c, [item.id]: { id: item.id, name: item.name, price: item.price, qty: nextQty } };
    });
  }

  function removeItem(item) {
    setCart((c) => {
      const existing = c[item.id];
      if (!existing) return c;
      const nextQty = existing.qty - 1;
      if (nextQty <= 0) {
        const { [item.id]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [item.id]: { ...existing, qty: nextQty } };
    });
  }

  function updateQty(id, qty) {
    setCart((c) => {
      if (qty <= 0) {
        const { [id]: _, ...rest } = c;
        return rest;
      }
      const existing = c[id];
      if (!existing) return c;
      return { ...c, [id]: { ...existing, qty } };
    });
  }

  function clearCart() {
    setCart({});
  }

  function placeOrder({ customerName, paymentMethod }) {
    const items = Object.values(cart);
    if (items.length === 0) return;
    const order = {
      id: `o_${Date.now()}`,
      customerName,
      items,
      totalAmount: total,
      paymentMethod,
      status: 'Pending',
      timestamp: new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    setView('manager');
  }

  function markCompleted(id) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'Completed' } : o)));
  }

  function deleteOrder(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      <Header view={view} onChangeView={setView} />

      {view === 'customer' ? (
        <main className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
          <section className="md:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Menu</h2>
              <p className="text-sm text-gray-500">Browse and add items to your cart</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  quantity={cart[item.id]?.qty || 0}
                  onAdd={() => addItem(item)}
                  onRemove={() => removeItem(item)}
                />)
              )}
            </div>
          </section>

          <section className="space-y-4">
            <Cart cart={cart} onUpdateQty={updateQty} onClear={clearCart} />
            <OrderForm total={total} onPlaceOrder={placeOrder} />
          </section>
        </main>
      ) : (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Manager Dashboard</h2>
            <p className="text-sm text-gray-500">Live preview of incoming orders (local state)</p>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
              No orders yet. Switch to Customer and place an order to preview.
            </div>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">{o.customerName}</p>
                      <p className="text-xs text-gray-500">{new Date(o.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        o.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {o.status}
                      </span>
                      <span className="text-sm font-semibold">₹{o.totalAmount}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      Payment: <span className="font-medium">{o.paymentMethod}</span>
                    </p>
                    <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
                      {o.items.map((i) => (
                        <li key={i.id}>
                          {i.name} — ₹{i.price} × {i.qty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    {o.status !== 'Completed' && (
                      <button
                        onClick={() => markCompleted(o.id)}
                        className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
                      >
                        Mark Completed
                      </button>
                    )}
                    <button
                      onClick={() => deleteOrder(o.id)}
                      className="px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      )}

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-gray-500">
        Built for a smooth demo of Eatery Hub UI. Real-time features connect easily to Firestore later.
      </footer>
    </div>
  );
}

export default App;
