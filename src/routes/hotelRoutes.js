// routes/hotelRoutes.js

import express from 'express';
import * as hotelController from '../controllers/hotelController.js';

const router = express.Router();

router.get('/search', hotelController.searchHotels);

router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
router.post('/', hotelController.createHotels);
router.put('/:id', hotelController.updateHotel);
router.delete('/:id', hotelController.deleteHotel);




export default router;
