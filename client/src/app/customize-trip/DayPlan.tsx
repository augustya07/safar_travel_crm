import { DayPlan as DayPlanType } from '@/types/itinerary';
import HotelCard from './HotelCard';
import { fetchActivities, fetchHotels, fetchServices, fetchSightseeings, fetchTransports } from '@/lib/data';
import TransportCard from './TransportCard';
import ActivityCard from './ActivityCard';
import ServiceCard from './ServiceCard';
import SightseeingCard from './SightseeingCard';

interface DayPlanProps {
  dayPlan: DayPlanType;
  dayNumber: number;
  itineraryId: string;
 
}

export default async function DayPlan({ dayPlan, dayNumber, itineraryId }: DayPlanProps) {
    const hotels = await fetchHotels();
    const transports = await fetchTransports();
    const activities = await fetchActivities();
    const services = await fetchServices();
    const sightseeings = await fetchSightseeings();





  return (
    <div className="border rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Day {dayNumber}: {dayPlan.title}</h2>
        <span className="text-gray-500">{dayPlan.location}</span>
      </div>

      <p className="text-gray-600 mb-4">{dayPlan.description}</p>

      {/* Hotels Section */}
      {dayPlan.hotels.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Accommodation</h3>
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
        </div>
      )}

      {/* Transport Section */}
      {dayPlan.transports.length > 0 && (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Transportation</h3>
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
    </div>
  )}

      {/* Activities Section */}
      {dayPlan.activities.length > 0 && (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Activities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  )}

      {/* Services Section */}
      {dayPlan.services.length > 0 && (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  )}

      {/* Sightseeing Section */}
      {dayPlan.sightseeing.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Sightseeing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dayPlan.sightseeing.map((sight) => (
          <SightseeingCard
            key={sight._id}
            sightseeing={sight}
            dayPlanId={dayPlan._id}
            itineraryId={itineraryId}
            sightseeings={sightseeings}
          />
        ))}
          </div>
        </div>
      )}
    </div>
  );
}