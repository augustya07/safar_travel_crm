'use server';

import { API_URL } from "@/constants/API_URL";
import { revalidatePath } from "next/cache";

export async function updateActivity(formData: FormData) {
  try {
    const itineraryId = formData.get('itineraryId');
    const dayPlanId = formData.get('dayPlanId');
    const newActivityId = formData.get('activityId');
    const oldActivityId = formData.get('currentActivityId');


    if (!itineraryId || !dayPlanId || !newActivityId || !oldActivityId) {
      return { 
        success: false, 
        error: 'Missing required fields' 
      };
    }

    const response = await fetch(
      `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/activity/${oldActivityId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newActivityId: newActivityId 
        }),
        cache: 'no-store'
      }
    );

    console.log(response)


    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to update activity' 
      };
    }

    revalidatePath(`/customize-trip/${itineraryId}`);
    return { success: true };

  } catch (error) {
    console.error('Activity update error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to server' 
    };
  }
}

export async function addActivity(formData: FormData) {
  try {
    const itineraryId = formData.get('itineraryId');
    const dayPlanId = formData.get('dayPlanId');
    const activityId = formData.get('activityId');

    if (!itineraryId || !dayPlanId || !activityId) {
      return { 
        success: false, 
        error: 'Missing required fields' 
      };
    }

    const response = await fetch(
      `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/activity`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activityId }),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to add activity' 
      };
    }

    revalidatePath(`/customize-trip/${itineraryId}`);
    return { success: true };

  } catch (error) {
    console.error('Activity add error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to server' 
    };
  }
}