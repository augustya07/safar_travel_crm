'use server';

import { API_URL } from "@/constants/API_URL";
import { revalidatePath } from "next/cache";

export async function updateService(formData: FormData) {
  try {
    const itineraryId = formData.get('itineraryId');
    const dayPlanId = formData.get('dayPlanId');
    const serviceId = formData.get('serviceId');
    const currentServiceId = formData.get('currentServiceId');

    if (!itineraryId || !dayPlanId || !serviceId) {
      return { 
        success: false, 
        error: 'Missing required fields' 
      };
    }

    const response = await fetch(
      `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/service/${currentServiceId || 'none'}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newServiceId: serviceId 
        }),
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.message || 'Failed to update service' 
      };
    }

    revalidatePath(`/customize-trip/${itineraryId}`);
    return { success: true };

  } catch (error) {
    console.error('Service update error:', error);
    return { 
      success: false, 
      error: 'Failed to connect to server' 
    };
  }
}

export async function addService(formData: FormData) {
    try {
      const itineraryId = formData.get('itineraryId');
      const dayPlanId = formData.get('dayPlanId');
      const serviceId = formData.get('serviceId');
  
      if (!itineraryId || !dayPlanId || !serviceId) {
        return { 
          success: false, 
          error: 'Missing required fields' 
        };
      }
  
      const response = await fetch(
        `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/service`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ serviceId }),
          cache: 'no-store'
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        return { 
          success: false, 
          error: errorData.message || 'Failed to add service' 
        };
      }
  
      revalidatePath(`/customize-trip/${itineraryId}`);
      return { success: true };
  
    } catch (error) {
      console.error('Service add error:', error);
      return { 
        success: false, 
        error: 'Failed to connect to server' 
      };
    }
  }