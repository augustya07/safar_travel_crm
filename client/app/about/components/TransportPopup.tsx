import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Transport {
    id: number;
    type: string;
    rating: number;
    price: number;
    frequency: string;
    route: {
        from: string;
        to: string;
    };
}

interface ChangeTransportPopupProps {
    onClose: () => void;
    onSelectTransport: (transport: Transport) => void;
}

const searchSchema = z.object({
    type: z.string().optional(),
    rating: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    frequency: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
});

type SearchFormInputs = z.infer<typeof searchSchema>;

const TransportPopup: React.FC<ChangeTransportPopupProps> = ({ onClose, onSelectTransport }) => {
    const [searchResults, setSearchResults] = useState<Transport[]>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchSchema),
    });

    const searchTransports: SubmitHandler<SearchFormInputs> = async (data) => {
        const queryParams = new URLSearchParams();
        Object.keys(data).forEach(key => {
            if (data[key]) queryParams.append(key, data[key]);
        });

        try {
            const response = await fetch(`http://localhost:4000/api/v1/transports/search?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const results: { data: Transport[] } = await response.json();
            setSearchResults(results.data); // Update the search results state
        } catch (error) {
            console.error("Failed to search transports:", error);
        }
    };

    const handleSelect = (transport: Transport) => {
        onSelectTransport(transport); // Pass the selected transport back to the parent component
        onClose(); // Close the popup
    };

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-lg font-bold mb-4">Change Transport</h2>
                <form onSubmit={handleSubmit(searchTransports)} className="space-y-4">
                    <input
                        {...register('type')}
                        placeholder="Type of transport"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    {/* Remove rating field as it's not needed */}
                    <input
                        {...register('minPrice')}
                        placeholder="Minimum Price"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    <input
                        {...register('maxPrice')}
                        placeholder="Maximum Price"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    <input
                        {...register('frequency')}
                        placeholder="Frequency"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    <input
                        {...register('from')}
                        placeholder="From location"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    <input
                        {...register('to')}
                        placeholder="To location"
                        className="border p-2 rounded-lg w-full mb-2 text-black"
                        type="text"
                    />
                    {/* Render error messages if any field has an error */}
                    {Object.keys(errors).map((errorKey) => (
                        errors[errorKey] && <p key={errorKey} className="text-red-500">{errors[errorKey].message}</p>
                    ))}
                    <button type="submit" className="text-blue-500 hover:text-blue-700">Search</button>
                </form>
                <div className="max-h-60 overflow-auto">
                    {searchResults?.map((transport) => (
                        <div
                            key={transport.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                            onClick={() => handleSelect(transport)}
                        >
                            {`${transport.type} from ${transport.route.from} to ${transport.route.to}`}
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="text-red-600 hover:text-red-800 mt-4">Close</button>
            </div>
        </div>
    );
};

export default TransportPopup;
