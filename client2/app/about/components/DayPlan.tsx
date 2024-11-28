import React, { useState } from 'react';
import HotelCard from "./HotelCard";
import ChangeHotelPopup from "./ChangeHotelPopup";
import TransportCard from './TransportCard';
import TransportPopup from './TransportPopup';
import ActivityPopup from './ActivityPopup';
import ServicePopup from './ServicePopup';
import SightseeingPopup from './SightseeingPopup';
import ActivityCard from './ActivityCard';
import ServiceCard from './ServiceCard';
import SightseeingCard from './SightseeingCard';

export default function DayPlan({ dayPlanData, itineraryId }) {
    const [showChangeHotelPopup, setShowChangeHotelPopup] = useState(false);
    const [showChangeTransportPopup, setShowChangeTransportPopup] = useState(false);
    const [showChangeActivityPopup, setShowChangeActivityPopup] = useState(false);
    const [showChangeSightseeingPopup, setShowChangeSightseeingPopup] = useState(false);
    const [showChangeServicePopup, setShowChangeServicePopup] = useState(false);

    const hotelDetails = dayPlanData?.hotels?.[0];
    const transportDetails = dayPlanData?.transports?.[0];
    const activityDetails = dayPlanData?.activities?.[0];
    const sightseeingDetails = dayPlanData?.sightseeing?.[0];
    const serviceDetails = dayPlanData?.services?.[0];

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

    const handleSelectTransport = async (transport) => {
        const apiUrl = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanData._id}/transport`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST', // Adjust if necessary based on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transportId: transport._id }), // Send the selected transport's ID
            });
            if (!response.ok) {
                throw new Error('Failed to update day plan with the selected transport');
            }
            // Handle successful update here
            alert('Transport added successfully to the day plan');
            setShowChangeTransportPopup(false); // Close the popup
        } catch (error) {
            console.error('Error updating day plan with the selected transport:', error);
            alert(error.message);
        }
    };

    const handleSelectActivity = async (activity) => {
        const apiUrl = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanData._id}/activity`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST', // Adjust based on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activityId: activity._id }), // Adjust the payload as necessary
            });
            if (!response.ok) {
                throw new Error('Failed to update day plan with the selected activity');
            }
            alert('Activity added successfully to the day plan');
            setShowChangeActivityPopup(false); // Close the popup
        } catch (error) {
            console.error('Error updating day plan with the selected activity:', error);
            alert(error.message);
        }
    };

    const handleSelectSightseeing = async (sightseeing) => {
        const apiUrl = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanData._id}/sightseeing`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST', // Adjust if necessary based on your API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sightseeingId: sightseeing._id }), // Ensure this matches your backend API's expected payload
            });
            if (!response.ok) {
                throw new Error('Failed to update day plan with the selected sightseeing');
            }
            alert('Sightseeing added successfully to the day plan');
            setShowChangeSightseeingPopup(false); // Close the popup after successful operation
        } catch (error) {
            console.error('Error updating day plan with the selected sightseeing:', error);
            alert(error.message);
        }
    };

    const handleSelectService = async (service) => {
        const apiUrl = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanData._id}/service`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST', // This method could be different based on your API, e.g., PATCH or PUT
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ serviceId: service._id }), // Adjust to fit the expected payload for your backend API
            });
            if (!response.ok) {
                throw new Error('Failed to update day plan with the selected service');
            }
            alert('Service added successfully to the day plan');
            setShowChangeServicePopup(false); // Close the popup after successful operation
        } catch (error) {
            console.error('Error updating day plan with the selected service:', error);
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

            {transportDetails ? (
                <TransportCard
                    type={transportDetails.type}
                    route={transportDetails.route}
                    price={transportDetails.price}
                    frequency={transportDetails.frequency}
                    dayPlanId={dayPlanData._id}
                    id={transportDetails._id}
                    itineraryId={itineraryId}
                // Pass other props as needed
                />
            ) : (
                <button onClick={() => setShowChangeTransportPopup(true)} className="text-blue-500 hover:text-blue-700">
                    Add Transport
                </button>
            )}

            {activityDetails ? (
                <ActivityCard
                    name={activityDetails.name}
                    type={activityDetails.type}
                    price={activityDetails.price}
                    originalPrice={activityDetails.originalPrice} // This is optional
                    deal={activityDetails.deal} // This is optional
                    location={activityDetails.location}
                    isActive={activityDetails.isActive}
                    activityId={activityDetails._id}
                    dayPlanId={dayPlanData._id}
                    itineraryId={itineraryId}
                />
            ) : (
                <button onClick={() => setShowChangeActivityPopup(true)} className="text-blue-500 hover:text-blue-700">
                    Add Activity
                </button>
            )}

            {sightseeingDetails ? (
                <SightseeingCard
                    name={sightseeingDetails.name}
                    location={sightseeingDetails.location}
                    images={sightseeingDetails.images} // Assuming images is an array of image URLs
                    description={sightseeingDetails.description} // This is optional
                    dayPlanId={dayPlanData._id}
                    id={sightseeingDetails._id}
                    itineraryId={itineraryId}
                />
            ) : (
                <button onClick={() => setShowChangeSightseeingPopup(true)} className="text-blue-500 hover:text-blue-700">
                    Add Sightseeing
                </button>
            )}

            {serviceDetails ? (
                <ServiceCard
                    name={serviceDetails.name}
                    price={serviceDetails.price}
                    originalPrice={serviceDetails.originalPrice} // This is optional
                    duration={serviceDetails.duration} // Assuming duration is an object with value and unit
                    location={serviceDetails.location}
                    isActive={serviceDetails.isActive}
                    serviceId={serviceDetails._id}
                    dayPlanId={dayPlanData._id}
                    itineraryId={itineraryId}
                />
            ) : (
                <button onClick={() => setShowChangeServicePopup(true)} className="text-blue-500 hover:text-blue-700">
                    Add Service
                </button>
            )}

            {/* Popup components for changing hotel, transport, activity, sightseeing, and service */}
            {showChangeHotelPopup && (
                <ChangeHotelPopup onClose={() => setShowChangeHotelPopup(false)} onSelectHotel={handleSelectHotel} />
            )}
            {showChangeTransportPopup && (
                <TransportPopup onClose={() => setShowChangeTransportPopup(false)} onSelectTransport={handleSelectTransport} />
            )}
            {showChangeActivityPopup && (
                <ActivityPopup onClose={() => setShowChangeActivityPopup(false)} onSelectActivity={handleSelectActivity} />
            )}
            {showChangeSightseeingPopup && (
                <SightseeingPopup onClose={() => setShowChangeSightseeingPopup(false)} onSelectSightseeing={handleSelectSightseeing} />
            )}
            {showChangeServicePopup && (
                <ServicePopup onClose={() => setShowChangeServicePopup(false)} onSelectService={handleSelectService} />
            )}

        </div>
    );
}
