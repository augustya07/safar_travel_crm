import { DayPlan as DayPlanType, Sightseeing } from "@/types/itinerary";
import HotelCard from "./HotelCard";
import {
  fetchActivities,
  fetchHotels,
  fetchServices,
  fetchSightseeings,
  fetchTransports,
} from "@/lib/data";
import TransportCard from "./TransportCard";
import ActivityCard from "./ActivityCard";
import ServiceCard from "./ServiceCard";
import SightseeingCard from "./SightseeingCard";
import AddHotelButton from "./AddHotelButton";
import AddTransportButton from "./AddTransportButton";
import AddActivityButton from "./AddActivityButton";
import AddServiceButton from "./AddServiceButton";
import AddSightseeingButton from "./AddSightseeingButton";

interface DayPlanProps {
  dayPlan: DayPlanType;
  dayNumber: number;
  itineraryId: string;
}

export default async function DayPlan({
  dayPlan,
  dayNumber,
  itineraryId,
}: DayPlanProps) {
  const hotels = await fetchHotels();
  const transports = await fetchTransports();
  const activities = await fetchActivities();
  const services = await fetchServices();
  const sightseeings = await fetchSightseeings();

  return (
    <div className="border rounded-lg p-6 mb-6 shadow-sm bg-white">
      {/* Day Header - Updated to match design */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">Day {dayNumber}</span>
          <span className="text-blue-600">•</span>
          <h2 className="text-xl">{dayPlan.title}</h2>
          <button className="text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      </div>

      {/* {dayPlan.description && (
        <p className="text-gray-600 mb-6">{dayPlan.description}</p>
      )} */}

      {/* Hotels Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-gray-700">Hotel | {dayPlan.location}</h3>
        </div>
        {dayPlan.hotels.length > 0 ? (
          <div className="space-y-4">
            {dayPlan.hotels.map((hotel) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                dayPlanId={dayPlan._id}
                itineraryId={itineraryId}
                hotels={hotels}
              />
            ))}
          </div>
        ) : (
          <div className="border border-dashed rounded-lg p-4">
            <AddHotelButton
              itineraryId={itineraryId}
              dayPlanId={dayPlan._id}
              hotels={hotels}
            />
          </div>
        )}
      </div>

      {/* Transport Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Transportation</h3>
        </div>
        {dayPlan.transports.length > 0 ? (
          <div className="space-y-4">
            {dayPlan.transports.map((transport) => (
              <TransportCard
                key={transport._id}
                transport={transport}
                dayPlanId={dayPlan._id}
                itineraryId={itineraryId}
                transports={transports}
              />
            ))}
          </div>
        ) : (
          <AddTransportButton
            itineraryId={itineraryId}
            dayPlanId={dayPlan._id}
            transports={transports}
          />
        )}
      </div>

      {/* Activities Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Activities</h3>
        </div>
        {dayPlan.activities.length > 0 ? (
          <div className="space-y-4">
            {dayPlan.activities.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                dayPlanId={dayPlan._id}
                itineraryId={itineraryId}
                activities={activities}
              />
            ))}
          </div>
        ) : (
          <AddActivityButton
            itineraryId={itineraryId}
            dayPlanId={dayPlan._id}
            activities={activities}
          />
        )}
      </div>

      {/* Services Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Services</h3>
        </div>
        {dayPlan.services.length > 0 ? (
          <div className="space-y-4">
            {dayPlan.services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                dayPlanId={dayPlan._id}
                itineraryId={itineraryId}
                services={services}
              />
            ))}
          </div>
        ) : (
          <AddServiceButton
            itineraryId={itineraryId}
            dayPlanId={dayPlan._id}
            services={services}
          />
        )}
      </div>

      {/* Sightseeing Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Sightseeing</h3>
        </div>
        {dayPlan.sightseeing.length > 0 ? (
          <div className="space-y-4">
            {dayPlan.sightseeing.map((sightseeing: Sightseeing) => (
              <SightseeingCard
                key={sightseeing._id}
                sightseeing={sightseeing}
                dayPlanId={dayPlan._id}
                itineraryId={itineraryId}
                sightseeings={sightseeings}
              />
            ))}
          </div>
        ) : (
          <AddSightseeingButton
            itineraryId={itineraryId}
            dayPlanId={dayPlan._id}
            sightseeings={sightseeings}
          />
        )}
      </div>

      {/* Add Day Button */}
      {/* <div className="mt-8 text-center">
        <button className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Day
        </button>
      </div> */}
    </div>
  );
}
