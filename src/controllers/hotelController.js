// controllers/hotelController.js

import Hotel from '../models/Hotel.js';

export const searchHotels = async (req, res) => {
  try {
    const query = {};
    const { name, rating, minPrice, maxPrice, location, category, mealPlan, amenities } = req.query;

    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    if (rating) {
      query.rating = rating;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' }; // Case-insensitive search
    }

    if (category) {
      query.category = category;
    }

    if (mealPlan) {
      query.mealPlan = mealPlan;
    }

    if (amenities) {
      // Assuming amenities is a string of comma-separated values
      const amenitiesList = amenities.split(',');
      query['amenities.items'] = { $all: amenitiesList }; // This assumes your amenitiesSchema defines items as an array of strings
    }

    const hotels = await Hotel.find(query);

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error: ' + err.message
    });
  }
};

// Get all hotels
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single hotel by name
export const getHotelByName = async (req, res) => {
    try {
      const hotel = await Hotel.findOne({ name: req.params.name });
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Get a single hotel by ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHotels = async (req, res) => {
  try {
    let newHotels;
    // Check if the request contains an array of hotels
    if (Array.isArray(req.body)) {
      // Log the request body for debugging purposes
      console.log(req.body);
      newHotels = await Hotel.insertMany(req.body, { ordered: false });
    } else {
      // Handle single hotel creation
      const newHotel = new Hotel(req.body);
      await newHotel.save();
      newHotels = [newHotel];
    }
    res.status(201).json(newHotels);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: error.message }); // Send error message in response
  }
};



// Update a hotel by ID
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a hotel by ID
export const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
