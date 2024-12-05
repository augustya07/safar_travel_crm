"use client";

import { Transport } from "@/types/itinerary";
import { useState } from "react";
import { addTransport, updateTransport } from "./transportActions";

interface ChangeTransportFormProps {
  itineraryId: string;
  dayPlanId: string;
  currentTransportId?: string;
  transports: Transport[];
  isAdding?: boolean;

}

export default function ChangeTransportForm({
  itineraryId,
  dayPlanId,
  currentTransportId,
  transports,
  isAdding = false,
}: ChangeTransportFormProps) {
  const [selectedTransportId, setSelectedTransportId] = useState(currentTransportId);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    try {
      setError(null);

      if (!selectedTransportId) {
        setError("Please select a transport option");
        return;
      }

      const updatedFormData = new FormData();
      updatedFormData.append("itineraryId", itineraryId);
      updatedFormData.append("dayPlanId", dayPlanId);
      updatedFormData.append("transportId", selectedTransportId);
      
      if (!isAdding) {
        updatedFormData.append("currentTransportId", currentTransportId || "");
        const result = await updateTransport(updatedFormData);
        if (!result.success) {
          setError(result.error || "Failed to update transport");
          return;
        }
      } else {
        const result = await addTransport(updatedFormData);
        if (!result.success) {
          setError(result.error || "Failed to add transport");
          return;
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Transport operation error:", err);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="itineraryId" value={itineraryId} />
      <input type="hidden" name="dayPlanId" value={dayPlanId} />
      <input type="hidden" name="transportId" value={selectedTransportId || ""} />

      <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
        {transports.map((transport) => (
          <label
            key={transport._id}
            className={`
              relative flex border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors
              ${transport._id === selectedTransportId ? "border-blue-500 bg-blue-50" : "border-gray-200"}
            `}
            onClick={() => setSelectedTransportId(transport._id)}
          >
            <input
              type="radio"
              name="transportSelection"
              value={transport._id}
              checked={transport._id === selectedTransportId}
              onChange={() => setSelectedTransportId(transport._id)}
              className="sr-only"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{transport.type}</h3>
              <p className="text-sm text-gray-600">
                {transport.route.from} → {transport.route.to}
              </p>
              <p className="font-bold mt-2">₹{transport.price.toLocaleString()}</p>
            </div>

            {/* Selection indicator */}
            <div
              className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 
                ${transport._id === selectedTransportId ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
            >
              {transport._id === selectedTransportId && (
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
          disabled={!selectedTransportId}
          className={`px-4 py-2 rounded text-white
            ${selectedTransportId ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {isAdding ? 
            (selectedTransportId ? "Add Transport" : "Select a Transport Option") :
            (selectedTransportId ? "Update Transport" : "Select a Transport Option")
          }
        </button>
      </div>
    </form>
  );
}