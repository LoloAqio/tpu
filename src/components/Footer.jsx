import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 text-gray-300 dark:text-gray-400 pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-white">Marketplace</h2>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Marketplace. Все права защищены.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="/about" className="hover:text-white transition">
            О нас
          </a>
          <a href="/contact" className="hover:text-white transition">
            Контакты
          </a>
          <a href="/privacy" className="hover:text-white transition">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;