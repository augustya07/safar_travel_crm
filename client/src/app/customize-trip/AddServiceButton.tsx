'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeServiceForm from './ServiceForm';
import { Service } from '@/types/itinerary';

interface AddServiceButtonProps {
  itineraryId: string;
  dayPlanId: string;
  services: Service[];
}

export default function AddServiceButton({
  itineraryId,
  dayPlanId,
  services,
}: AddServiceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-600 transition-colors"
      >
        + Add Services
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Service"
        size="xl"
      >
        <ChangeServiceForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          services={services}
          isAdding={true}
        />
      </Modal>
    </>
  );
}