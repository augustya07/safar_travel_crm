import React, { useState } from 'react';
import HotelCard from "./HotelCard";
import ChangeHotelPopup from "./ChangeHotelPopup"; // Adjust import path as necessary

export default function DayPlan({ dayPlanData, itineraryId }) {
    const [showChangeHotelPopup, setShowChangeHotelPopup] = useState(false);
    const hotelDetails = dayPlanData?.hotels?.[0];

    const handleSelectHotel = async (hotel) => {
        const apiUrl = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanData._id}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST', // Use POST or the correct HTTP method as per your API specification
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hotelId: hotel._id }), // Send the selected hotel's ID in the body
            });
            if (!response.ok) {
                throw new Error('Failed to update day plan with the selected hotel');
            }
            // Handle successful update here, e.g., refreshing data or showing a success message
            alert('Hotel added successfully to the day plan');
            setShowChangeHotelPopup(false); // Close the popup
        } catch (error) {
            console.error('Error updating day plan with the selected hotel:', error);
            alert(error.message);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h1 className="text-xl font-bold mb-4">Day Plan: {dayPlanData.title}</h1>
            <p className="text-gray-600 mb-4">{dayPlanData.description}</p>
            
            {hotelDetails ? (
                <HotelCard
                    location={hotelDetails.location}
                    dateRange="2024-06-01 to 2024-06-10"
                    numNights={9}
                    hotelName={hotelDetails.name}
                    starRating={hotelDetails.rating}
                    roomType={hotelDetails.roomInfo.type}
                    roomDetails={["Amenities: WiFi, Pool"]}
                    price={hotelDetails.price}
                    imageUrl={hotelDetails.imageUrl}
                    id={hotelDetails._id}
                    dayPlanId={dayPlanData._id}
                    itineraryId={itineraryId}
                />
            ) : (
                <button onClick={() => setShowChangeHotelPopup(true)} className="text-blue-500 hover:text-blue-700">
                    Add Hotel
                </button>
            )}

            {showChangeHotelPopup && (
                <ChangeHotelPopup onClose={() => setShowChangeHotelPopup(false)} onSelectHotel={handleSelectHotel} />
            )}
        </div>
    );
}
