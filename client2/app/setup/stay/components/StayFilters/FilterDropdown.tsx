'use client'

export default function FilterDropdown() {
  return (
    <select className="border rounded-md px-3 py-2">
      <option value="">All Types</option>
      <option value="hotel">Hotel</option>
      <option value="resort">Resort</option>
      <option value="camping">Camping</option>
      <option value="stay">Stay</option>
    </select>
  )
}
