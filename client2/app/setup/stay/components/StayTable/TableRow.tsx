interface TableRowProps {
  hotel: {
    imageUrl: string;
    name: string;
    rating: number;
    type: string;
    contactNumber: string;
    price: number;
    address: string;
    location: string;
  }
}

export default function TableRow({ hotel }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name} 
          className="h-16 w-24 object-cover rounded"
        />
      </td>
      <td className="px-4 py-3">{hotel.name}</td>
      <td className="px-4 py-3">{hotel.rating}</td>
      <td className="px-4 py-3">{hotel.type}</td>
      <td className="px-4 py-3">{hotel.contactNumber}</td>
      <td className="px-4 py-3">₹ {hotel.price}</td>
      <td className="px-4 py-3">{hotel.address}</td>
      <td className="px-4 py-3">{hotel.location}</td>
      <td className="px-4 py-3">
        <button className="text-gray-600 hover:text-gray-900">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </td>
    </tr>
  )
}
