import React, { useState } from 'react';

interface Vehicle {
  plate: string;
  type: string;
  brand: string;
  model: string;
  color: string;
  parkingSpot: string;
  status: string;
  user: string;
  novelty: string;
  payment: string;
}

const VehicleForm: React.FC<{ addVehicle: (vehicle: Vehicle) => void }> = ({ addVehicle }) => {
  const [vehicle, setVehicle] = useState<Vehicle>({
    plate: '',
    type: 'car',
    brand: '',
    model: '',
    color: '',
    parkingSpot: '',
    status: 'parked',
    user: '',
    novelty: '',
    payment: ''
  });

  const handleChange = (key: keyof Vehicle, value: string) => {
    setVehicle((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVehicle(vehicle);

    setVehicle({
      plate: '',
      type: 'car',
      brand: '',
      model: '',
      color: '',
      parkingSpot: '',
      status: 'parked',
      user: '',
      novelty: '',
      payment: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Registrar Nuevo Vehículo</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* PLACA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
            <div
              contentEditable
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              onInput={(e) => handleChange("plate", (e.target as HTMLDivElement).innerText)}
            ></div>
          </div>

          {/* TIPO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vehículo</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value="car"
                  checked={vehicle.type === 'car'}
                  onChange={() => handleChange('type', 'car')}
                  className="text-blue-600"
                />
                <span>Automóvil</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value="motorcycle"
                  checked={vehicle.type === 'motorcycle'}
                  onChange={() => handleChange('type', 'motorcycle')}
                  className="text-blue-600"
                />
                <span>Motocicleta</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value="truck"
                  checked={vehicle.type === 'truck'}
                  onChange={() => handleChange('type', 'truck')}
                  className="text-blue-600"
                />
                <span>Camión</span>
              </label>
            </div>
          </div>

          {/* MARCA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <div
              contentEditable
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              onInput={(e) => handleChange("brand", (e.target as HTMLDivElement).innerText)}
            ></div>
          </div>

          {/* MODELO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <div
              contentEditable
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              onInput={(e) => handleChange("model", (e.target as HTMLDivElement).innerText)}
            ></div>
          </div>

          {/* COLOR */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div
              contentEditable
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              onInput={(e) => handleChange("color", (e.target as HTMLDivElement).innerText)}
            ></div>
          </div>

          {/* UBICACIÓN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <div
              contentEditable
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              onInput={(e) => handleChange("parkingSpot", (e.target as HTMLDivElement).innerText)}
            ></div>
          </div>

          {/* USUARIO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <div
              contentEditable
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              onInput={(e) => handleChange("user", (e.target as HTMLDivElement).innerText)}
            ></div>
          </div>

          {/* NOVEDAD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Novedad</label>
            <div
              contentEditable
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              onInput={(e) => handleChange("novelty", (e.target as HTMLDivElement).innerText)}
            ></div>
          </div>

          {/* PAGO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pago</label>
            <div
              contentEditable
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              onInput={(e) => handleChange("payment", (e.target as HTMLDivElement).innerText)}
            ></div>
          </div>

        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Registrar Vehículo
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
