import axios, { AxiosError } from 'axios';
import { HoroscopeApiResponse } from './types';
import { getMockDailyHoroscope } from './mock-api';

// Axios instance configured for the astrology API
const api = axios.create({
  baseURL: 'https://astro-api-1qnc.onrender.com/api',
  timeout: 10000,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
  },
});

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

/**
 * Fetches the daily horoscope for a given zodiac sign.
 * @param version - API version (e.g. "v2")
 * @param sign - Sign name (e.g. "aries", "taurus")
 * @param date - Optional date in YYYY-MM-DD format (defaults to today)
 *
 * When NEXT_PUBLIC_USE_MOCK=true the request is intercepted and the local
 * response.json is returned instead, preserving API tokens in development.
 */
export const getDailyHoroscope = async (
  version: string = "v2",
  sign: string,
  date?: string
): Promise<HoroscopeApiResponse> => {
  if (USE_MOCK) {
    console.log('[mock-api] Returning mock horoscope data (NEXT_PUBLIC_USE_MOCK=true)');
    return getMockDailyHoroscope(version, sign, date);
  }

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
