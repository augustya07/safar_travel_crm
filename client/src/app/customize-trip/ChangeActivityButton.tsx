'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeActivityForm from './AcitivtyForm';
import { Activity } from '@/types/itinerary';

interface ChangeActivityButtonProps {
  itineraryId: string;
  dayPlanId: string;
  currentActivityId?: string;
  activities: Activity[];
  children: React.ReactNode;
}

export default function ChangeActivityButton({
  itineraryId,
  dayPlanId,
  currentActivityId,
  activities,
  children
}: ChangeActivityButtonProps) {
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
        title="Change Activity"
        size="xl"
      >
        <ChangeActivityForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          currentActivityId={currentActivityId}
          activities={activities}
        />
      </Modal>
    </>
  );
}