import FollowUp from '../models/followupSchema.js';

export const createFollowUp = async (leadId, description, date, assignedTo) => {
  try {
    const newFollowUp = new FollowUp({
      leadId,
      description,
      date,
      assignedTo
    });

    const savedFollowUp = await newFollowUp.save();
    console.log('Follow-Up Created:', savedFollowUp);
    return savedFollowUp;
  } catch (error) {
    console.error('Error creating follow-up:', error);
    throw error;
  }
};

export const updateFollowUp = async (followUpId, updates) => {
    try {
      const updatedFollowUp = await FollowUp.findByIdAndUpdate(followUpId, updates, { new: true });
      console.log('Follow-Up Updated:', updatedFollowUp);
      return updatedFollowUp;
    } catch (error) {
      console.error('Error updating follow-up:', error);
      throw error;
    }
  };

  export const getFollowUpsForLead = async (leadId) => {
    try {
      const followUps = await FollowUp.find({ leadId }).populate('assignedTo');
      console.log('Follow-Ups for Lead:', followUps);
      return followUps;
    } catch (error) {
      console.error('Error retrieving follow-ups:', error);
      throw error;
    }
  };


  export const deleteFollowUp = async (followUpId) => {
    try {
      const result = await FollowUp.findByIdAndDelete(followUpId);
      console.log('Follow-Up Deleted:', result);
      return result;
    } catch (error) {
      console.error('Error deleting follow-up:', error);
      throw error;
    }
  };