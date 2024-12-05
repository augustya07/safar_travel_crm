'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeTransportForm from './TransportForm';
import { Transport } from '@/types/itinerary';

interface AddTransportButtonProps {
  itineraryId: string;
  dayPlanId: string;
  transports: Transport[];
}

export default function AddTransportButton({
  itineraryId,
  dayPlanId,
  transports,
}: AddTransportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-blue-600 hover:border-blue-600 transition-colors"
      >
        + Add Transportation
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Transport"
        size="xl"
      >
        <ChangeTransportForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          transports={transports}
          isAdding={true}
        />
      </Modal>
    </>
  );
}