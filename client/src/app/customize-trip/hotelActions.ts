'use server';

import { API_URL } from "@/constants/API_URL";
import { revalidatePath } from "next/cache";

export async function updateHotel(formData: FormData) {
  console.log(formData, 'form')
  try {
    const itineraryId = formData.get('itineraryId');
    const dayPlanId = formData.get('dayPlanId');
    const hotelId = formData.get('hotelId'); // This will be the new hotel ID
    const currentHotelId = formData.get('currentHotelId'); // Add this to track current hotel

    // Add validation
    if (!itineraryId || !dayPlanId || !hotelId) {
      return { 
        success: false, 
        error: 'Missing required fields' 
      };
    }

    const response = await fetch(
      `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/hotel/${currentHotelId || 'none'}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newHotelId: hotelId 
        }),
        cache: 'no-store'
      }
    );


    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to update hotel' 
      };
    }

    revalidatePath(`/customize-trip/${itineraryId}`);
    return { success: true };

  } catch (error) {
    console.error('Hotel update error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to server' 
    };
  }
}