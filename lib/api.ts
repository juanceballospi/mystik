import axios, { AxiosError } from 'axios';
import { HoroscopeApiResponse } from './types';

// Axios instance configured for the astrology API
const api = axios.create({
  baseURL: 'https://astro-api-1qnc.onrender.com/api',
  timeout: 10000,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
  },
});

/**
 * Fetches the daily horoscope for a given zodiac sign.
 * @param sign - Sign name (e.g. "aries", "taurus")
 * @param date - Optional date in YYYY-MM-DD format (defaults to today)
 */
export const getDailyHoroscope = async (
  version: string = "v2",
  sign: string,
  date?: string
): Promise<HoroscopeApiResponse> => {
  try {
    const params: Record<string, string> = { sign };
    if (date) params.date = date;

    const response = await api.get<HoroscopeApiResponse>(`/${version}/horoscope/daily/sign`, { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(
        axiosError.response?.status === 401
          ? 'Access denied: invalid or missing API Key.'
          : `Error fetching horoscope: ${axiosError.message}`
      );
    } else {
      throw new Error('An unexpected error occurred while contacting the astrology API.');
    }
  }
};

export default api;
