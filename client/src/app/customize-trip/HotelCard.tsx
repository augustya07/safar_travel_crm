"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Hotel } from '@/types/itinerary';

interface HotelCardProps {
  hotel: Hotel;
  dayPlanId: string;
  itineraryId: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-400'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.396-.957 1.954-.957 2.35 0l1.615 3.916 4.33.315c1.04.075 1.456 1.347.704 2.037l-3.137 3.056.74 4.316c.17 1-.885 1.76-1.78 1.289L10 15.384l-3.871 2.172c-.895.471-1.95-.289-1.78-1.289l.74-4.316-3.137-3.056c-.752-.69-.336-1.962.704-2.037l4.33-.315 1.615-3.916z" />
        </svg>
      ))}
    </div>
  );
};

export default function HotelCard({ hotel, dayPlanId, itineraryId }: HotelCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const handleChangeHotel = async () => {
    // Implement your hotel change logic here
    console.log('Change hotel clicked');
  };

  const handleChangeRoom = () => {
    // Implement your room change logic here
    console.log('Change room clicked');
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg mx-auto max-w-md bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-800 text-sm">
            {hotel.location} | {hotel.roomInfo.numberOfRooms} Room | {hotel.roomInfo.guestsPerRoom} Adults
          </div>
          <button 
            onClick={handleChangeHotel}
            className="text-red-600 hover:text-red-800 text-sm font-semibold"
          >
            Change Hotel
          </button>
        </div>

        <div className="flex items-start">
          <div className="h-20 w-20 relative mr-4">
            {/* <Image
              src={hotel.imageUrl}
              alt={hotel.name}
              fill
              className="object-cover rounded-lg"
            /> */}
            <p> IMg</p>
          </div>
          
          <div>
            <div className="font-bold text-black text-lg mb-1">{hotel.name}</div>
            <StarRating rating={hotel.rating} />
            <div className="text-gray-600 text-sm mt-1">{hotel.roomInfo.type}</div>
            <div className="text-gray-600 text-sm">
              <span className="inline-block mr-2">{hotel.mealPlan}</span>
              {Object.entries(hotel.amenities)
                .filter(([_, value]) => value === true)
                .map(([key], index, arr) => (
                  <span key={key} className="capitalize">
                    {key}{index < arr.length - 1 ? ' | ' : ''}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-bold text-gray-800">
            ₹ {hotel.price.toLocaleString()}
            {hotel.originalPrice > hotel.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹ {hotel.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button 
            onClick={handleChangeRoom}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            Change Room
          </button>
        </div>
      </div>
    </div>
  );
}