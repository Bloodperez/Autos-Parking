import React from 'react';

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

const VehicleList: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4"></h2>

      {vehicles.length === 0 ? (
        <p>No hay vehículos registrados actualmente.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th>Placa</th>
              <th>Tipo</th>
              <th>Marca/Modelo</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Novedad</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={index} className="border-t">
                <td>{vehicle.plate}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.brand} {vehicle.model}</td>
                <td>{vehicle.parkingSpot}</td>
                <td>{vehicle.status}</td>
                <td>{vehicle.user}</td>
                <td>{vehicle.novelty}</td>
                <td>{vehicle.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehicleList;
