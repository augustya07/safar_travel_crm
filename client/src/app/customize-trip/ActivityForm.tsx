"use client";

import { Activity } from "@/types/itinerary";
import { useState } from "react";
import { addActivity, updateActivity } from "./activityActions";

interface ChangeActivityFormProps {
  itineraryId: string;
  dayPlanId: string;
  currentActivityId?: string;
  activities: Activity[];
  isAdding?: boolean;

}

export default function ChangeActivityForm({
  itineraryId,
  dayPlanId,
  currentActivityId,
  activities,
  isAdding = false,
}: ChangeActivityFormProps) {
  const [selectedActivityId, setSelectedActivityId] = useState(currentActivityId);
  const [error, setError] = useState<string |  null>(null);
  console.log(error)

  async function handleSubmit(formData: FormData) {
    try {
      setError(null);

      if (!selectedActivityId) {
        setError("Please select an activity");
        return;
      }

      const updatedFormData = new FormData();
      updatedFormData.append("itineraryId", itineraryId);
      updatedFormData.append("dayPlanId", dayPlanId);
      updatedFormData.append("activityId", selectedActivityId);

      if (!isAdding) {
        updatedFormData.append("currentActivityId", currentActivityId || "");
        const result = await updateActivity(updatedFormData);
        if (!result.success) {
          setError(result.error || "Failed to update activity");
          return;
        }
      } else {
        const result = await addActivity(updatedFormData);
        if (!result.success) {
          setError(result.error || "Failed to add activity");
          return;
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Activity operation error:", err);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="itineraryId" value={itineraryId} />
      <input type="hidden" name="dayPlanId" value={dayPlanId} />
      <input type="hidden" name="activityId" value={selectedActivityId || ""} />

      <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
        {activities.map((activity) => (
          <label
            key={activity._id}
            className={`
              relative flex border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors
              ${activity._id === selectedActivityId ? "border-blue-500 bg-blue-50" : "border-gray-200"}
            `}
            onClick={() => setSelectedActivityId(activity._id)}
          >
            <input
              type="radio"
              name="activitySelection"
              value={activity._id}
              checked={activity._id === selectedActivityId}
              onChange={() => setSelectedActivityId(activity._id)}
              className="sr-only"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{activity.name}</h3>
              <p className="text-sm text-gray-600">{activity.type}</p>
              <p className="text-sm text-gray-600">{activity.location}</p>
              {activity.deal && (
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                  {activity.deal}
                </span>
              )}
              <div className="mt-2">
                <span className="font-bold">₹{activity.price.toLocaleString()}</span>
                {activity.originalPrice > activity.price && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ₹{activity.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Selection indicator */}
            <div
              className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 
                ${activity._id === selectedActivityId ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
            >
              {activity._id === selectedActivityId && (
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
          disabled={!selectedActivityId}
          className={`px-4 py-2 rounded text-white
            ${selectedActivityId ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {isAdding ? 
            (selectedActivityId ? "Add Activity" : "Select an Activity") :
            (selectedActivityId ? "Update Activity" : "Select an Activity")
          }
        </button>
      </div>
    </form>
  );
}