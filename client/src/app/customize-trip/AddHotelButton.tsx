'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeHotelForm from './HotelForm';
import { Hotel } from '@/types/itinerary';

interface AddHotelButtonProps {
  itineraryId: string;
  dayPlanId: string;
  hotels: Hotel[];
}

export default function AddHotelButton({
  itineraryId,
  dayPlanId,
  hotels,
}: AddHotelButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-600 transition-colors"
      >
        + Add Accommodation
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Hotel"
        size="xl"
      >
        <ChangeHotelForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          hotels={hotels}
          isAdding={true}
        />
      </Modal>
    </>
  );
}