// controllers/itineraryController.js

import Itinerary from '../models/Itinerary.js';

export const getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({});
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createItinerary = async (req, res) => {
  try {
    const newItinerary = new Itinerary(req.body);
    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateItinerary = async (req, res) => {
  try {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.status(200).json(updatedItinerary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteItinerary = async (req, res) => {
  try {
    const deletedItinerary = await Itinerary.findByIdAndDelete(req.params.id);
    if (!deletedItinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
