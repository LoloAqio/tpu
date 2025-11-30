import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { getProductsByCategory, getCategoryNames } from "../data/mockData";
import ProductCardPreview from "../components/ProductCardPreview";
import { useCart } from "../contexts/CartContext";
import { useChat } from "../contexts/ChatContext";
import { FiShoppingCart } from "react-icons/fi";

const ITEMS_PER_PAGE = 8;

const SkeletonCard = () => (
  <div className="group relative bg-white dark:bg-gray-800 rounded-lg animate-pulse flex flex-col">
    <div className="relative">
      <div className="aspect-[4/5] overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-700" />
    </div>
    <div className="p-3 md:p-4 flex flex-col flex-grow">
      <div className="flex-grow mb-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart, getCartItem } = useCart();
  const { hideChatbot } = useChat();

  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [previewProduct, setPreviewProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = getCategoryNames().filter(category => category !== "Все");

  useEffect(() => {
    if (window.innerWidth < 768) {
      hideChatbot();
    }
  }, [hideChatbot]);

  useEffect(() => {
    const saveHomeState = () => {
      if (window.location.pathname === "/") {
        const stateToSave = {
          path: window.location.pathname + window.location.search,
          scrollPosition: window.scrollY,
          page: pageParam,
          category: selectedCategory,
          searchQuery: searchQuery
        };
        sessionStorage.setItem('lastCatalogState', JSON.stringify(stateToSave));
      }
    };
    saveHomeState();
    const handleScroll = () => {
      saveHomeState();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedCategory, searchQuery, pageParam]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!selectedCategory) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery, pageParam]);

  let filtered = getProductsByCategory(selectedCategory || "Все");
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(q)
    );
  }

  const totalItemsCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItemsCount / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const goToPage = (page) => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (searchQuery) params.search = searchQuery;
    params.page = page;
    setSearchParams(params);
  };

  const handleCategorySelect = (categoryName) => {
    setSearchParams({
      category: categoryName,
      page: '1',
    });
  };

  const handleCartAction = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const inCart = !!getCartItem(product.id);
    if (inCart) {
      navigate("/cart");
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {selectedCategory && (
        <div className="mt-0 mb-2">
          <Breadcrumbs />
        </div>
      )}

      {!selectedCategory && (
        <div className="mb-2">
          <div className="flex overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            <div className="flex space-x-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedCategory && (
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {selectedCategory}
        </h1>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : currentItems.map((product) => {
              const inCart = !!getCartItem(product.id);
              return (
                <div
                  key={product.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg dark:hover:shadow-gray-700/30 transition-all flex flex-col"
                >
                  <div className="relative">
                    <Link 
                      to={`/products/${product.id}`} 
                      state={{ from: location.pathname + location.search }}
                    >
                      <div className="aspect-[4/5] overflow-hidden rounded-t-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <button
                      onClick={() => setPreviewProduct(product)}
                      className="
                        absolute bottom-2 left-1/2 -translate-x-1/2
                        opacity-0 group-hover:opacity-100
                        pointer-events-none group-hover:pointer-events-auto
                        text-xs px-3 py-1 rounded-md
                        bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 shadow hover:bg-white dark:hover:bg-gray-700 transition-colors
                        text-gray-700 dark:text-gray-300 cursor-pointer
                        hidden md:block
                      "
                    >
                      Быстрый просмотр
                    </button>
                  </div>
                  <div className="p-3 md:p-4 flex flex-col flex-grow">
                    <Link 
                      to={`/products/${product.id}`}
                      className="flex-grow mb-3"
                    >
                      <h3 className="font-semibold text-sm md:text-lg mb-2 line-clamp-2 text-gray-900 dark:text-gray-100">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-blue-600 dark:text-blue-400 font-bold text-base md:text-xl">
                        {product.price.toLocaleString()} ₽
                      </p>
                      <button
                        onClick={(e) => handleCartAction(product, e)}
                        className={`rounded-full flex items-center justify-center transition-colors cursor-pointer
                          w-8 h-8 md:w-10 md:h-10
                          ${
                            inCart
                              ? "border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }
                        `}
                      >
                        <FiShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {totalPages > 1 && !loading && (
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
          >
            Назад
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded border transition-colors cursor-pointer ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
          >
            Вперёд
          </button>
        </div>
      )}

      {previewProduct && (
        <ProductCardPreview
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
        />
      )}
    </div>
  );
};

export default HomePage;