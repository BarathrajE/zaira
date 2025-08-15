/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';
import { Store } from './store';
import { setError } from './reducer/errorSlice';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const apiRequest = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' = 'GET',
  body?: any,
  authRequired: boolean = true,
  noCache: boolean = true // 🚀 Added optional flag
) => {
  try {
    const token = Cookies.get('token');
    console.log('Token:', token);

    const isFormData = body instanceof FormData;
    const headers: HeadersInit = {
      Accept: 'application/json',
      ...(authRequired && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' })
    };

    // 🚀 Append timestamp param to avoid caching
    let url = `${API_BASE_URL}${endpoint}`;
    if (noCache) {
      const separator = url.includes('?') ? '&' : '?';
      url += `${separator}ts=${Date.now()}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      cache: 'no-store', // 🚀 Next.js "always fresh"
      ...(method !== 'GET' && method !== 'HEAD' && body
        ? { body: isFormData ? body : JSON.stringify(body) }
        : {})
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API Error ${response.status}: ${errorMessage}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('API Request Failed:', error.message);
    Store.dispatch(setError(error.message || 'An unexpected error occurred'));
    throw error;
  }
};

