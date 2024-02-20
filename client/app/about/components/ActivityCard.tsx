import React, { useState } from 'react';
import ActivityPopup from './ActivityPopup'; 
interface ActivityProps {
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  deal?: string;
  location: string;
  isActive: boolean;
  activityId: string; 
  dayPlanId: string;
  itineraryId: string;
}

const ActivityCard: React.FC<ActivityProps> = ({
  name,
  type,
  price,
  originalPrice,
  deal,
  location,
  isActive,
  activityId,
  dayPlanId,
  itineraryId,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Calculate the discount if originalPrice is provided and is greater than the sale price
  const hasDiscount = !!originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleSelectActivity = async (selectedActivity: any) => {
    console.log('Selected activity:', selectedActivity._id);
        
    const url = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanId}/activity/${activityId}`;
    const requestBody = {
        newActivityId: selectedActivity._id
    };

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Activity update success:', data);
    } catch (error) {
        console.error('Failed to update the activity:', error);
    }
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className={`border rounded-lg overflow-hidden shadow-lg mx-auto max-w-md bg-white ${!isActive ? 'opacity-50' : ''}`}>
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-500">{type}</p>
        <div className="mt-2">
          {hasDiscount && (
            <div className="text-red-500 text-sm">
              <span className="line-through">₹{originalPrice?.toLocaleString()}</span>
              {' '}→{' '}
              <span className="font-bold">₹{price.toLocaleString()}</span>
              {' '}({discountPercentage}% off)
            </div>
          )}
          {!hasDiscount && (
            <div className="font-bold">₹{price.toLocaleString()}</div>
          )}
          {deal && deal !== 'No deal' && (
            <div className="mt-1 text-green-600 text-sm">{deal}</div>
          )}
        </div>
        <div className="mt-2 text-gray-800">{location}</div>
        {!isActive && (
          <div className="mt-2 text-red-600 font-semibold">Not Available</div>
        )}
        <button onClick={togglePopup} className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-semibold">
          Change Activity
        </button>
      </div>
      {isPopupOpen && <ActivityPopup onClose={togglePopup} onSelectActivity={handleSelectActivity} />}
    </div>
  );
};

export default ActivityCard;
