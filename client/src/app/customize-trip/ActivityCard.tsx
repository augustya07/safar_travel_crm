"use client";

import { Activity } from "@/types/itinerary";
import ChangeActivityButton from "./ChangeActivityButton";

interface ActivityCardProps {
  activity: Activity;
  dayPlanId: string;
  itineraryId: string;
  activities: Activity[];
}

export default function ActivityCard({
  activity,
  dayPlanId,
  itineraryId,
  activities,
}: ActivityCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">{activity.name}</h3>
            <p className="text-sm text-gray-600">{activity.type}</p>
          </div>
          <ChangeActivityButton
            itineraryId={itineraryId}
            dayPlanId={dayPlanId}
            currentActivityId={activity._id}
            activities={activities}
          >
            Change Activity
          </ChangeActivityButton>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{activity.location}</span>
          </div>

          {activity.deal && (
            <div className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
              {activity.deal}
            </div>
          )}

          <div className="flex justify-between items-end pt-2 border-t">
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800">
                ₹{activity.price.toLocaleString()}
              </div>
              {activity.originalPrice > activity.price && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{activity.originalPrice.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}