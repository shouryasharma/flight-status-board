import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFlights } from '../services/flightService';
import { Flight } from '../types/Flight';
import { STRINGS, API_CONFIG } from '../utils/constants';
import '../main.css';
import { formatDepartureTime } from '../utils/dateUtils';

const FlightBoard: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFlights();
        setFlights(data);

      } catch (err) {
        if (err instanceof Error) {
          console.error(STRINGS.FAILED_TO_LOAD_FLIGHT_DATA, err.message);
        } else {
          console.error(STRINGS.UNKNOWN_ERROR_OCCURED);
        }
        setError(STRINGS.FAILED_TO_LOAD_FLIGHT_DATA);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, API_CONFIG.FETCH_INTERVAL); // Every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="flight-board">
      <h2>Flight Status Board</h2>
      {flights.length === 0 ? (
        <p>{STRINGS.NO_FLIGHTS_AVAILABLE}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(flight => (
              <tr key={flight.id} onClick={() => navigate(`/flights/${flight.id}`)}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{formatDepartureTime(flight.departureTime)}</td>
                <td>{flight.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FlightBoard;
