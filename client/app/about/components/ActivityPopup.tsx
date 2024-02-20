import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Activity {
    id: number;
    name: string;
    location: string;
    price: number;
    isActive: boolean;
}

interface ChangeActivityPopupProps {
    onClose: () => void;
    onSelectActivity: (activity: Activity) => void;
}

const searchSchema = z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    // minPrice: z.number().optional(),
    // maxPrice: z.number().optional(),
    // isActive: z.union([z.literal('true'), z.literal('false')]).optional(),
});

type SearchFormInputs = z.infer<typeof searchSchema>;

const ActivityPopup: React.FC<ChangeActivityPopupProps> = ({ onClose, onSelectActivity }) => {
    const [searchResults, setSearchResults] = useState<Activity[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchSchema),
    });

    const searchActivities: SubmitHandler<SearchFormInputs> = async (data) => {
        const queryParams = new URLSearchParams();
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) queryParams.append(key, data[key]);
        });

        try {
            const response = await fetch(`http://localhost:4000/api/v1/activities/search?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const results: Activity[] = await response.json();
            setSearchResults(results); // Update the search results state
        } catch (error) {
            console.error("Failed to search activities:", error);
        }
    };

    const handleSelect = (activity: Activity) => {
        onSelectActivity(activity); // Pass the selected activity back to the parent component
        onClose(); // Close the popup
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-lg font-bold mb-4">Search Activities</h2>
                <form onSubmit={handleSubmit(searchActivities)} className="space-y-4">
                    <input
                        {...register('name')}
                        placeholder="Activity name"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    <input
                        {...register('location')}
                        placeholder="Location"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    {/* <input
                        {...register('minPrice', { valueAsNumber: true })}
                        placeholder="Minimum Price"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="number"
                    />
                    <input
                        {...register('maxPrice', { valueAsNumber: true })}
                        placeholder="Maximum Price"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="number"
                    /> */}
                    {/* <select
                        {...register('isActive')}
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                    >
                        <option value="">Is Active?</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select> */}
                    {Object.keys(errors).map((errorKey) => (
                        errors[errorKey] && <p key={errorKey} className="text-red-500">{errors[errorKey].message}</p>
                    ))}
                    <button type="submit" className="text-blue-500 hover:text-blue-700">Search</button>
                </form>
                <div className="max-h-60 overflow-auto">
                    {searchResults?.map((activity) => (
                        <div
                            key={activity.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                            onClick={() => handleSelect(activity)}
                        >
                            {`${activity.name} - ${activity.location} - $${activity.price} - ${activity.isActive ? 'Active' : 'Inactive'}`}
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="text-red-600 hover:text-red-800 mt-4">Close</button>
            </div>
        </div>
    );
};

export default ActivityPopup;
