'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeSightseeingForm from './SightseeingForm';
import { Sightseeing } from '@/types/itinerary';

interface ChangeSightseeingButtonProps {
  itineraryId: string;
  dayPlanId: string;
  currentSightseeingId?: string;
  sightseeings: Sightseeing[];
  children: React.ReactNode;
}

export default function ChangeSightseeingButton({
  itineraryId,
  dayPlanId,
  currentSightseeingId,
  sightseeings,
  children
}: ChangeSightseeingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-800"
      >
        {children}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Change Sightseeing"
        size="xl"
      >
        <ChangeSightseeingForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          currentSightseeingId={currentSightseeingId}
          sightseeings={sightseeings}
        />
      </Modal>
    </>
  );
}