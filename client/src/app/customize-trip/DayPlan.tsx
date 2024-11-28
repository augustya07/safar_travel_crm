import { DayPlan as DayPlanType } from '@/types/itinerary';
import HotelCard from './HotelCard';

interface DayPlanProps {
  dayPlan: DayPlanType;
  dayNumber: number;
  itineraryId: string;

}

export default function DayPlan({ dayPlan, dayNumber, itineraryId }: DayPlanProps) {
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
              />
            ))}
          </div>
        </div>
      )}

      {/* Transport Section */}
      {dayPlan.transports.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Transportation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayPlan.transports.map((transport) => (
              <div key={transport._id} className="border p-4 rounded-lg">
                <h4 className="font-medium">{transport.type}</h4>
                <div className="text-sm text-gray-600">
                  <p>{transport.route.from} → {transport.route.to}</p>
                  <p>Price: ₹{transport.price}</p>
                </div>
              </div>
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
              <div key={activity._id} className="border p-4 rounded-lg">
                <h4 className="font-medium">{activity.name}</h4>
                <p className="text-sm text-gray-600">{activity.type}</p>
                <p className="text-sm text-gray-600">₹{activity.price}</p>
              </div>
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
              <div key={service._id} className="border p-4 rounded-lg">
                <h4 className="font-medium">{service.name}</h4>
                <p className="text-sm text-gray-600">₹{service.price}</p>
              </div>
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
              <div key={sight._id} className="border p-4 rounded-lg">
                <h4 className="font-medium">{sight.name}</h4>
                <p className="text-sm text-gray-600">{sight.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}