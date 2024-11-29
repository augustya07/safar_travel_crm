import { Hotel } from '@/types/itinerary';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { updateHotel } from './ hotelActions';

interface ChangeHotelFormProps {
  itineraryId: string;
  dayPlanId: string;
  currentHotelId?: string;
  hotels: Hotel[];
}


export default function ChangeHotelForm({ 
    itineraryId, 
    dayPlanId, 
    currentHotelId,
    hotels 
  }: ChangeHotelFormProps) {

    async function handleUpdateHotel(formData: FormData) {
        const result = await updateHotel(formData);
        if (!result.success) {
          throw new Error(result.error);
        }
      }
    return (
      <form action={handleUpdateHotel} className="space-y-4">
        <input type="hidden" name="itineraryId" value={itineraryId} />
        <input type="hidden" name="dayPlanId" value={dayPlanId} />
  
        {/* Hotels List */}
        <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
          {hotels.map((hotel) => (
            <label
              key={hotel._id}
              className={`
                relative flex border rounded-lg p-4 cursor-pointer hover:border-blue-500
                ${hotel._id === currentHotelId ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
              `}
            >
              <input
                type="radio"
                name="hotelId"
                value={hotel._id}
                defaultChecked={hotel._id === currentHotelId}
                className="sr-only"
              />
              <div className="flex gap-4 w-full">
                <div className="w-24 h-24 relative">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: hotel.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{hotel.location}</p>
                  <p className="text-sm text-gray-600">{hotel.mealPlan}</p>
                  <p className="font-bold mt-2">₹{hotel.price.toLocaleString()}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
  
        <div className="flex justify-end gap-2 pt-4 border-t">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Hotel
          </button>
        </div>
      </form>
    );
  }