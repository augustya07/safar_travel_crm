// pages/index.js or pages/[itinerary].js
"use client"

import Head from 'next/head';
import DayPlan from './components/DayPlan';
import useItineraryStore from "../store/itineraryStore"

async function  getData() {
  const res = await fetch('http://localhost:4000/api/v1/itineraries/65cc9d7e36cc1a719d95350b')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
 
  return res.json()
}

export default async function ItineraryPage() {
  const setItinerary = useItineraryStore((state:any) => state.setItinerary);

  const data = await getData();
  setItinerary(data); // Update the store with the fetched data


  return (
    <div>
      <Head>
        <title>Itinerary Details</title>
      </Head>

      {/* Main content */}
      <main>
        <DayPlan />
        {/* You can repeat <DayPlan /> for each day or pass day-specific props */}
      </main>
    </div>
  );
}
