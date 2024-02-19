import React, { useState } from 'react';

const AddDayPlanForm = ({ itineraryId, onAddSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `http://localhost:4000/api/v1/itineraries/${itineraryId}/dayPlan`;
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to add new day plan');
      }
      onAddSuccess(); // Notify parent component of the successful addition
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add a New Day Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Day Plan
            </button>
            <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDayPlanForm;
