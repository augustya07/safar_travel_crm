'use server';

import { API_URL } from "@/constants/API_URL";
import { revalidatePath } from "next/cache";

export async function updateTransport(formData: FormData) {
  try {
    const itineraryId = formData.get('itineraryId');
    const dayPlanId = formData.get('dayPlanId');
    const transportId = formData.get('transportId');
    const currentTransportId = formData.get('currentTransportId');

    if (!itineraryId || !dayPlanId || !transportId) {
      return { 
        success: false, 
        error: 'Missing required fields' 
      };
    }

    const response = await fetch(
      `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/transport/${currentTransportId || 'none'}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newTransportId: transportId 
        }),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to update transport' 
      };
    }

    revalidatePath(`/customize-trip/${itineraryId}`);
    return { success: true };

  } catch (error) {
    console.error('Transport update error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to server' 
    };
  }
}