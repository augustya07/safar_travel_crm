"use client";

import { Sightseeing } from "@/types/itinerary";
import { useState } from "react";
import { updateSightseeing } from "./sightseeingActions";

interface ChangeSightseeingFormProps {
  itineraryId: string;
  dayPlanId: string;
  currentSightseeingId?: string;
  sightseeings: Sightseeing[];
}

export default function ChangeSightseeingForm({
  itineraryId,
  dayPlanId,
  currentSightseeingId,
  sightseeings,
}: ChangeSightseeingFormProps) {
  const [selectedSightseeingId, setSelectedSightseeingId] = useState(currentSightseeingId);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdateSightseeing(formData: FormData) {
    try {
      setError(null);

      if (!selectedSightseeingId) {
        setError("Please select a sightseeing location");
        return;
      }

      const updatedFormData = new FormData();
      updatedFormData.append("itineraryId", itineraryId);
      updatedFormData.append("dayPlanId", dayPlanId);
      updatedFormData.append("sightseeingId", selectedSightseeingId);
      updatedFormData.append("currentSightseeingId", currentSightseeingId || "");
      
      const result = await updateSightseeing(updatedFormData);

      if (!result.success) {
        setError(result.error || "Failed to update sightseeing");
        return;
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Update sightseeing error:", err);
    }
  }

  return (
    <form action={handleUpdateSightseeing} className="space-y-4">
      <input type="hidden" name="itineraryId" value={itineraryId} />
      <input type="hidden" name="dayPlanId" value={dayPlanId} />
      <input type="hidden" name="sightseeingId" value={selectedSightseeingId || ""} />

      <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
        {sightseeings.map((sightseeing) => (
          <label
            key={sightseeing._id}
            className={`
              relative flex border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors
              ${sightseeing._id === selectedSightseeingId ? "border-blue-500 bg-blue-50" : "border-gray-200"}
            `}
            onClick={() => setSelectedSightseeingId(sightseeing._id)}
          >
            <input
              type="radio"
              name="sightseeingSelection"
              value={sightseeing._id}
              checked={sightseeing._id === selectedSightseeingId}
              onChange={() => setSelectedSightseeingId(sightseeing._id)}
              className="sr-only"
            />
            <div className="flex gap-4 w-full">
              {sightseeing.images && sightseeing.images.length > 0 && (
                <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                  {/* <Image
                    src={sightseeing.images[0]}
                    alt={sightseeing.name}
                    fill
                    className="object-cover"
                  /> */}
                  <p> Imh</p>
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{sightseeing.name}</h3>
                <p className="text-sm text-gray-600">{sightseeing.location}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {sightseeing.description}
                </p>
              </div>
            </div>

            {/* Selection indicator */}
            <div
              className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 
                ${sightseeing._id === selectedSightseeingId ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
            >
              {sightseeing._id === selectedSightseeingId && (
                <svg className="w-full h-full text-white p-1" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                  />
                </svg>
              )}
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <button
          type="submit"
          disabled={!selectedSightseeingId}
          className={`px-4 py-2 rounded text-white
            ${selectedSightseeingId ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {selectedSightseeingId ? "Update Sightseeing" : "Select a Location"}
        </button>
      </div>
    </form>
  );
}