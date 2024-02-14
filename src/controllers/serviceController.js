// controllers/serviceController.js

import Service from '../models/Service.js';

// Get all services from the database
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by its ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a single service or multiple services
export const createService = async (req, res) => {
  try {
    let createdServices;
    if (Array.isArray(req.body)) {
      // Handle multiple service creations
      createdServices = await Service.insertMany(req.body);
    } else {
      // Handle single service creation
      const newService = new Service(req.body);
      await newService.save();
      createdServices = [newService];
    }
    res.status(201).json(createdServices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a service by its ID
export const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service by its ID
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
