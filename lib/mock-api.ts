import { HoroscopeApiResponse } from './types';
import mockData from './response.json';

/**
 * Mock service that returns a static horoscope response from response.json.
 * Used in development to avoid consuming API tokens.
 * Enable by setting NEXT_PUBLIC_USE_MOCK=true in .env
 */
export const getMockDailyHoroscope = async (
  _version: string,
  _sign: string,
  _date?: string
): Promise<HoroscopeApiResponse> => {
  // Simulate a small network delay for a more realistic dev experience
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockData as HoroscopeApiResponse;
};
