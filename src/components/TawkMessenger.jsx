import { useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';

const TawkMessenger = () => {
  const { isChatVisible } = useChat();

  useEffect(() => {

    if (window.Tawk_API) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/68dc17669a315e19556a85d5/1j6drmqu3';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.head.appendChild(s1);

    window.Tawk_API.onLoad = function () {
      if (!isChatVisible && window.Tawk_API?.hideWidget) {
        window.Tawk_API.hideWidget();
      }
    };
  }, []);

  // Управление видимостью
  useEffect(() => {
    if (!window.Tawk_API) return;

    if (isChatVisible) {
      window.Tawk_API.showWidget?.();
    } else {
      window.Tawk_API.hideWidget?.();
    }
  }, [isChatVisible]);

  return null;
};

export default TawkMessenger;
