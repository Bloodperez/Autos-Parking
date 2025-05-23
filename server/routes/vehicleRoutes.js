import express from 'express';
import { getVehicles, getVehicleByPlate, createVehicle, exitVehicle } from '../controllers/vehicleController.js';

const router = express.Router();

// GET all vehicles
router.get('/', getVehicles);

// GET vehicle by plate
router.get('/:plate', getVehicleByPlate);

// POST new vehicle
router.post('/', createVehicle);

// PUT vehicle exit
router.put('/exit/:plate', exitVehicle);

export default router;