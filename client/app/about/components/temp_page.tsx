// pages/index.js or pages/[itinerary].js
"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import DayPlan from './DayPlan';
import AddDayPlanForm from './AddDayPlan';

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

export default function ItineraryPage() {
  // const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [itinerary,setItinerary] = useState([])

  const loadItinerary = async () => {
    setLoading(true);
    try {
      const data = await fetchItineraryData();
      setItinerary(data);
    } catch (error) {
      // Handle error, e.g., set an error message state to display to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItinerary();
  }, []);

  const handleAddSuccess = () => {
    console.log('Day plan added successfully');
    setShowForm(false);
    loadItinerary(); // Refresh data to include the new day plan
  };

  if (loading) return <div>Loading...</div>;
  if (!itinerary) return <div>No itinerary data found.</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Itinerary Details</title>
      </Head>
      <main className="max-w-4xl mx-auto pt-8">
        {itinerary?.dayPlans?.map((dayPlan, index) => (
          <DayPlan key={dayPlan._id || index} dayPlanData={dayPlan} itineraryId={itinerary._id} />
        ))}
        <div className="flex justify-center mt-4">
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {showForm ? 'Cancel' : 'Add Day Plan'}
          </button>
        </div>
        {showForm && (
          <AddDayPlanForm
            itineraryId={itinerary._id}
            onAddSuccess={handleAddSuccess}
            onClose={() => setShowForm(false)}
          />
        )}
      </main>
    </div>
  );
}
