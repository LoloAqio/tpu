import React, { useEffect, useRef } from "react";
import {  useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useChat } from "../contexts/ChatContext";
import ImageCarousel from "./ImageCarousel";

const ProductCardPreview = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart, getCartItem } = useCart();
  const { hideChatbot, showChatbot } = useChat();
  const scrollYRef = useRef(0);
  
  useEffect(() => {
    hideChatbot();
    const body = document.body;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    scrollYRef.current = window.scrollY;
    
    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      showChatbot();
      body.style.overflow = "";
      body.style.paddingRight = "";
      window.scrollTo(0, scrollYRef.current);
    }
  }, [hideChatbot, showChatbot]);

  const goToDetails = () => {
    onClose?.();
    navigate(`/products/${product.id}`);
  };

  const handleCartAction = () => {
    const cartItem = getCartItem(product.id);
    if (cartItem) {
      onClose?.();
      navigate('/cart');
    } else {
      addToCart(product);
    }
  };

  const isInCart = !!getCartItem(product.id);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
      ? [product.image] 
      : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[1px] flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-[92vw] max-w-[720px] h-auto max-h-[86vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-0 -right-0 z-30 text-xl font-bold bg-white/90 dark:bg-gray-900/90 shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition cursor-pointer text-gray-800 dark:text-white"
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="grid grid-cols-5 gap-0">
          <div className="col-span-2">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <ImageCarousel 
                images={images}
                className="h-full w-full rounded-none"
                aspectRatio="aspect-[4/5]"
              />
            </div>
          </div>

          <div className="col-span-3 p-6 flex flex-col min-w-0">
            <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-6">
              {product.description}
            </p>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {product.price.toLocaleString()} ₽
                </p>
                <button
                  onClick={goToDetails}
                  className="px-4 py-2 rounded-lg border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                >
                  Больше информации
                </button>
              </div>
              <button 
                onClick={handleCartAction}
                className={`
                  w-full px-5 py-3 rounded-lg transition
                  ${isInCart 
                    ? 'border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                  }
                `}
              >
                {isInCart ? 'Перейти в корзину' : 'В корзину'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPreview;