import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import UserForm from "./components/UserForm";
import CellForm from "./components/CellForm";

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

interface User {
  name: string;
  email: string;
}

interface Cell {
  number: string;
  type: string;
}

const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {users.map((user, i) => (
        <div key={i} className="border rounded p-4 shadow bg-white">
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ))}
    </div>
  );
};

const CellList: React.FC<{ cells: Cell[] }> = ({ cells }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cells.map((cell, i) => (
        <div key={i} className="border rounded p-4 shadow bg-white">
          <p><strong>Número:</strong> {cell.number}</p>
          <p><strong>Tipo:</strong> {cell.type}</p>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [cells, setCells] = useState<Cell[]>([]);

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles([...vehicles, vehicle]);
  };

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const addCell = (cell: Cell) => {
    setCells([...cells, cell]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-blue-500 text-white p-7 text-2xl font-bold">Parqueadero Autos Colombia</header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <nav className="w-50 bg-blue-100 shadow p-6 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Inicio
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600"
            >
              Registrar Vehículo
            </Link>
            <Link
              to="/register-user"
              className="text-gray-700 hover:text-blue-600"
            >
              Usuario
            </Link>
            <Link
              to="/register-cell"
              className="text-gray-700 hover:text-blue-600"
            >
              Celda
            </Link>
          </nav>

          {/* Main content */}
          <main className="flex-1 container mx-auto p-6 overflow-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    {/* Vehículos */}
                    {vehicles.length > 0 && (
                      <>
                        <h2 className="text-xl font-bold mb-2">Vehículos Registrados</h2>
                        <VehicleList vehicles={vehicles} />
                      </>
                    )}

                    {/* Usuarios */}
                    {users.length > 0 && (
                      <>
                        <h2 className="text-xl font-bold mt-6 mb-2">Usuarios Registrados</h2>
                        <UserList users={users} />
                      </>
                    )}

                    {/* Celdas */}
                    {cells.length > 0 && (
                      <>
                        <h2 className="text-xl font-bold mt-6 mb-2">Celdas Registradas</h2>
                        <CellList cells={cells} />
                      </>
                    )}

                    {/* Mensaje si no hay nada */}
                    {vehicles.length === 0 && users.length === 0 && cells.length === 0 && (
                      <p>No hay datos registrados todavía.</p>
                    )}
                  </div>
                }
              />
              <Route path="/register" element={<VehicleForm addVehicle={addVehicle} />} />
              <Route path="/register-user" element={<UserForm addUser={addUser} />} />
              <Route path="/register-cell" element={<CellForm addCell={addCell} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
