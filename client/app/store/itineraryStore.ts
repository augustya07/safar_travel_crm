import create from 'zustand';

// Example interfaces based on your data structure
interface HotelDetails {
  _id: string;
  name: string;
  rating: number;
  price: number;
  originalPrice: number;
  deal: string;
  location: string;
  amenities: {
    wifi: boolean;
    pool: boolean;
    parking: boolean;
    gym: boolean;
  };
  imageUrl: string;
  isActive: boolean;
  category: string;
  mealPlan: string;
  roomInfo: {
    type: string;
    numberOfRooms: number;
    guestsPerRoom: number;
  };
}

interface Itinerary {
  // Simplified for example; extend based on actual data structure
  dayPlans: Array<{
    items: Array<{
      itemType: string;
      details: HotelDetails | null;
    }>;
  }>;
}

// Define the store's state shape
interface ItineraryStoreState {
  itinerary: Itinerary | null;
  setItinerary: (itineraryData: Itinerary) => void;
  getFirstHotelDetails: () => HotelDetails | null;
}

// Utility function for extracting hotel details
const extractFirstHotelDetails = (itinerary: Itinerary | null): HotelDetails | null => {
  return itinerary?.dayPlans?.[0]?.items?.find((item) => item.itemType === 'Hotel')?.details || null;
};

// Create Zustand store with TypeScript
const useItineraryStore = create<ItineraryStoreState>((set, get) => ({
  itinerary: null,
  setItinerary: (itineraryData: Itinerary) => set({ itinerary: itineraryData }),
  getFirstHotelDetails: () => extractFirstHotelDetails(get().itinerary),
  refetchItinerary: async () => {
    const response = await fetch('http://localhost:4000/api/v1/itineraries/65cc9d7e36cc1a719d95350b');
    if (!response.ok) throw new Error('Failed to fetch itinerary');
    const data = await response.json();
    set({ itinerary: data });
  }
}));

export default useItineraryStore;
