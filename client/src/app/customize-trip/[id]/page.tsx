import { API_URL } from "@/constants/API_URL";
import DayPlan from "../DayPlan";
import { DayPlan as DayPlanType } from '@/types/itinerary';
import { formatCurrency } from "@/utils/formatCurrency";



export default async function CustomizeTrip({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;
    
    const response = await fetch(`${API_URL}/itineraries/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch itinerary');
    }
  
    const itinerary = await response.json();
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Itinerary</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="lg:w-2/3">
          
            {itinerary.dayPlans.map((dayPlan:DayPlanType, index:number) => (
              <DayPlan 
                key={dayPlan._id} 
                dayPlan={dayPlan} 
                dayNumber={index + 1}
                itineraryId={id}
              />
            ))}
          </div>
  
          {/* Price summary panel */}
          <div className="lg:w-1/3">
            <div className="sticky top-4 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Price Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Accommodation</span>
                  <span>{formatCurrency(itinerary.calculatedPrice.breakdown.accommodationCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transportation</span>
                  <span>{formatCurrency(itinerary.calculatedPrice.breakdown.transportCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Activities</span>
                  <span>{formatCurrency(itinerary.calculatedPrice.breakdown.activityCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Services</span>
                  <span>{formatCurrency(itinerary.calculatedPrice.breakdown.serviceCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sightseeing</span>
                  <span>{formatCurrency(itinerary.calculatedPrice.breakdown.sightseeingCost)}</span>
                </div>
              </div>
  
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Price</span>
                  <span>{formatCurrency(itinerary.calculatedPrice.total)}</span>
                </div>
              </div>
  
              <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Book
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }