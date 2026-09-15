import React, { createContext, useState, useEffect, useContext } from 'react';
import { adminFetchApi } from '../api/adminApiClient';

const AuthContext = createContext(null);
const INACTIVITY_TIMEOUT_MS = 35 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ekta_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ekta_admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      adminFetchApi('/auth/me')
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem('ekta_admin_user', JSON.stringify(res.data.user));
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return undefined;

    let inactivityTimer;
    let activityThrottleTimer;

    const scheduleLogout = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        logout();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const handleActivity = () => {
      if (activityThrottleTimer) return;

      activityThrottleTimer = window.setTimeout(() => {
        activityThrottleTimer = undefined;
        scheduleLogout();
      }, 1000);
    };

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, handleActivity));
    scheduleLogout();

    return () => {
      window.clearTimeout(inactivityTimer);
      window.clearTimeout(activityThrottleTimer);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, handleActivity));
    };
  }, [token]);

  const login = async (email, password) => {
    const res = await adminFetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const { token: newToken, user: newUser } = res.data;
    localStorage.setItem('ekta_admin_token', newToken);
    localStorage.setItem('ekta_admin_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('ekta_admin_token');
    localStorage.removeItem('ekta_admin_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, logout }}>
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
