export interface Amenities {
  wifi: boolean;
  pool: boolean;
  parking: boolean;
  gym: boolean;
  _id: string;
}

export interface RoomInfo {
  type: string;
  numberOfRooms: number;
  guestsPerRoom: number;
  _id: string;
}

export interface Hotel {
  _id: string;
  name: string;
  rating: number;
  price: number;
  originalPrice: number;
  deal: string;
  location: string;
  amenities: Amenities;
  imageUrl: string;
  isActive: boolean;
  category: string;
  mealPlan: string;
  roomInfo: RoomInfo;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  from: string;
  to: string;
  distance: number;
  _id: string;
}

export interface Transport {
  _id: string;
  type: string;
  rating: number;
  price: number;
  originalPrice: number;
  frequency: string;
  route: Route;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Sightseeing {
  _id: string;
  name: string;
  location: string;
  images: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  isActive: boolean;
  _id: string;
  name: string;
  rating: number;
  price: number;
  originalPrice: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  _id: string;
  name: string;
  type: string;
  price: number;
  originalPrice: number;
  deal: string;
  location: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DayPlan {
  _id: string;
  title: string;
  description: string;
  location: string;
  coverImage?: string;
  hotels: Hotel[];
  transports: Transport[];
  sightseeing: Sightseeing[];
  services: Service[];
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}
