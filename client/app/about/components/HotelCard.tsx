"use client"

import React, { useState } from 'react';
import ChangeHotelPopup from './ChangeHotelPopup'

interface HotelCardProps {
  location: string;
  dateRange: string;
  numNights: number;
  hotelName: string;
  starRating: number;
  roomType: string;
  roomDetails: string[];
  price: number;
  imageUrl: string;
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

const HotelCard: React.FC<HotelCardProps> = ({
  location,
  dateRange,
  numNights,
  hotelName,
  starRating,
  roomType,
  roomDetails,
  price,
  imageUrl,
}) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    const handleSelectHotel = (hotel: any) => {
        console.log('Selected hotel:', hotel);
        // TODO: Update state or perform actions based on the selected hotel
      };

    return (
<>
  <div className="border rounded-lg overflow-hidden shadow-lg mx-auto max-w-md bg-white">
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-800 text-sm">{location} | {dateRange} | {numNights} Nights</div>
        <button onClick={togglePopup} className="text-red-600 hover:text-red-800 text-sm font-semibold">Change Hotel</button>
      </div>
      <div className="flex items-start">
        <img className="h-20 w-20 object-cover rounded-lg mr-4" src={imageUrl} alt={hotelName} />
        <div>
          <div className="font-bold text-black text-lg mb-1">{hotelName}</div>
          <StarRating rating={starRating} />
          <div className="text-gray-600 text-sm mt-1">{roomType}</div>
          <div className="text-gray-600 text-sm">
            {roomDetails?.map((detail, index) => (
              <span key={index} className="inline-block after:content-['|'] last:after:content-[''] mr-1">
                {detail}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-lg font-bold text-gray-800">{`₹ ${price.toLocaleString()}`}</div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">Change Room</button>
      </div>
    </div>
    {isPopupOpen && <ChangeHotelPopup onClose={togglePopup}  onSelectHotel={handleSelectHotel}
 />}
  </div>
  </>
    )}


export default HotelCard;
