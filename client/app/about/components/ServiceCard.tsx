import React, { useState } from 'react';
import ServicePopup from './ServicePopup'; // This needs to be implemented similarly to TransportPopup

interface ServiceDuration {
  value: number;
  unit: 'Hour' | 'Day' | 'Night' | 'Week' | 'Month' | 'Year' | 'Per Session' | 'Per Person' | 'Per Couple';
}

interface ServiceCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  duration: ServiceDuration;
  location: string;
  isActive: boolean;
  serviceId: string; // Assume this is the unique identifier for the service
  dayPlanId: string;
  itineraryId: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  price,
  originalPrice,
  duration,
  location,
  isActive,
  serviceId,
  dayPlanId,
  itineraryId,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSelectService = async (selectedService: any) => {
    console.log('Selected service:', selectedService._id);
        
    const url = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayplan/${dayPlanId}/service/${serviceId}`;
    const requestBody = {
      newServiceId: selectedService._id
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
      console.log('Service update success:', data);
    } catch (error) {
      console.error('Failed to update the service:', error);
    }
  };

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className={`border rounded-lg overflow-hidden shadow-lg mx-auto max-w-md bg-white ${!isActive ? 'opacity-50' : ''}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{name}</h3>
          <button onClick={togglePopup} className="text-red-600 hover:text-red-800 text-sm font-semibold">
            Change Service
          </button>
        </div>
        <p className="text-sm text-gray-500">{`${duration.value} ${duration.unit}${duration.value > 1 ? 's' : ''}`}</p>
        <div className="mt-2">
          <div className="font-bold">₹{price.toLocaleString()}</div>
          {originalPrice && originalPrice > price && (
            <div className="text-sm text-red-500">
              <span className="line-through">₹{originalPrice.toLocaleString()}</span> Special Offer!
            </div>
          )}
        </div>
        <div className="mt-2 text-gray-800">{location}</div>
        {!isActive && <div className="mt-2 text-red-600 font-semibold">Not Available</div>}
      </div>
      {isPopupOpen && <ServicePopup onClose={togglePopup} onSelectService={handleSelectService} />}
    </div>
  );
};

export default ServiceCard;
