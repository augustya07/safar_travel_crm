import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// Import routes using ES6
import hotelRoutes from './routes/hotelRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import transportRoute from './routes/transportRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import sightseeingRoutes from './routes/sightseeingRoutes.js'
import leadRoutes from './routes/leadRoutes.js'


import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use(express.json());


const connectToDatabase = async () => {
    try {
      const username = encodeURIComponent(process.env.DB_USERNAME);
      const password = encodeURIComponent(process.env.DB_PASSWORD);
      const dbname = process.env.DB_NAME;
      
      const connectionString = `mongodb+srv://austy:GklyiUeVieeLPHn6@safar.gi753b9.mongodb.net/safar?retryWrites=true&w=majority`;
  
      await mongoose.connect(connectionString, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      });
      console.log('MongoDB connection established');
    } catch (error) {
      console.error('MongoDB connection failed:', error.message);
    }
  };
  
  connectToDatabase();

app.use('/api/v1/hotels', hotelRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/transports', transportRoute);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/itineraries', itineraryRoutes);
app.use('/api/v1/sightseeing', sightseeingRoutes)
app.use('/api/v1/lead', leadRoutes)



export default app;
