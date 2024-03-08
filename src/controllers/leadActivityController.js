import Activity from '../models/leadActivitySchema.js';

// Log an activity for a lead
export const logActivity = async (req, res) => {
  const { leadId } = req.params;
  const { description, timestamp } = req.body;
  const { userId } = req; // Assuming user ID is available from authenticated session

  if (!description || !timestamp) {
    return res.status(400).json({ error: 'Description and timestamp are required' });
  }

  try {
    const newActivity = new Activity({
      leadId,
      description,
      timestamp,
      createdBy: userId
    });

    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all activities for a lead
export const getActivitiesForLead = async (req, res) => {
  const { leadId } = req.params;

  try {
    const activities = await Activity.find({ leadId }).populate('createdBy').sort({ timestamp: -1 });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an activity
export const updateActivity = async (req, res) => {
  const { activityId } = req.params;
  const { description, timestamp } = req.body;

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(activityId, {
      description,
      timestamp
    }, { new: true });

    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an activity
export const deleteActivity = async (req, res) => {
  const { activityId } = req.params;

  try {
    const deletedActivity = await Activity.findByIdAndDelete(activityId);

    if (!deletedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
