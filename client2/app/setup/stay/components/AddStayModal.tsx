'use client'

import { useState } from 'react'

interface AddStayModalProps {
  isOpen: boolean
  onClose: () => void
}

interface HotelFormData {
  name: string
  rating: number
  contactNumber: string
  typeOfStay: 'Hotel' | 'Resort' | 'Camping' | 'Stay'
  price: number
  originalPrice?: number
  deal: string
  address: string
  location: string
  amenities: {
    wifi: boolean
    pool: boolean
    parking: boolean
    gym: boolean
  }
  imageUrl: string
  isActive: boolean
  category: '2-Star' | '3-Star' | '4-Star' | '5-Star'
  mealPlan: 'Breakfast' | 'Half Board' | 'Full Board' | 'All Inclusive' | 'No Meals'
  roomInfo: {
    type: string
    numberOfRooms: number
    guestsPerRoom: number
  }
}

export default function AddStayModal({ isOpen, onClose }: AddStayModalProps) {
  const [formData, setFormData] = useState<HotelFormData>({
    name: '',
    rating: 1,
    contactNumber: '',
    typeOfStay: 'Hotel',
    price: 0,
    originalPrice: 0,
    deal: 'No deal',
    address: '',
    location: '',
    amenities: {
      wifi: false,
      pool: false,
      parking: false,
      gym: false
    },
    imageUrl: '',
    isActive: true,
    category: '2-Star',
    mealPlan: 'No Meals',
    roomInfo: {
      type: '',
      numberOfRooms: 1,
      guestsPerRoom: 1
    }
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Add New Hotel</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form  className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Enter Hotel Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Star Rating<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Enter Star Rating"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.contactNumber}
                onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                placeholder="+1234567890"
              />
            </div>
          </div>

          {/* Address and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Full address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Location<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
                placeholder="City, State"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Check in Time</label>
              <input
                type="time"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Check out Time</label>
              <input
                type="time"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                How many night do you want to stay?
              </label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>2 Night</option>
                <option>3 Night</option>
                <option>4 Night</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Room Name</label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>2 Night</option>
                <option>3 Night</option>
                <option>4 Night</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meal Plan</label>
              <input
                type="text"
                placeholder="Enter Meal Plan"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Add Room Image</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="border rounded-md px-4 py-2 flex items-center gap-2"
              >
                <span>📎</span>
                Select file
              </button>
              <span className="text-gray-500">No file selected</span>
              <button
                type="button"
                className="text-purple-600 hover:text-purple-700"
              >
                View Image
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Description"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-start gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Save Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}