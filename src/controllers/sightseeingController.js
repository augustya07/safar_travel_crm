import Sightseeing from '../models/Sightseeing.js'; 

// Add a new sightseeing location
const addSightseeing = async (req, res) => {
    try {
        // Check if the request body is an array
        const sightseeingData = Array.isArray(req.body) ? req.body : [req.body];
        // Use insertMany to insert single or multiple documents
        const newSightseeings = await Sightseeing.insertMany(sightseeingData);
        res.status(201).json(newSightseeings);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};

// Get all sightseeing locations
const getSightseeings = async (req, res) => {
  try {
    const sightseeings = await Sightseeing.find();
    res.status(200).json(sightseeings);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single sightseeing location by ID
const getSightseeingById = async (req, res) => {
  try {
    const { id } = req.params;
    const sightseeing = await Sightseeing.findById(id);
    if (!sightseeing) res.status(404).json({ message: 'Sightseeing not found' });
    else res.status(200).json(sightseeing);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a sightseeing location
const updateSightseeing = async (req, res) => {
  try {
    const { id } = req.params;
    const sightseeing = await Sightseeing.findByIdAndUpdate(id, req.body, { new: true });
    if (!sightseeing) res.status(404).json({ message: 'Sightseeing not found' });
    else res.status(200).json(sightseeing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a sightseeing location
const deleteSightseeing = async (req, res) => {
  try {
    const { id } = req.params;
    const sightseeing = await Sightseeing.findByIdAndDelete(id);
    if (!sightseeing) res.status(404).json({ message: 'Sightseeing not found' });
    else res.status(200).json({ message: 'Sightseeing deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchSightseeing = async (req, res) => {
    try {
      const { query } = req.query; // Assuming the search query comes from a query string parameter named 'query'
      // Search in name, description, and location fields
      const searchResult = await Sightseeing.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive search in the name field
          { description: { $regex: query, $options: 'i' } }, // Case-insensitive search in the description field
          { location: { $regex: query, $options: 'i' } } // Case-insensitive search in the location field
        ]
      });
      res.status(200).json(searchResult);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  

// Exporting all controller functions as an object
export const sightseeingController = {
  addSightseeing,
  getSightseeings,
  getSightseeingById,
  updateSightseeing,
  deleteSightseeing,
  searchSightseeing
};
