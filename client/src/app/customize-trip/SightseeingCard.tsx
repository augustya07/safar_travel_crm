"use client";

import { Sightseeing } from "@/types/itinerary";
import ChangeSightseeingButton from "./ChangeSightseeingButton";

interface SightseeingCardProps {
  sightseeing: Sightseeing;
  dayPlanId: string;
  itineraryId: string;
  sightseeings: Sightseeing[];
}

export default function SightseeingCard({
  sightseeing,
  dayPlanId,
  itineraryId,
  sightseeings,
}: SightseeingCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative h-48 w-full">
        {sightseeing.images && sightseeing.images.length > 0 ? (
        //   <Image
        //     src={sightseeing.images[0]}
        //     alt={sightseeing.name}
        //     fill
        //     className="object-cover"
        //   />
        <p>Img</p>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-lg">{sightseeing.name}</h3>
            <p className="text-sm text-gray-600">{sightseeing.location}</p>
          </div>
          <ChangeSightseeingButton
            itineraryId={itineraryId}
            dayPlanId={dayPlanId}
            currentSightseeingId={sightseeing._id}
            sightseeings={sightseeings}
          >
            Change Location
          </ChangeSightseeingButton>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {sightseeing.description}
        </p>

        {sightseeing.images && sightseeing.images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {sightseeing.images.slice(1).map((image, index) => (
              <div key={index} className="relative h-16 w-16 flex-shrink-0">
                <Image
                  src={image}
                  alt={`${sightseeing.name} - ${index + 2}`}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}