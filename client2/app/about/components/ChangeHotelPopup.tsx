"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Hotel {
  id: number;
  name: string;
}

interface ChangeHotelPopupProps {
  onClose: () => void;
  onSelectHotel: (hotel: Hotel) => void;
}

const searchSchema = z.object({
  name: z.string().optional(),
  rating: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  mealPlan: z.string().optional(),
  amenities: z.string().optional(),
});

type SearchFormInputs = z.infer<typeof searchSchema>;

const ChangeHotelPopup: React.FC<ChangeHotelPopupProps> = ({ onClose, onSelectHotel }) => {
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchSchema),
  });

  const searchHotels: SubmitHandler<SearchFormInputs> = async (data) => {
    const queryParams = new URLSearchParams();
    Object.keys(data).forEach(key => {
      if (data[key]) queryParams.append(key, data[key]);
    });

    try {
      const response = await fetch(`http://localhost:4000/api/v1/hotels/search?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const results: Hotel[] = await response.json();
      setSearchResults(results.data); // Update the search results state
    } catch (error) {
      console.error("Failed to search hotels:", error);
    }
  };

  const handleSelect = (hotel: Hotel) => {
    onSelectHotel(hotel); // Pass the selected hotel back to the parent component
    onClose(); // Close the popup
  };;

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">Change Hotel</h2>
        <form onSubmit={handleSubmit(searchHotels)}>
          <input
            {...register('name')}
            placeholder="Search hotels by name"
            className="border p-2 rounded-lg w-full mb-4 text-black"
            type="text"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            {...register('rating')}
            placeholder="Rating"
            className="border p-2 rounded-lg w-full mb-4 text-black"
            type="text"
          />
          {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}

          <input
            {...register('minPrice')}
            placeholder="Min Price"
            className="border p-2 rounded-lg w-full mb-4 text-black"
            type="text"
          />
          {errors.minPrice && <p className="text-red-500">{errors.minPrice.message}</p>}

          <input
            {...register('maxPrice')}
            placeholder="Max Price"
            className="border p-2 rounded-lg w-full mb-4 text-black"
            type="text"
          />
          {errors.maxPrice && <p className="text-red-500">{errors.maxPrice.message}</p>}

          <input
            {...register('location')}
            placeholder="Location"
            className="border p-2 rounded-lg w-full mb-4 text-black"
            type="text"
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}

          <select
            {...register('category')}
            className="border p-2 rounded-lg w-full mb-4 text-black"
          >
            <option value="">Select Category</option>
            <option value="2-Star">2-Star</option>
            <option value="3-Star">3-Star</option>
            <option value="4-Star">4-Star</option>
            <option value="5-Star">5-Star</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}

          <select
            {...register('mealPlan')}
            className="border p-2 rounded-lg w-full mb-4 text-black"
          >
            <option value="">Select Meal Plan</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Half Board">Half Board</option>
            <option value="Full Board">Full Board</option>
            <option value="All Inclusive">All Inclusive</option>
            <option value="No Meals">No Meals</option>
          </select>
          {errors.mealPlan && <p className="text-red-500">{errors.mealPlan.message}</p>}

          <input
            {...register('amenities')}
            placeholder="Amenities (comma-separated)"
            className="border p-2 rounded-lg w-full mb-4"
            type="text"
          />
          {errors.amenities && <p className="text-red-500">{errors.amenities.message}</p>}

          <button type="submit" className="text-blue-500 hover:text-blue-700">Search</button>
        </form>
        <div className="max-h-60 overflow-auto">
          {searchResults?.map((hotel) => (
            <div
              key={hotel.id}
              className="p-2 hover:bg-gray-100 cursor-pointer text-black"
              onClick={() => handleSelect(hotel)}
            >
              {hotel.name}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="text-red-600 hover:text-red-800 mt-4">Close</button>
      </div>
    </div>
  );
};

export default ChangeHotelPopup;
