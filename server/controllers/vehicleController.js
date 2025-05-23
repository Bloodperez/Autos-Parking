import Vehicle from '../models/Vehicle.js';

// Get all vehicles
export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a specific vehicle by plate
export const getVehicleByPlate = async (req, res) => {
  const { plate } = req.params;
  
  try {
    const vehicle = await Vehicle.findOne({ plate: plate.toUpperCase() });
    
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new vehicle entry
export const createVehicle = async (req, res) => {
  const vehicle = req.body;
  
  try {
    // Check if vehicle already exists and is parked
    const existingVehicle = await Vehicle.findOne({ 
      plate: vehicle.plate.toUpperCase(),
      status: 'parked'
    });
    
    if (existingVehicle) {
      return res.status(400).json({ message: "Vehicle already parked" });
    }
    
    const newVehicle = new Vehicle({
      ...vehicle,
      plate: vehicle.plate.toUpperCase(),
      entryTime: new Date(),
      status: 'parked'
    });
    
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update vehicle status to 'exited' and calculate fee
export const exitVehicle = async (req, res) => {
  const { plate } = req.params;
  const { fee } = req.body;
  
  try {
    const vehicle = await Vehicle.findOne({ 
      plate: plate.toUpperCase(),
      status: 'parked'
    });
    
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found or already exited" });
    }
    
    vehicle.exitTime = new Date();
    vehicle.status = 'exited';
    vehicle.fee = fee || calculateFee(vehicle.entryTime, new Date());
    
    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to calculate parking fee
const calculateFee = (entryTime, exitTime) => {
  const hours = Math.ceil((exitTime - entryTime) / (1000 * 60 * 60));
  // Basic fee calculation (customize as needed)
  return hours * 5; // $5 per hour
};