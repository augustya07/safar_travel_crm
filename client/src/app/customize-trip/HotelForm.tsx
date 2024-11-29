"use client";

import { Hotel } from "@/types/itinerary";
import { useState } from "react";
import { updateHotel } from "./hotelActions";

interface ChangeHotelFormProps {
  itineraryId: string;
  dayPlanId: string;
  currentHotelId?: string;
  hotels: Hotel[];
}

export default function ChangeHotelForm({
  itineraryId,
  dayPlanId,
  currentHotelId,
  hotels,
}: ChangeHotelFormProps) {
  // Add state to track selected hotel
  const [selectedHotelId, setSelectedHotelId] = useState(currentHotelId);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdateHotel(formData: FormData) {
    try {
      setError(null);

      if (!selectedHotelId) {
        setError("Please select a hotel");
        return;
      }

      const updatedFormData = new FormData();
      updatedFormData.append("itineraryId", itineraryId);
      updatedFormData.append("dayPlanId", dayPlanId);
      updatedFormData.append("hotelId", selectedHotelId);
      updatedFormData.append("currentHotelId", currentHotelId || "");
      const result = await updateHotel(updatedFormData);

      if (!result.success) {
        setError(result.error || "Failed to update hotel");
        return;
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Update hotel error:", err);
    }
  }

  return (
    <form action={handleUpdateHotel} className="space-y-4">
      <input type="hidden" name="itineraryId" value={itineraryId} />
      <input type="hidden" name="dayPlanId" value={dayPlanId} />
      <input type="hidden" name="hotelId" value={selectedHotelId || ""} />

      {/* Hotels List */}
      <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
        {hotels.map((hotel) => (
          <label
            key={hotel._id}
            className={`
                relative flex border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors
                ${
                  hotel._id === selectedHotelId
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }
              `}
            onClick={() => setSelectedHotelId(hotel._id)}
          >
            <input
              type="radio"
              name="hotelSelection"
              value={hotel._id}
              checked={hotel._id === selectedHotelId}
              onChange={() => setSelectedHotelId(hotel._id)}
              className="sr-only"
            />
            <div className="flex gap-4 w-full">
              <div className="w-24 h-24 relative">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="object-cover rounded-lg w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: hotel.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{hotel.location}</p>
                <p className="text-sm text-gray-600">{hotel.mealPlan}</p>
                <p className="font-bold mt-2">
                  ₹{hotel.price.toLocaleString()}
                </p>
              </div>

              {/* Selection indicator */}
              <div
                className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 
                  ${
                    hotel._id === selectedHotelId
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
              >
                {hotel._id === selectedHotelId && (
                  <svg
                    className="w-full h-full text-white p-1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <button
          type="submit"
          disabled={!selectedHotelId}
          className={`px-4 py-2 rounded text-white
              ${
                selectedHotelId
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
        >
          {selectedHotelId ? "Update Hotel" : "Select a Hotel"}
        </button>
      </div>
    </form>
  );
}
