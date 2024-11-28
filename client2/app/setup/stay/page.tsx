import { getHotels } from '../../lib/actions/hotel-action'
import TableHeader from './components/StayTable/TableHeader'
import TableRow from './components/StayTable/TableRow'
import FilterDropdown from './components/StayFilters/FilterDropdown'
import SearchBar from './components/StayFilters/SearchBar'
import AddStayButton from './components/AddStayButton'

export default async function StaySetupPage() {
  const hotels = await getHotels()
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Stay</h1>
        <AddStayButton />
      </div>

      <div className="flex gap-4 mb-6">
        <select className="border rounded-md px-3 py-2">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>

        <FilterDropdown />
        <SearchBar />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.map((hotel) => (
              <TableRow key={hotel._id} hotel={hotel} />
            ))}
          </tbody>
        </table>
      </div>


    </div>
  )
}