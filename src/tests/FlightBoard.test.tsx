import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlightBoard from '../components/FlightBoard';
import { fetchFlights } from '../services/flightService';
import { vi } from 'vitest';
import { STRINGS } from '../utils/constants';

// Mock fetchFlights function
vi.mock('../services/flightService', () => ({
  fetchFlights: vi.fn(),
}));

describe('FlightBoard', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders flight table with data', async () => {
    const mockFlights = [
      {
        id: '1',
        flightNumber: 'AA123',
        airline: 'American Airlines',
        origin: 'JFK',
        destination: 'LAX',
        departureTime: '2024-09-15T10:00:00Z',
        status: 'On Time',
      },
    ];

    (fetchFlights as vi.MockedFunction<typeof fetchFlights>).mockResolvedValue(mockFlights);

    render(
      <MemoryRouter>
        <FlightBoard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('AA123')).toBeInTheDocument();
    });
  });

  test('handles empty flight list', async () => {
    (fetchFlights as vi.MockedFunction<typeof fetchFlights>).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <FlightBoard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(STRINGS.NO_FLIGHTS_AVAILABLE)).toBeInTheDocument();
    });
  });

  test('handles malformed flight data', async () => {
    (fetchFlights as vi.MockedFunction<typeof fetchFlights>).mockResolvedValue([
      {
        id: '1',
        flightNumber: '',
        airline: 'Unknown',
        origin: 'Unknown',
        destination: 'Unknown',
        departureTime: 'Invalid Date', // Match this with what is rendered
        status: 'Unknown',
      },
    ]);

    render(
      <MemoryRouter>
        <FlightBoard />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Check if all occurrences of "Unknown" are present
      const unknownCells = screen.getAllByText('Unknown');
      expect(unknownCells).toHaveLength(4); // Adjust based on actual output

      // Check if the malformed departure time is present
      expect(screen.getByText('Invalid Date')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    (fetchFlights as vi.MockedFunction<typeof fetchFlights>).mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter>
        <FlightBoard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(STRINGS.FAILED_TO_LOAD_FLIGHT_DATA)).toBeInTheDocument();
    });
  });
});