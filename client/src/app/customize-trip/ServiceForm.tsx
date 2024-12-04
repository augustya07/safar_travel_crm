"use client";

import { Service } from "@/types/itinerary";
import { useState } from "react";
import { updateService } from "./serviceActions";

interface ChangeServiceFormProps {
  itineraryId: string;
  dayPlanId: string;
  currentServiceId?: string;
  services: Service[];
}

export default function ChangeServiceForm({
  itineraryId,
  dayPlanId,
  currentServiceId,
  services,
}: ChangeServiceFormProps) {
  const [selectedServiceId, setSelectedServiceId] = useState(currentServiceId);
  const [error, setError] = useState<string | null>(null);

  async function handleUpdateService(formData: FormData) {
    try {
      setError(null);

      if (!selectedServiceId) {
        setError("Please select a service");
        return;
      }

      const updatedFormData = new FormData();
      updatedFormData.append("itineraryId", itineraryId);
      updatedFormData.append("dayPlanId", dayPlanId);
      updatedFormData.append("serviceId", selectedServiceId);
      updatedFormData.append("currentServiceId", currentServiceId || "");
      
      const result = await updateService(updatedFormData);

      if (!result.success) {
        setError(result.error || "Failed to update service");
        return;
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Update service error:", err);
    }
  }

  return (
    <form action={handleUpdateService} className="space-y-4">
      <input type="hidden" name="itineraryId" value={itineraryId} />
      <input type="hidden" name="dayPlanId" value={dayPlanId} />
      <input type="hidden" name="serviceId" value={selectedServiceId || ""} />

      <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
        {services.map((service) => (
          <label
            key={service._id}
            className={`
              relative flex border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors
              ${service._id === selectedServiceId ? "border-blue-500 bg-blue-50" : "border-gray-200"}
            `}
            onClick={() => setSelectedServiceId(service._id)}
          >
            <input
              type="radio"
              name="serviceSelection"
              value={service._id}
              checked={service._id === selectedServiceId}
              onChange={() => setSelectedServiceId(service._id)}
              className="sr-only"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`h-4 w-4 ${
                        index < service.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{service.location}</span>
              </div>
              <div className="mt-2">
                <span className="font-bold">₹{service.price.toLocaleString()}</span>
                {service.originalPrice > service.price && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{service.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Selection indicator */}
            <div
              className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 
                ${service._id === selectedServiceId ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
            >
              {service._id === selectedServiceId && (
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
          disabled={!selectedServiceId}
          className={`px-4 py-2 rounded text-white
            ${selectedServiceId ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {selectedServiceId ? "Update Service" : "Select a Service"}
        </button>
      </div>
    </form>
  );
}