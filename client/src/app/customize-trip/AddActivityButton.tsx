'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeActivityForm from './ActivityForm';
import { Activity } from '@/types/itinerary';

interface AddActivityButtonProps {
  itineraryId: string;
  dayPlanId: string;
  activities: Activity[];
}

export default function AddActivityButton({
  itineraryId,
  dayPlanId,
  activities,
}: AddActivityButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-600 transition-colors"
      >
        + Add Activities
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Activity"
        size="xl"
      >
        <ChangeActivityForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          activities={activities}
          isAdding={true}
        />
      </Modal>
    </>
  );
}