import React from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { FiGrid, FiShoppingCart, FiUser } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import logo from '/logo.svg'; 

//базовый класс для пунктов меню
const base =
  "flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 relative";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const location = useLocation();
  
  const toggleCategories = () => {
    window.dispatchEvent(new Event("nav:toggleCategories"));
  };

  const getProductIdFromPath = () => {
    if (location.pathname.startsWith('/products/')) {
      const match = location.pathname.match(/\/products\/(.+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const handleNavigation = (path) => {
    window.dispatchEvent(new Event("nav:closeCategories"));
    navigate(path);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    handleNavigation("/");
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    
    const productId = getProductIdFromPath();
    if (productId) {
      sessionStorage.setItem('lastProductPage', `/products/${productId}`);
    } else {
      sessionStorage.removeItem('lastProductPage');
    }
    
    handleNavigation("/cart");
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    handleNavigation("/account");
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <ul className="grid grid-cols-4 gap-1 py-2">
        <li>
          <button
            onClick={handleHomeClick}
            className={`${base} w-full`}
            aria-label="Главная"
          >
            <img
              src={logo}
              alt="Главная"
              className="h-5 w-auto"
              loading="eager"
              decoding="async"
            />
            <span className="text-xs mt-1">Главная</span>

          </button>
        </li>

        <li>
          <button
            onClick={toggleCategories}
            className={`${base} w-full`}
            aria-label="Категории"
          >
            <FiGrid size={20} />
            <span className="text-xs mt-1">Категории</span>
          </button>
        </li>

        <li>
          <button
            onClick={handleCartClick}
            className={`${base} w-full`}
            aria-label="Корзина"
          >
            <div className="relative">
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
            <span className="text-xs mt-1">Корзина</span>
          </button>
        </li>

        <li>
          <button
            onClick={handleAccountClick}
            className={`${base} w-full`}
            aria-label="Профиль"
          >
            <FiUser size={20} />
            <span className="text-xs mt-1">Профиль</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;