// components/DayPlan.js
"use client"

import useItineraryStore from "../../store/itineraryStore";
import HotelCard from "./HotelCard"

export default function DayPlan() {

    const itinerary = useItineraryStore((state:any) => state.itinerary);

  // Extract the first hotel details from the itinerary data
  const hotelDetails = itinerary?.dayPlans?.[0]?.items?.find(item => item.itemType === 'Hotel')?.details;

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
        <div className="mb-4">
          <h1 className="text-xl font-bold">Day Plan</h1>
          <p className="text-gray-600">Day 1 - Maldives: Leisure day</p>
        </div>
      
        <div className="mb-6">
          <HotelCard {...hotelCardProps} />
      
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Sightseeing</h3>
              <button className="text-blue-500 hover:text-blue-600">Change Activity</button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-sm font-medium">Alcazar Show Normal Seat</span>
                </div>
                <div className="flex mt-2">
                  <button className="mr-2 text-sm bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600">Ticket Only</button>
                  <button className="mr-2 text-sm border border-blue-500 text-blue-500 py-1 px-2 rounded hover:bg-blue-50">Private</button>
                  <button className="text-sm border border-blue-500 text-blue-500 py-1 px-2 rounded hover:bg-blue-50">SIC</button>
                </div>
              </div>
              <span className="text-lg font-semibold">THB 1,962</span>
            </div>
          </div>
      
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Additional Services</h3>
              <button className="text-blue-500 hover:text-blue-600">Change Services</button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2 text-sm font-medium">Alcazar Show Normal Seat</span>
                </div>
              </div>
              <span className="text-lg font-semibold">INR 1,962</span>
            </div>
          </div>
        </div>
      
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add day</button>
        </div>
      </div>
      
    );
  }
  