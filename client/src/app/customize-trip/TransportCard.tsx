"use client";

import React from "react";
import { Transport } from "@/types/itinerary";
import ChangeTransportButton from "./ChangeTransportButton";

interface TransportCardProps {
  transport: Transport;
  dayPlanId: string;
  itineraryId: string;
  transports: Transport[];
}

const TransportIcon: React.FC<{ type: string }> = ({ type }) => {
  // Add icons for different transport types
  const icons = {
    train: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
    bus: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v3a2 2 0 002 2h2m10-7v8a2 2 0 01-2 2h-6" />
      </svg>
    ),
    flight: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    car: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    default: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  };

  return (
    <div className="text-gray-600">
      {icons[type.toLowerCase() as keyof typeof icons] || icons.default}
    </div>
  );
};

export default function TransportCard({
  transport,
  dayPlanId,
  itineraryId,
  transports,
}: TransportCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg mx-auto max-w-md bg-white">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <TransportIcon type={transport.type} />
            <span className="text-gray-800 font-medium">{transport.type}</span>
          </div>
          <ChangeTransportButton
            itineraryId={itineraryId}
            dayPlanId={dayPlanId}
            currentTransportId={transport._id}
            transports={transports}
          >
            Change Transport
          </ChangeTransportButton>
        </div>

        <div className="space-y-3">
          {/* Route Information */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{transport.route.from}</p>
                  <p className="text-sm text-gray-500">{transport.departureTime}</p>
                </div>
                <div className="flex-1 mx-4 border-t-2 border-dashed relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                    <span className="text-gray-400 text-sm">{transport.duration}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{transport.route.to}</p>
                  <p className="text-sm text-gray-500">{transport.arrivalTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {transport.class && (
              <div>
                <span className="text-gray-500">Class:</span>
                <span className="ml-2 font-medium">{transport.class}</span>
              </div>
            )}
            {transport.operator && (
              <div>
                <span className="text-gray-500">Operator:</span>
                <span className="ml-2 font-medium">{transport.operator}</span>
              </div>
            )}
          </div>

          {/* Price Information */}
          <div className="flex justify-between items-center pt-3 border-t">
            <div>
              {transport.bookingStatus && (
                <span className={`
                  px-2 py-1 rounded-full text-xs
                  ${transport.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-800' : 
                    transport.bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}
                `}>
                  {transport.bookingStatus.charAt(0).toUpperCase() + transport.bookingStatus.slice(1)}
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-800">
                ₹{transport.price.toLocaleString()}
              </p>
              {transport.originalPrice && transport.originalPrice > transport.price && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{transport.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}