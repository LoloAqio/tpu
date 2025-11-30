import React, { useEffect, useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "user_profile";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

const AccountPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  
  const { hideChatbot } = useChat();

  // Скрываем чат на мобильных устройствах
  useEffect(() => {
    if (window.innerWidth < 768) {
      hideChatbot();
    }
  }, [hideChatbot]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setForm((f) => ({ ...f, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const validateEmail = (v) => (!v ? "" : emailRegex.test(v) ? "" : "Некорректный email");
  const validatePhone = (v) => (!v ? "" : phoneRegex.test(v) ? "" : "Некорректный номер телефона");

  const onBlur = (key) => {
    if (key === "email") setErrors((e) => ({ ...e, email: validateEmail(form.email) }));
    if (key === "phone") setErrors((e) => ({ ...e, phone: validatePhone(form.phone) }));
  };

  const onSave = (e) => {
    e.preventDefault();
    const emailErr = validateEmail(form.email);
    const phoneErr = validatePhone(form.phone);
    setErrors({ email: emailErr, phone: phoneErr });
    if (emailErr || phoneErr) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Личный кабинет</h1>

      {/* Всплывающее уведомление об успешном сохранении */}
      <AnimatePresence>
        {showSuccessNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-60 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-md mx-auto"
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Данные успешно сохранены!</p>
              </div>
              <button
                onClick={() => setShowSuccessNotification(false)}
                className="flex-shrink-0 ml-4 text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Форма профиля */}
      <form onSubmit={onSave} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Имя</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Иван"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Фамилия</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Иванов"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => onBlur("email")}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
                errors.email ? "border-red-500 dark:border-red-500 focus:ring-red-300" : "border-gray-300 dark:border-gray-600 focus:ring-blue-400"
              }`}
              placeholder="name@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Телефон</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => onBlur("phone")}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
                errors.phone ? "border-red-500 dark:border-red-500 focus:ring-red-300" : "border-gray-300 dark:border-gray-600 focus:ring-blue-400"
              }`}
              placeholder="+7 900 000-00-00"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Сохранить
          </button>
        </div>
        
      </form>
      
    </div>
  );
};

export default AccountPage;