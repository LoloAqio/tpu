import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import NavigationBar from "./NavigationBar";
import { FiSearch, FiShoppingCart, FiUser, FiMoon, FiSun } from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import { useChat } from "../contexts/ChatContext";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { hideChatbot, showChatbot } = useChat();
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const scrollYRef = useRef(0);

  const { scrollY } = useScroll();

  const getProductIdFromPath = () => {
    if (location.pathname.startsWith('/products/')) {
      const match = location.pathname.match(/\/products\/(.+)/);
      return match ? match[1] : null;
    }
    return null;
  };

  const handleCartClick = () => {
    closeMenu();
    
    const productId = getProductIdFromPath();
    if (productId) {
      // Если находимся на странице товара - сохраняем lastProductPage
      sessionStorage.setItem('lastProductPage', `/products/${productId}`);
    } else {
      // Если не на странице товара - очищаем
      sessionStorage.removeItem('lastProductPage');
    }
    
    navigate("/cart");
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollingDown = latest > lastScrollY;
    
    if (scrollingDown && latest > 100) {
      setIsVisible(false);
    } else if (!scrollingDown || latest < 50) {
      setIsVisible(true);
    }
    
    setLastScrollY(latest);
  });


  const toggleMenu = () => {
    if (!isMenuOpen) {
      hideChatbot();
    } else {
      showChatbot();
    }
    setIsMenuOpen((v) => !v);
  };

  const openMenu = () => {
    if (!isMenuOpen) {
      hideChatbot();
      setIsMenuOpen(true);
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      showChatbot();
    }
  };

  const goHome = () => {
    closeMenu();
    navigate("/");
  };

  useEffect(() => {
    const param = searchParams.get("search");
    if (param) {
      setSearchQuery(param);
    } else {
      setSearchQuery('');
    }
  }, [location.search, location.pathname]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    closeMenu();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const body = document.body;
    scrollYRef.current = window.scrollY;

    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflowY = "scroll";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflowY = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onOpen = () => openMenu();
    const onClose = () => closeMenu();
    const onToggle = () => toggleMenu();

    window.addEventListener("nav:openCategories", onOpen);
    window.addEventListener("nav:closeCategories", onClose);
    window.addEventListener("nav:toggleCategories", onToggle);

    return () => {
      window.removeEventListener("nav:openCategories", onOpen);
      window.removeEventListener("nav:closeCategories", onClose);
      window.removeEventListener("nav:toggleCategories", onToggle);
    };
  }, [isMenuOpen]);

  const totalItems = getTotalItems();

  const headerVariants = {
    visible: {
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    hidden: {
      y: "-100%",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  return (
    <>
      {/* Мобильный: только строка поиска */}
      <motion.header
        variants={headerVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        className="fixed top-0 w-full z-60 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 md:hidden"
      >
        <div className="px-4 py-2">
          <form onSubmit={onSearchSubmit} className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full pl-4 pr-12 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            />

            <button
              type="submit"
              aria-label="Поиск"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 cursor-pointer dark:hover:text-blue-400 transition-colors"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.header>

      {/* Десктоп: исходный хедер */}
      <motion.header
        variants={headerVariants}
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        className="hidden md:block fixed top-0 w-full z-60 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4 ">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="flex flex-col space-y-1 p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800 rounded w-10 h-10 justify-center items-center transition-colors"
            >
              <div
                className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-400 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-400 transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <div
                className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-400 transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>

            <button
              onClick={goHome}
              className="focus:outline-none hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img
                src="/logo.svg"
                alt="Marketplace"
                className="w-auto h-7"
              />
            </button>
          </div>

          <form onSubmit={onSearchSubmit} className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-full pl-4 pr-12 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            />

            <button
              type="submit"
              aria-label="Поиск"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 cursor-pointer dark:hover:text-blue-400 transition-colors"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </form>


          <div className="flex items-center space-x-2">

            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full focus:outline-none transition-colors cursor-pointer"
            >
              {isDark ? (
                <FiSun size={22} className="text-yellow-400" />
              ) : (
                <FiMoon size={22} className="text-gray-700" />
              )}
            </button>

            <Link
              to="/account"
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full focus:outline-none transition-colors"
              aria-label="Личный кабинет"
              onClick={closeMenu}
            >
              <FiUser size={24} className="text-gray-700 dark:text-gray-300" />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full focus:outline-none transition-colors"
              aria-label="Корзина"
              onClick={handleCartClick}
            >
              <FiShoppingCart size={24} className="text-gray-700 dark:text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </motion.header>

      <SidebarMenu isOpen={isMenuOpen} onClose={closeMenu} />

      <NavigationBar />
    </>
  );
};

export default Header;