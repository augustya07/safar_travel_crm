// controllers/activityController.js

import Activity from '../models/Activity.js';

// Retrieve all activities from the database
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single activity by its ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a single activity or multiple activities
export const createActivity = async (req, res) => {
  try {
    // Check if the request contains an array of activities
    if (Array.isArray(req.body)) {
      // Handle creation of multiple activities
      const newActivities = await Activity.insertMany(req.body);
      res.status(201).json(newActivities);
    } else {
      // Handle creation of a single activity
      const newActivity = new Activity(req.body);
      await newActivity.save();
      res.status(201).json(newActivity);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an activity by its ID
export const updateActivity = async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an activity by its ID
export const deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const searchActivities = async (req, res) => {
  try {
    const { name, type, minPrice, maxPrice, location, isActive } = req.query;

    // Build the query object based on provided search criteria
    let query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
    }

    if (type) {
      query.type = type;
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice !== undefined) {
      query.price = { $gte: minPrice };
    } else if (maxPrice !== undefined) {
      query.price = { $lte: maxPrice };
    }

    if (location) {
      query.location = { $regex: new RegExp(location, 'i') }; // Case-insensitive search
    }

    if (isActive) {
      query.isActive = isActive === 'true'; // Convert query parameter to boolean
    }

    const activities = await Activity.find(query);
    res.json(activities);
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
};
