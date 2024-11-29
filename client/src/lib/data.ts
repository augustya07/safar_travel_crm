import { API_URL } from "@/constants/API_URL";

export async function fetchHotels(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${API_URL}/api/v1/hotels`,
    // 'http://3.92.55.114:4000/api/v1/hotels',
      {
        cache: 'no-store', 
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch hotels');
    }
  
    return response.json();
  }