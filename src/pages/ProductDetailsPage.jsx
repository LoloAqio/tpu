import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../data/mockData";
import { useCart } from "../contexts/CartContext";
import { useChat } from "../contexts/ChatContext";
import Breadcrumbs from "../components/Breadcrumbs";
import ImageCarousel from "../components/ImageCarousel";
import { FiArrowLeft } from "react-icons/fi";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getCartItem } = useCart();
  const { hideChatbot } = useChat();
  const product = getProductById(id);
  
  // Скрываем чат на мобильных устройствах
  useEffect(() => {
    if (window.innerWidth < 768) {
      hideChatbot();
    }
  }, [hideChatbot]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Товар не найден
        </h1>
        <button
          onClick={handleBack}
          className="mt-4 px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Назад
        </button>
      </div>
    );
  }

  const inCart = !!getCartItem(product.id);
  
  // Формируем массив изображений для карусели
  const images = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
      ? [product.image] 
      : [];

  const handleCartAction = () => {
    if (inCart) {
      // Сохраняем что переходим из товара в корзину
      sessionStorage.setItem('lastProductPage', `/products/${id}`);
      navigate("/cart");
    } else {
      addToCart(product);
    }
  };

  const handleBack = () => {
    const lastCatalog = sessionStorage.getItem('lastCatalogState');
    if (lastCatalog) {
      const { path, scrollPosition } = JSON.parse(lastCatalog);
      navigate(path || "/");
      
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition || 0, behavior: 'instant' });
      }, 50);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-8">
      <div className="pt-6 md:pt-8">
        <button
          onClick={handleBack}
          aria-label="Назад"
          className="mb-4 inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
        >
          <FiArrowLeft className="h-5 w-5" />
          <span>Назад</span>
        </button>

        <div className="mb-4">
          <Breadcrumbs productName={product.name} productCategory={product.category} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        {/* Левая колонка: карусель */}
        <div className="
          mb-6 md:mb-0
          w-full md:w-1/3 md:max-w-sm
        ">
          <ImageCarousel
            images={images}
            className="w-full"
            aspectRatio="aspect-[4/5] md:aspect-[4/5]"
          />
        </div>

        {/* Правая колонка: информация и действия */}
        <div className="flex-1 max-w-2xl">
          <h1 className="
            text-2xl md:text-3xl
            font-bold mb-3 md:mb-4
            text-gray-900 dark:text-gray-100
          ">
            {product.name}
          </h1>

          <p className="
            text-gray-700 dark:text-gray-300
            leading-relaxed
            mb-5 md:mb-6
            text-base md:text-lg
          ">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-6 md:mb-8">
            <p className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
              {product.price.toLocaleString()} ₽
            </p>
          </div>

          <button
            onClick={handleCartAction}
            className={` 
              font-medium transition
              w-full md:w-auto
              px-8 md:px-10
              py-4
              rounded-lg
              ${inCart
                ? "border-2 border-blue-600 text-blue-600 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                : "bg-green-600 text-white hover:bg-green-700"
              }
            `}
          >
            {inCart ? "Перейти в корзину" : "В корзину"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;