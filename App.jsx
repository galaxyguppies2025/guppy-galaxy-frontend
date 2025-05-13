import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [guppies, setGuppies] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/guppies')
      .then(res => setGuppies(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (guppy) => {
    setCart([...cart, guppy]);
  };

  const checkoutStripe = async () => {
    const res = await axios.post('http://localhost:5000/api/checkout/stripe', {
      items: cart,
    });
    window.location.href = `https://checkout.stripe.com/pay/${res.data.id}`;
  };

  const checkoutMercadoPago = async () => {
    const res = await axios.post('http://localhost:5000/api/checkout/mercadopago', {
      items: cart,
    });
    window.location.href = res.data.init_point;
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">Guppy Galaxy</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guppies.map((g) => (
          <div key={g._id} className="border rounded-xl p-4 shadow-md">
            <img src={g.image} alt={g.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{g.name}</h2>
            <p className="text-gray-700">{g.description}</p>
            <p className="text-green-600 font-bold mt-1">${g.price}</p>
            <button
              onClick={() => addToCart(g)}
              className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t flex justify-between">
          <span>{cart.length} producto(s) en el carrito</span>
          <div>
            <button
              onClick={checkoutStripe}
              className="bg-purple-600 text-white px-4 py-2 rounded mr-2"
            >
              Pagar con Stripe
            </button>
            <button
              onClick={checkoutMercadoPago}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Pagar con Mercado Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
