// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('emovia_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure no legacy test credentials (e.g. 'Aarav') persist by default
        if (parsed?.name && parsed.name.toLowerCase().includes('aarav')) {
          localStorage.removeItem('emovia_user');
          return null;
        }
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState('/');
  const [loginPromptMessage, setLoginPromptMessage] = useState('');

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem('emovia_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.name && parsed.name.toLowerCase().includes('aarav')) {
            localStorage.removeItem('emovia_user');
            setUser(null);
            return;
          }
          setUser(parsed);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (username) => {
    const displayName = (username && username.trim()) ? username.trim() : 'Mindful User';
    const userData = {
      name: displayName,
      isGuest: false,
      loginAt: new Date().toISOString()
    };
    localStorage.setItem('emovia_user', JSON.stringify(userData));
    setUser(userData);
    setIsLoginModalOpen(false);
    return userData;
  };

  const loginAsGuest = () => {
    const guestData = {
      name: 'Guest Explorer',
      isGuest: true,
      loginAt: new Date().toISOString()
    };
    localStorage.setItem('emovia_user', JSON.stringify(guestData));
    setUser(guestData);
    setIsLoginModalOpen(false);
    return guestData;
  };

  const logout = () => {
    localStorage.removeItem('emovia_user');
    setUser(null);
  };

  const openLoginModal = (targetPath = '/', promptMessage = '') => {
    setRedirectAfterLogin(targetPath);
    setLoginPromptMessage(promptMessage);
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginPromptMessage('');
  };

  // isMember is true ONLY if user logged in with credentials (not guest)
  const isMember = Boolean(user && !user.isGuest);
  const isGuest = Boolean(user && user.isGuest);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        isMember,
        isGuest,
        login,
        loginAsGuest,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        redirectAfterLogin,
        loginPromptMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
