import React from 'react'
import ItineraryPage from './components/temp_page'

const fetchItineraryData = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/v1/itineraries/65cc9d7e36cc1a719d95350b');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching itinerary data:", error);
      throw error; // Rethrow to handle it in the calling context
    }
  };

const page = async () => {
    const data = await fetchItineraryData()

  return (
    <ItineraryPage/>
  )
}

export default page