const API_URL = 'http://localhost:5000/api';

export interface Vehicle {
  _id?: string;
  plate: string;
  type: 'car' | 'motorcycle' | 'truck';
  brand: string;
  model: string;
  color: string;
  entryTime?: Date;
  exitTime?: Date | null;
  status: 'parked' | 'exited';
  parkingSpot: string;
  fee?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Get all vehicles
export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await fetch(`${API_URL}/vehicles`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

// Get vehicle by plate
export const getVehicleByPlate = async (plate: string): Promise<Vehicle | null> => {
  try {
    const response = await fetch(`${API_URL}/vehicles/${plate}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return null;
  }
};

// Register new vehicle
export const registerVehicle = async (vehicleData: Vehicle): Promise<Vehicle | null> => {
  try {
    const response = await fetch(`${API_URL}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error registering vehicle:', error);
    return null;
  }
};

// Register vehicle exit
export const exitVehicle = async (plate: string, fee?: number): Promise<Vehicle | null> => {
  try {
    const response = await fetch(`${API_URL}/vehicles/exit/${plate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fee }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error registering vehicle exit:', error);
    return null;
  }
};