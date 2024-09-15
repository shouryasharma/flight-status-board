import { Flight } from '../types/Flight';
import { API_CONFIG } from '../utils/constants';

export const fetchFlights = async (): Promise<Flight[]> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/${API_CONFIG.FLIGHT_ENDPOINT}`);
  if (!response.ok) throw new Error('Failed to fetch flights');
  return response.json();
};

export const fetchFlightDetails = async (id: string): Promise<Flight> => {
  const response = await fetch(`${API_CONFIG.BASE_URL}/${API_CONFIG.FLIGHT_ENDPOINT}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch flight details');
  return response.json();
};
