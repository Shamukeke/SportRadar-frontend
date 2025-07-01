import axios from 'axios';

export const refreshAccessToken = async (): Promise<string | null> => {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) return null;

  try {
    const res = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh,
    });

    const newAccess = res.data.access;
    localStorage.setItem('access', newAccess);
    return newAccess;
  } catch (err) {
    console.error('Refresh token invalide ou expiré');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    return null;
  }
};
