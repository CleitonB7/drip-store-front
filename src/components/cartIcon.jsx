import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../contexts/cartContext';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <button
      className="relative"
      onClick={() => navigate('pedidos')}
      aria-label="Ver carrinho"
    >
      {/* Ícone do carrinho */}
      <FiShoppingCart className="text-2xl text-gray-700 hover:text-primary transition-colors" />

      {/* Badge do número de itens */}
      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </button>
  );
};

export default CartIcon;