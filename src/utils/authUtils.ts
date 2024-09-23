import axios from 'axios';
import { message } from 'antd';

/**
 * Refresh the authentication token using the refresh token.
 * @returns {Promise<string | undefined>} Returns the new access token or redirects to login on failure.
 */

export const refreshAuthToken = async (): Promise<string | undefined> => {
  const refreshToken = sessionStorage.getItem('refresh_token');
  if (refreshToken) {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/api/`, {
        refresh: refreshToken,
      });
      const { access } = response.data;
      sessionStorage.setItem('access_token', access);
      return access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      sessionStorage.clear();
      message.error('Session expired. Please log in again.');
      window.location.href = '/users/login'; // Redirect to login page
    }
  } else {
    sessionStorage.clear();
    message.error('Session expired. Please log in again.');
    window.location.href = '/users/login'; // Redirect to login page
  }
};