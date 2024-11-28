import { API_URL } from "@/constants/API_URL";
import DayPlan from "../DayPlan";
import { DayPlan as DayPlanType } from '@/types/itinerary';


export default async function CustomizeTrip({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;
    
    const response = await fetch(`${API_URL}/api/v1/itineraries/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch itinerary');
    }
  
    const itinerary = await response.json();
    
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Itinerary</h1>
        {itinerary.dayPlans.map((dayPlan:DayPlanType, index:number) => (
          <DayPlan 
            key={dayPlan._id} 
            dayPlan={dayPlan} 
            dayNumber={index + 1}
            itineraryId={id}
          />
        ))}
      </div>
    );
  }