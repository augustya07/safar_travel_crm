"use client"
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  destination: z.string().optional(),
  dateOfTravel: z.string().optional(),
  numberOfNights: z.number().optional(),
  hotelCategory: z.string().optional(),
  mealPlan: z.string().optional(),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateItineraryForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Construct query parameters, filtering out undefined and empty string values
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== '') { // Exclude fields that are undefined or empty
        queryParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(`http://localhost:4000/api/v1/itineraries/search-itineraries?${queryParams}`);
      const itineraries = await response.json();
      console.log(itineraries);
      // Handle the response, e.g., display search results
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      // Handle error, e.g., display error message
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-10 text-gray-700">Create New Itinerary</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-900">Destination*</label>
            <input {...register('destination')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Destination" />
            {errors.destination && <p className="text-red-500 text-xs mt-2">{errors.destination.message}</p>}
          </div>

          <div className="flex flex-wrap -mx-3 mb-5">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label htmlFor="dateOfTravel" className="block mb-2 text-sm font-medium text-gray-900">Date of Travel*</label>
              <input type="date" {...register('dateOfTravel')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              {errors.dateOfTravel && <p className="text-red-500 text-xs mt-2">{errors.dateOfTravel.message}</p>}
            </div>
            {/* <div className="w-full md:w-1/2 px-3">
              <label htmlFor="numberOfNights" className="block mb-2 text-sm font-medium text-gray-900">No of Nights*</label>
              <input type="number" {...register('numberOfNights', { valueAsNumber: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="No of Nights" />
              {errors.numberOfNights && <p className="text-red-500 text-xs mt-2">{errors.numberOfNights.message}</p>}
            </div> */}
          </div>

          <div className="mb-5">
            <label htmlFor="hotelCategory" className="block mb-2 text-sm font-medium text-gray-900">Hotel Category</label>
            <select {...register('hotelCategory')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="">Select Category</option>
              <option value="3-star">2-Star</option>
              <option value="3-star">3-Star</option>
              <option value="4-star">4-Star</option>
              <option value="5-star">5-Star</option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="mealPlan" className="block mb-2 text-sm font-medium text-gray-900">Meal Plan</label>
            <select {...register('mealPlan')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="">Select Meal Plan</option>
              <option value="room-only">Room Only</option>
              <option value="bed-breakfast">Bed & Breakfast</option>
              <option value="half-board">Half Board</option>
              <option value="full-board">Full Board</option>
              <option value="All Inclusive">All Inclusive</option>
            </select>
          </div>

          {/* <div className="mb-5">
            <label htmlFor="roomsAndGuests" className="block mb-2 text-sm font-medium text-gray-900">Rooms and Guests</label>
            <select {...register('roomsAndGuests')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="1 Room, 2 Guests">1 Room, 2 Guests</option>
              <option value="2 Rooms, 4 Guests">2 Rooms, 4 Guests</option>
              <option value="3 Rooms, 6 Guests">3 Rooms, 6 Guests</option>
            </select>
          </div>

          <div className="mb-5 flex items-center">
            <input type="checkbox" {...register('airportTransfers')} className="w-4 h-4 text-blue-600 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500" />
            <label htmlFor="airportTransfers" className="ml-2 text-sm font-medium text-gray-900">Airport Transfers</label>
          </div> */}

          <div className="flex flex-wrap -mx-3 mb-5">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label htmlFor="budgetMin" className="block mb-2 text-sm font-medium text-gray-900">Minimum Budget</label>
              <input {...register('budgetMin')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Min" />
              {errors.budgetMin && <p className="text-red-500 text-xs mt-2">{errors.budgetMin.message}</p>}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="budgetMax" className="block mb-2 text-sm font-medium text-gray-900">Maximum Budget</label>
              <input {...register('budgetMax')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Max" />
              {errors.budgetMax && <p className="text-red-500 text-xs mt-2">{errors.budgetMax.message}</p>}
            </div>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => reset()} className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Reset
            </button>
            <button type="submit" className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              Create Itinerary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateItineraryForm;


// import React from 'react';

// const CreateItineraryForm = () => {
//     return (
//         <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//             <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl">
//                 <h2 className="text-2xl font-bold mb-10 text-gray-700">Create New Itinerary</h2>

//                 <form>
//                     {/* Destination */}
//                     <div className="mb-5">
//                         <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-900">Destination*</label>
//                         <input type="text" id="destination" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Destination" required />
//                     </div>

//                     {/* Date of Travel and Number of Nights */}
//                     <div className="flex flex-wrap -mx-3 mb-5">
//                         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                             <label htmlFor="date-of-travel" className="block mb-2 text-sm font-medium text-gray-900">Date of Travel*</label>
//                             <input type="date" id="date-of-travel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
//                         </div>
//                         <div className="w-full md:w-1/2 px-3">
//                             <label htmlFor="number-of-nights" className="block mb-2 text-sm font-medium text-gray-900">No of Nights*</label>
//                             <input type="number" id="number-of-nights" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="No of Nights" required />
//                         </div>
//                     </div>

//                     {/* Hotel Category */}
//                     <div className="mb-5">
//                         <label htmlFor="hotel-category" className="block mb-2 text-sm font-medium text-gray-900">Hotel Category</label>
//                         <select id="hotel-category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
//                             <option>Hotel Category</option>
//                             {/* Options should be added here */}
//                         </select>
//                     </div>

//                     {/* Meal Plan */}
//                     <div className="mb-5">
//                         <label htmlFor="meal-plan" className="block mb-2 text-sm font-medium text-gray-900">Meal Plan</label>
//                         <select id="meal-plan" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
//                             <option>Meal Plan</option>
//                             {/* Options should be added here */}
//                         </select>
//                     </div>

//                     {/* Rooms and Guests */}
//                     <div className="mb-5">
//                         <label htmlFor="rooms-and-guests" className="block mb-2 text-sm font-medium text-gray-900">Rooms and Guests</label>
//                         <select id="rooms-and-guests" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
//                             <option>1 Room, 2 Guest</option>
//                             {/* More options can be added here */}
//                         </select>
//                     </div>

//                     {/* Airport Transfers Checkbox */}
//                     <div className="mb-5 flex items-center">
//                         <input id="airport-transfers" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500" />
//                         <label htmlFor="airport-transfers" className="ml-2 text-sm font-medium text-gray-900">Airport Transfers</label>
//                     </div>
//                     {/* Budget Range */}
//                     <div className="flex flex-wrap -mx-3 mb-5">
//                         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                             <label htmlFor="budget-min" className="block mb-2 text-sm font-medium text-gray-900">Budget Range</label>
//                             <input type="text" id="budget-min" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Min" required />
//                         </div>
//                         <div className="w-full md:w-1/2 px-3">
//                             <input type="text" id="budget-max" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-7" placeholder="Max" required />
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex justify-between">
//                         <button type="button" className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
//                             Reset
//                         </button>
//                         <button type="button" className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
//                             Create Itinerary
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default CreateItineraryForm;

// CreateItineraryForm.tsx



