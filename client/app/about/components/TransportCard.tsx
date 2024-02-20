import React, { useState } from 'react';
import TransportPopup from './TransportPopop';
interface TransportCardProps {
  type: string;
  route: {
    from: string;
    to: string;
  };
  price: number;
  frequency: string;
  dayPlanId: string;
  id:string;
  itineraryId: string;
}

const TransportCard: React.FC<TransportCardProps> = ({
  type,
  route,
  price,
  frequency,
  dayPlanId,
  id,
  itineraryId,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Placeholder for the function that handles selecting a transport option
  const handleSelectTransport = async (transport: any) => {
    console.log('Selected transport:', transport._id);
        
    // Define the URL for the PATCH request
    const url = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanId}/transport/${id}`;

    // Create the request body
    const requestBody = {
        newTransportId: transport._id
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
        console.error('Failed to update the hotel:', error);
        // Handle errors here, such as by showing an error message to the user
    }
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg mx-auto max-w-md bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-800 text-sm font-semibold">{`${route.from} to ${route.to}`}</div>
          <button onClick={togglePopup} className="text-red-600 hover:text-red-800 text-sm font-semibold">Change Transport</button>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-bold text-black text-lg">{type}</div>
          <div className="text-gray-600 text-sm">{`Frequency: ${frequency}`}</div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold text-gray-800">{`₹ ${price.toLocaleString()}`}</div>
        </div>
      </div>
      {isPopupOpen && <TransportPopup onClose={togglePopup} onSelectTransport={handleSelectTransport} />}
    </div>
  );
};

export default TransportCard;
