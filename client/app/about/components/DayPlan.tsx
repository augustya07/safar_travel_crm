"use client"

import HotelCard from "./HotelCard"

export default function DayPlan(props:any) {

    const {dayPlanData} = props


    console.log(dayPlanData)

    const hotelDetails = dayPlanData?.hotels?.[0];


  // Ensure hotelDetails is available before trying to render the HotelCard
  if (!hotelDetails) return <div>Loading...</div>;

  // Convert the itinerary data to props expected by HotelCard
  const hotelCardProps = {
    location: hotelDetails.location,
    dateRange: "2024-06-01 to 2024-06-10", // Example, adjust based on your logic
    numNights: 9, // Example, adjust based on your logic
    hotelName: hotelDetails.name,
    starRating: hotelDetails.rating,
    roomType: hotelDetails.roomInfo.type,
    roomDetails: ["Amenities: WiFi, Pool"], // Example, adjust based on your logic
    price: hotelDetails.price,
    imageUrl: hotelDetails.imageUrl,
  };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Day Plan: {dayPlanData.title}</h1>
        <p className="text-gray-600">{dayPlanData.description}</p>
        {/* Render the HotelCard component with the hotel's details */}
        <HotelCard {...hotelCardProps} />
        {/* Add additional components or details for transports, activities, etc., here */}
      </div>
      
    );
  }
  