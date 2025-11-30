import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useChat } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();
  
  const { hideChatbot } = useChat();
  const navigate = useNavigate();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      hideChatbot();
    }
  }, [hideChatbot]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCheckout = () => {
    clearCart();
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      setShowSuccessNotification(false);
    };
  }, []);

  const handleBack = () => {
    const lastProductPage = sessionStorage.getItem('lastProductPage');
    
    if (lastProductPage) {
      // Если перешли из товара - возвращаемся в товар
      navigate(lastProductPage);
      sessionStorage.removeItem('lastProductPage'); // очищаем после использования
    } else {
      // Иначе возвращаемся в каталог
      const lastCatalog = sessionStorage.getItem('lastCatalogState');
      if (lastCatalog) {
        const { path, scrollPosition } = JSON.parse(lastCatalog);
        navigate(path || "/");
        
        // Восстанавливаем скролл
        setTimeout(() => {
          window.scrollTo({ top: scrollPosition || 0, behavior: 'instant' });
        }, 50);
      } else {
        navigate("/");
      }
    }
  };


  if (cartItems.length === 0 && !showSuccessNotification) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Корзина</h1>
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Ваша корзина пуста</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Перейти к покупкам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div>
        <button
          onClick={handleBack}
          aria-label="Назад"
          className="mb-4 inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
        >
          <FiArrowLeft className="h-5 w-5" />
          <span>Назад</span>
        </button>
      </div>
      
      {/* Остальной JSX без изменений */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Корзина</h1>
      {cartItems.length === 0 && showSuccessNotification ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Заказ принят!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ваш заказ успешно оформлен. Мы отправили подтверждение на вашу почту и свяжемся с вами для уточнения деталей доставки.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Продолжить покупки
              </Link>
              <button 
                onClick={() => setShowSuccessNotification(false)}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex gap-3 md:flex-grow">
                  <Link 
                    to={`/products/${item.id}`} 
                    className="flex-shrink-0"
                    state={{ fromCart: true }}
                  >
                    <div className="w-16 md:w-24">
                      <div className="aspect-[4/5] w-full overflow-hidden rounded">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </Link>

                  <div className="flex-grow min-w-0">
                    <Link 
                      to={`/products/${item.id}`}
                      state={{ fromCart: true }}
                    >
                      <h3 className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 text-sm md:text-lg mb-1 line-clamp-2 text-gray-900 dark:text-gray-100">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-blue-600 dark:text-blue-400 font-bold text-base md:text-lg mt-1 md:mt-2">
                      {item.price.toLocaleString()} ₽
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end md:gap-6 md:w-64">
                  <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 md:w-8 md:h-8 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-sm md:text-base text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-medium w-8 text-center flex items-center justify-center text-sm md:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 md:w-8 md:h-8 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-sm md:text-base text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right md:text-left">
                    <p className="font-bold text-base md:text-lg whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs md:text-sm mt-1 transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg md:text-xl text-gray-900 dark:text-gray-100">
                Итого:
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-xl md:text-2xl">
                {getTotalPrice().toLocaleString()} ₽
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={clearCart}
                className="border border-red-600 dark:border-red-500 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors px-4 py-3"
              >
                Очистить корзину
              </button>
              <button 
                onClick={handleCheckout}
                className="bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors px-4 py-3 md:flex-grow"
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;