import { API_URL } from "@/constants/API_URL";

export async function fetchHotels(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${API_URL}/hotels`,
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

  export async function fetchTransports(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${API_URL}/transports`,
      {
        cache: 'no-store', 
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch transports');
    }
  
    return response.json();
  }

  export async function fetchActivities(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${API_URL}/activities`,
      {
        cache: 'no-store', 
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }
  
    return response.json();
  }

  export async function fetchServices(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${API_URL}/services`,
      {
        cache: 'no-store', 
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
  
    return response.json();
  }

  export async function fetchSightseeings(filters = {}) {
    const queryString = new URLSearchParams(filters).toString();
    const response = await fetch(
      `${API_URL}/sightseeing`,
      {
        cache: 'no-store', 
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch sightseeings');
    }
  
    return response.json();
  }