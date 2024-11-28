import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Sightseeing {
    id: number;
    name: string;
    description: string;
    location: string;
}

interface ChangeSightseeingPopupProps {
    onClose: () => void;
    onSelectSightseeing: (sightseeing: Sightseeing) => void;
}

const searchSchema = z.object({
    query: z.string().min(1, "Please enter a search term").optional(), // Ensuring at least something is entered
});

type SearchFormInputs = z.infer<typeof searchSchema>;

const SightseeingPopup: React.FC<ChangeSightseeingPopupProps> = ({ onClose, onSelectSightseeing }) => {
    const [searchResults, setSearchResults] = useState<Sightseeing[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchSchema),
    });

    const searchSightseeing: SubmitHandler<SearchFormInputs> = async (data) => {
        const queryParams = new URLSearchParams();
        if (data.query) queryParams.append('query', data.query);

        try {
            const response = await fetch(`http://localhost:4000/api/v1/sightseeing/search?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const results: Sightseeing[] = await response.json();
            setSearchResults(results); // Update the search results state
        } catch (error) {
            console.error("Failed to search sightseeing:", error);
        }
    };

    const handleSelect = (sightseeing: Sightseeing) => {
        onSelectSightseeing(sightseeing); // Pass the selected sightseeing back to the parent component
        onClose(); // Close the popup
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-lg font-bold mb-4">Search Sightseeing</h2>
                <form onSubmit={handleSubmit(searchSightseeing)} className="space-y-4">
                    <input
                        {...register('query')}
                        placeholder="Search by name, description, location"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    {errors.query && <p className="text-red-500">{errors.query.message}</p>}
                    <button type="submit" className="text-blue-500 hover:text-blue-700">Search</button>
                </form>
                <div className="max-h-60 overflow-auto">
                    {searchResults?.map((sightseeing) => (
                        <div
                            key={sightseeing.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                            onClick={() => handleSelect(sightseeing)}
                        >
                            {`${sightseeing.name} - ${sightseeing.location}`}
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="text-red-600 hover:text-red-800 mt-4">Close</button>
            </div>
        </div>
    );
};

export default SightseeingPopup;
