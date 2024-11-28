'use client'

import { useState } from 'react'
import AddStayModal from './AddStayModal'

export default function AddStayButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button 
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        onClick={() => setIsModalOpen(true)}
      >
        <span>+</span>
        Add Stay
      </button>

      <AddStayModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}