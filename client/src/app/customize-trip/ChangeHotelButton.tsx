'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import ChangeHotelForm from './HotelForm';
import { Hotel } from '@/types/itinerary';

interface ChangeHotelButtonProps {
  itineraryId: string;
  dayPlanId: string;
  currentHotelId?: string;
  hotels: Hotel[];
  children: React.ReactNode;
}

export default function ChangeHotelButton({
  itineraryId,
  dayPlanId,
  currentHotelId,
  hotels,
  children
}: ChangeHotelButtonProps) {
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
        title="Change Hotel"
        size="xl"
      >
        <ChangeHotelForm
          itineraryId={itineraryId}
          dayPlanId={dayPlanId}
          currentHotelId={currentHotelId}
          hotels={hotels}
        />
      </Modal>
    </>
  );
}