'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeTransportForm from './TransportForm';
import { Transport } from '@/types/itinerary';

interface ChangeTransportButtonProps {
  itineraryId: string;
  dayPlanId: string;
  currentTransportId?: string;
  transports: Transport[];
  children: React.ReactNode;
}

export default function ChangeTransportButton({
  itineraryId,
  dayPlanId,
  currentTransportId,
  transports,
  children
}: ChangeTransportButtonProps) {
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
        title="Change Transport"
        size="xl"
      >
        <ChangeTransportForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          currentTransportId={currentTransportId}
          transports={transports}
        />
      </Modal>
    </>
  );
}