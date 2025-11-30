import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Breadcrumbs = ({ productName, productCategory }) => { 
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const category = categoryParam || productCategory;
  
  // Определяем тип страницы по наличию данных
  const isHome = !category && !productName;
  const isProduct = !!productName;

  if (isHome) return null; // Не показываем на главной без категории
  
  const crumbs = [{ name: "Главная", path: "/" }];

  if (category) {
    crumbs.push({
      name: category,
      path: `/?category=${encodeURIComponent(category)}`,
    });
  }

  if (isProduct && productName) {
    crumbs.push({ name: productName, path: "" }); // Текущая страница - не кликабельная
  }

  return (
    <nav className="text-sm text-gray-500 mb-2">
      {crumbs.map((crumb, idx) => (
        <span key={idx}>
          {idx > 0 && <span className="mx-1">/</span>} 
          {idx < crumbs.length - 1 ? (
            <Link to={crumb.path} className="hover:underline">
              {crumb.name}  
            </Link>
          ) : (
            <span>{crumb.name}</span> // Текущее положение - не кликабельно
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;