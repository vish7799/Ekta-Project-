export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://ekta-project-backend.onrender.com/api/v1';

export const resolveMediaUrl = (filePath) => {
  if (!filePath) return '';
  if (/^https?:\/\//i.test(filePath)) return filePath;
  const baseUrl = /^https?:\/\//i.test(API_BASE_URL)
    ? `${API_BASE_URL}/`
    : window.location.origin;
  return new URL(filePath, baseUrl).toString();
};

export const adminFetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('ekta_admin_token');

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('ekta_admin_token');
        localStorage.removeItem('ekta_admin_user');
      }

      throw new Error(data.message || 'API request failed.');
    }

    return data;
  } catch (error) {
    console.error(`[Admin API Error] ${endpoint}:`, error.message);
    throw error;
  }
};