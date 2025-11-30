import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategoryNames } from "../data/mockData";

const SidebarMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "Все";

  const categories = getCategoryNames();

  const handleCategorySelect = (categoryName) => {
    onClose();
    
    if (categoryName === "Все") {
      navigate("/");
    } else {
      navigate(`/?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {/* Затемненный фон */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40"
          onClick={handleClose}
        />
      )}

      {/* Боковое меню */}
      <div
        className={`
          fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          overflow-y-auto
        `}
      >
        <div className="pt-20 p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
            Категории
          </h2>
          <nav>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategorySelect(category)}
                    className={`
                      w-full text-left px-4 py-2 rounded-md transition-colors
                      ${currentCategory === category
                        ? 'bg-blue-600 dark:bg-blue-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;