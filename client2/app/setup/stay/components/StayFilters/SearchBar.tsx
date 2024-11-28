'use client'

export default function SearchBar() {
  return (
    <div className="flex-grow">
      <input 
        type="search" 
        placeholder="Search hotels..." 
        className="w-full border rounded-md px-3 py-2"
        onChange={(e) => {
          // Add search functionality here
          console.log(e.target.value)
        }}
      />
    </div>
  )
}
