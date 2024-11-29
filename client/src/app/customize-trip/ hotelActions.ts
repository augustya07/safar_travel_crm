'use server';

import { API_URL } from "@/constants/API_URL";
import { revalidatePath } from "next/cache";

export async function updateHotel(formData: FormData) {
  const itineraryId = formData.get('itineraryId') as string;
  const dayPlanId = formData.get('dayPlanId') as string;
  const hotelId = formData.get('hotelId') as string;

  try {
    const response = await fetch(
      `${API_URL}/itineraries/${itineraryId}/dayPlan/${dayPlanId}/hotel/${hotelId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update hotel');
    }

    revalidatePath(`/customize-trip/${itineraryId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update hotel' };
  }
}