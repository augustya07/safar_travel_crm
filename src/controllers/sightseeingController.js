import Sightseeing from '../models/Sightseeing.js'; 

// Add a new sightseeing location
const addSightseeing = async (req, res) => {
  try {
    const newSightseeing = new Sightseeing(req.body);
    await newSightseeing.save();
    res.status(201).json(newSightseeing);
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

// Exporting all controller functions as an object
export const sightseeingController = {
  addSightseeing,
  getSightseeings,
  getSightseeingById,
  updateSightseeing,
  deleteSightseeing,
};
