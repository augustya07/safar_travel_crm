import React, { useState } from 'react';
import SightseeingPopup from './SightseeingPopup'; 
interface SightseeingCardProps {
  name: string;
  location: string;
  images: string[];
  description?: string;
  dayPlanId: string;
  id: string; // Assuming this is the sightseeing document ID
  itineraryId: string;
}

const SightseeingCard: React.FC<SightseeingCardProps> = ({
  name,
  location,
  images,
  description,
  dayPlanId,
  id,
  itineraryId,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Placeholder for the function that handles selecting a new sightseeing option
  const handleSelectSightseeing = async (sightseeing: any) => {
    console.log('Selected sightseeing:', sightseeing._id);
        
    // Define the URL for the PATCH request
    const url = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanId}/sightseeing/${id}`;

    // Create the request body
    const requestBody = {
        newSightseeingId: sightseeing._id
    };

    try {
        // Perform the PATCH request
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Include any additional headers here, like authorization headers if needed
            },
            body: JSON.stringify(requestBody)
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Update success:', data);

    } catch (error) {
        console.error('Failed to update sightseeing:', error);
        // Handle errors here, such as by showing an error message to the user
    }
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg mx-auto max-w-md bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-800 text-sm font-semibold">{location}</div>
          <button onClick={togglePopup} className="text-red-600 hover:text-red-800 text-sm font-semibold">Change Sightseeing</button>
        </div>
        <div className="mb-4">
          <div className="font-bold text-black text-lg">{name}</div>
          <div className="text-gray-600 text-sm">{description}</div>
        </div>
        {images && images[0] && (
          <div className="flex justify-center items-center">
            <img src={images[0]} alt="Sightseeing" className="max-h-40 max-w-full" />
          </div>
        )}
      </div>
      {isPopupOpen && <SightseeingPopup onClose={togglePopup} onSelectSightseeing={handleSelectSightseeing} />}
    </div>
  );
};

export default SightseeingCard;
