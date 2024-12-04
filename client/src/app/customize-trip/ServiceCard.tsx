"use client";

import { Service } from "@/types/itinerary";
import ChangeServiceButton from "./ChangeServicesButton";

interface ServiceCardProps {
  service: Service;
  dayPlanId: string;
  itineraryId: string;
  services: Service[];
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function ServiceCard({
  service,
  dayPlanId,
  itineraryId,
  services,
}: ServiceCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">{service.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={service.rating} />
            </div>
          </div>
          <ChangeServiceButton
            itineraryId={itineraryId}
            dayPlanId={dayPlanId}
            currentServiceId={service._id}
            services={services}
          >
            Change Service
          </ChangeServiceButton>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{service.location}</span>
          </div>

          <div className="flex justify-between items-end pt-2 border-t">
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800">
                ₹{service.price.toLocaleString()}
              </div>
              {service.originalPrice > service.price && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{service.originalPrice.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}