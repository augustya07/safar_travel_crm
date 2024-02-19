// controllers/transportController.js

import Transport from '../models/Transport.js';

// Get all transports from the database
export const getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find({});
    res.status(200).json(transports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single transport by its ID
export const getTransportById = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);
    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }
    res.status(200).json(transport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a single transport or multiple transports
export const createTransport = async (req, res) => {
  try {
    let createdTransports;
    if (Array.isArray(req.body)) {
      // Handle multiple transport creations
      createdTransports = await Transport.insertMany(req.body);
    } else {
      // Handle single transport creation
      const newTransport = new Transport(req.body);
      await newTransport.save();
      createdTransports = [newTransport];
    }
    res.status(201).json(createdTransports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a transport by its ID
export const updateTransport = async (req, res) => {
  try {
    const updatedTransport = await Transport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTransport) {
      return res.status(404).json({ message: 'Transport not found' });
    }
    res.status(200).json(updatedTransport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a transport by its ID
export const deleteTransport = async (req, res) => {
  try {
    const deletedTransport = await Transport.findByIdAndDelete(req.params.id);
    if (!deletedTransport) {
      return res.status(404).json({ message: 'Transport not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const search = async (req, res) => {
  const { type, rating, priceMin, priceMax, from, to, isActive } = req.query;
  let query = {};

  if (type) query.type = type;
  if (rating) query.rating = { $gte: parseInt(rating, 10) };
  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = parseInt(priceMin, 10);
    if (priceMax) query.price.$lte = parseInt(priceMax, 10);
  }
  if (from || to) {
    query['route'] = {};
    if (from) query['route'].from = new RegExp(from, 'i'); // Case insensitive search
    if (to) query['route'].to = new RegExp(to, 'i');
  }
  if (isActive) query.isActive = isActive === 'true';

  try {
    const transports = await Transport.find(query);
    res.status(200).json({
      success: true,
      count: transports.length,
      data: transports
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
