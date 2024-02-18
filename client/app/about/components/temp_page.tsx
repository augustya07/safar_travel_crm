// pages/index.js or pages/[itinerary].js
"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import DayPlan from './DayPlan'; // Ensure this path is correct based on your file structure

// You can keep the getData function as it is or integrate it directly into the useEffect hook
async function getData() {
  const res = await fetch('http://localhost:4000/api/v1/itineraries/65cc9d7e36cc1a719d95350b');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function ItineraryPage() {
  // Using useState to hold the fetched itinerary data
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true); // To manage loading state

  useEffect(() => {
    (async () => {
      try {
        const data = await getData();
        setItinerary(data); // Set the fetched data into state
        setLoading(false); // Update loading state
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
        setLoading(false); // Ensure loading state is updated even if there's an error
      }
    })();
  }, [loading]);


  if (loading) return <div>Loading...</div>; // Show loading indicator while data is being fetched

  if (!itinerary) return <div>No itinerary data found.</div>; // Fallback content if no data is available

  // console.log(itinerary.dayPlans.map((dayPlan)))

  return (
    <div>
      <Head>
        <title>Itinerary Details</title>
      </Head>

      {/* Main content */}
      <main>
        {itinerary?.dayPlans?.map((dayPlan:any, index:any) => (
          <DayPlan key={index} dayPlanData={dayPlan} />
        ))}
      </main>
    </div>
  );
}
