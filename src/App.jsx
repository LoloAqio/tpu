import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ChatProvider } from './contexts/ChatContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import TawkMessenger from './components/TawkMessenger';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <Header />
              <main className="flex-grow pt-12">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/account" element={<AccountPage />} />
                </Routes>
              </main>
              <Footer />
              <TawkMessenger/>
            </div>
          </Router>
        </CartProvider>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;