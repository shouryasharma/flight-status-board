import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFlightDetails } from '../services/flightService';
import { Flight } from '../types/Flight';
import '../main.css';
import { STRINGS } from '../utils/constants';

const FlightDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFlightDetails(id!);
        setFlight(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error(STRINGS.FAILED_TO_LOAD_FLIGHT_DATA, err.message);
        } else {
          console.error(STRINGS.UNKNOWN_ERROR_OCCURED);
        }
        setError(STRINGS.FAILED_TO_LOAD_FLIGHT_DETAILS);
      }
    };

    fetchData();
  }, [id]);

  if (error) return <p>{error}</p>;

  if (!flight) return <p>Loading...</p>;

  return (
    <div className="flight-details">
      <h2>Flight: {flight.flightNumber}</h2>
      <a className='back' onClick={handleBack}>Goto Flight Board</a>
      <p><strong>Airline:</strong> {flight.airline}</p>
      <p><strong>Origin:</strong> {flight.origin}</p>
      <p><strong>Destination:</strong> {flight.destination}</p>
      <p><strong>Departure Time:</strong> {flight.departureTime}</p>
      <p><strong>Status:</strong> {flight.status}</p>
    </div>
  );
};

export default FlightDetails;
