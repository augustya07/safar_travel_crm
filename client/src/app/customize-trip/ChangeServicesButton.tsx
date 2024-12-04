'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeServiceForm from './ServiceForm';
import { Service } from '@/types/itinerary';

interface ChangeServiceButtonProps {
  itineraryId: string;
  dayPlanId: string;
  currentServiceId?: string;
  services: Service[];
  children: React.ReactNode;
}

export default function ChangeServiceButton({
  itineraryId,
  dayPlanId,
  currentServiceId,
  services,
  children
}: ChangeServiceButtonProps) {
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
        title="Change Service"
        size="xl"
      >
        <ChangeServiceForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          currentServiceId={currentServiceId}
          services={services}
        />
      </Modal>
    </>
  );
}