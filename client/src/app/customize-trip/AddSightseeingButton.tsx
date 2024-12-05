'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeSightseeingForm from './SightseeingForm';
import { Sightseeing } from '@/types/itinerary';

interface AddSightseeingButtonProps {
  itineraryId: string;
  dayPlanId: string;
  sightseeings: Sightseeing[];
}

export default function AddSightseeingButton({
  itineraryId,
  dayPlanId,
  sightseeings,
}: AddSightseeingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-600 transition-colors"
      >
        + Add Sightseeing
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Sightseeing"
        size="xl"
      >
        <ChangeSightseeingForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          sightseeings={sightseeings}
          isAdding={true}
        />
      </Modal>
    </>
  );
}