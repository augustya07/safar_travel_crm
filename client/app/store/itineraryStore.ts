// import create from 'zustand';

// // Example interfaces based on your data structure


// type Amenities = {
//   wifi: boolean;
//   pool: boolean;
//   parking: boolean;
//   gym: boolean;
//   // Include other amenities as needed
// };

// type RoomInfo = {
//   type: string;
//   numberOfRooms: number;
//   guestsPerRoom: number;
// };

// type HotelDetails = {
//   name: string;
//   rating: number;
//   price: number;
//   originalPrice?: number; // Optional because it's not marked as required
//   deal: string;
//   location: string;
//   amenities: Amenities;
//   imageUrl?: string; // Optional because it might not always be validated/required
//   isActive: boolean;
//   category: '2-Star' | '3-Star' | '4-Star' | '5-Star';
//   mealPlan: 'Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive' | 'No Meals';
//   roomInfo: RoomInfo;
//   createdAt?: Date; // Optional, part of { timestamps: true }
//   updatedAt?: Date; // Optional, part of { timestamps: true }
// };


// interface Itinerary {
//   // Simplified for example; extend based on actual data structure
//   dayPlans: Array<{
//     items: Array<{
//       itemType: string;
//       details: HotelDetails | null;
//     }>;
//   }>;
// }

// // Define the store's state shape
// interface ItineraryStoreState {
//   itinerary: Itinerary | null;
//   setItinerary: () => void;
//   getFirstHotelDetails: () => HotelDetails | null;
// }

// // Utility function for extracting hotel details
// const extractFirstHotelDetails = (itinerary: any | null): HotelDetails | null => {
//     // Assuming hotels have been populated in the itinerary object

//     console.log(itinerary)
//     return itinerary?.dayPlans?.[1]?.hotels?.[0] || null;
//   };

// // Create Zustand store with TypeScript
// const useItineraryStore = create<ItineraryStoreState>((set, get) => ({
//   itinerary: null,
//   setItinerary: async () => {
//     try {
//       const url = 'http://localhost:4000/api/v1/itineraries/65cc9d7e36cc1a719d95350b';
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error('Failed to fetch itinerary');
//       }
//       const itineraryData: Itinerary = await response.json();
//       set({ itinerary: itineraryData });
//     } catch (error) {
//       console.error('Error fetching itinerary:', error);
//       // Optionally, handle error state in your store or UI
//     }
//   },
//   getFirstHotelDetails: () => extractFirstHotelDetails(get().itinerary),
//   refetchItinerary: async () => {
//     const response = await fetch('http://localhost:4000/api/v1/itineraries/65cc9d7e36cc1a719d95350b');
//     if (!response.ok) throw new Error('Failed to fetch itinerary');
//     const data = await response.json();
//     set({ itinerary: data });
//   }
// }));

// export default useItineraryStore;


// store/itineraryStore.js
import create from 'zustand';

// Define the types for TypeScript, if you're using it
// If not, you can ignore the type definitions and just focus on the store logic

type Amenities = {
  wifi: boolean;
  pool: boolean;
  parking: boolean;
  gym: boolean;
};

type RoomInfo = {
  type: string;
  numberOfRooms: number;
  guestsPerRoom: number;
};

type HotelDetails = {
  name: string;
  rating: number;
  price: number;
  originalPrice?: number;
  deal: string;
  location: string;
  amenities: Amenities;
  imageUrl?: string;
  isActive: boolean;
  category: '2-Star' | '3-Star' | '4-Star' | '5-Star';
  mealPlan: 'Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive' | 'No Meals';
  roomInfo: RoomInfo;
};

type DayPlan = {
  hotels: HotelDetails[];
  transports: any[]; // Define these types according to your data structure
  activities: any[];
  services: any[];
  sightseeing: any[];
  title: string;
  description: string;
  location: string;
  coverImage: string;
};

type Itinerary = {
  _id: string;
  general: any; // Define these types according to your data structure
  availability: any;
  dayPlans: DayPlan[];
  otherDetails: any;
};

type ItineraryStoreState = {
  itinerary: Itinerary | null;
  setItinerary: (itineraryData: Itinerary) => void;
  fetchItinerary: () => Promise<void>;
};

// Creating the store
const useItineraryStore = create<ItineraryStoreState>((set) => ({
  itinerary: null,
  setItinerary: (itineraryData: Itinerary) => set({ itinerary: itineraryData }),
  fetchItinerary: async () => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/itineraries/65cc9d7e36cc1a719d95350b');
      if (!response.ok) {
        throw new Error('Failed to fetch itinerary');
      }
      const data = await response.json();
      set({ itinerary: data });
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      // Optionally, you can handle errors more gracefully here (e.g., by setting an error state in your store)
    }
  },
}));

export default useItineraryStore;
