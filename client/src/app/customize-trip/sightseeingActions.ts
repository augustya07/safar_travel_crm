'use server';

import { API_URL } from "@/constants/API_URL";
import { revalidatePath } from "next/cache";

export async function updateSightseeing(formData: FormData) {
  try {
    const itineraryId = formData.get('itineraryId');
    const dayPlanId = formData.get('dayPlanId');
    const sightseeingId = formData.get('sightseeingId');
    const currentSightseeingId = formData.get('currentSightseeingId');

    if (!itineraryId || !dayPlanId || !sightseeingId) {
      return { 
        success: false, 
        error: 'Missing required fields' 
      };
    }

    const response = await fetch(
      `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/sightseeing/${currentSightseeingId || 'none'}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newSightseeingId: sightseeingId 
        }),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to update sightseeing' 
      };
    }

    revalidatePath(`/customize-trip/${itineraryId}`);
    return { success: true };

  } catch (error) {
    console.error('Sightseeing update error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to server' 
    };
  }
}

export async function addSightseeing(formData: FormData) {
  try {
    const itineraryId = formData.get('itineraryId');
    const dayPlanId = formData.get('dayPlanId');
    const sightseeingId = formData.get('sightseeingId');

    if (!itineraryId || !dayPlanId || !sightseeingId) {
      return { 
        success: false, 
        error: 'Missing required fields' 
      };
    }

    const response = await fetch(
      `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/sightseeing`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sightseeingId }),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to add sightseeing' 
      };
    }

    revalidatePath(`/customize-trip/${itineraryId}`);
    return { success: true };

  } catch (error) {
    console.error('Sightseeing add error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to server' 
    };
  }
}