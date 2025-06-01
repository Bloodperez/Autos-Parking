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
  payment: string; // Campo pago
  entryTime?: string;  // Hora de entrada (formato HH:mm)
  exitTime?: string;   // Hora de salida (formato HH:mm)
  totalPayment?: number; // Total calculado
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

const PaymentList: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  // Solo vehículos con información de pago no vacía
  const vehiclesWithPayments = vehicles.filter(v => v.payment.trim() !== "");

  if (vehiclesWithPayments.length === 0) {
    return <p>No hay pagos registrados.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestión de Pagos</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead>
          <tr>
            <th className="border px-4 py-2">Placa</th>
            <th className="border px-4 py-2">Usuario</th>
            <th className="border px-4 py-2">Estado de Pago</th>
            <th className="border px-4 py-2">Hora Entrada</th>
            <th className="border px-4 py-2">Hora Salida</th>
            <th className="border px-4 py-2">Total a Pagar</th>
          </tr>
        </thead>
        <tbody>
          {vehiclesWithPayments.map((vehicle, idx) => (
            <tr key={idx} className="text-center border-t">
              <td className="border px-4 py-2">{vehicle.plate}</td>
              <td className="border px-4 py-2">{vehicle.user}</td>
              <td className="border px-4 py-2">{vehicle.payment}</td>
              <td className="border px-4 py-2">{vehicle.entryTime || "-"}</td>
              <td className="border px-4 py-2">{vehicle.exitTime || "-"}</td>
              <td className="border px-4 py-2">{vehicle.totalPayment ? `$${vehicle.totalPayment.toLocaleString()}` : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Función para calcular horas entre dos tiempos en formato HH:mm
function calculateHours(entry: string, exit: string): number {
  const [entryH, entryM] = entry.split(":").map(Number);
  const [exitH, exitM] = exit.split(":").map(Number);

  const start = entryH * 60 + entryM;
  let end = exitH * 60 + exitM;

  if (end < start) {
    // Asumimos que la salida fue al día siguiente
    end += 24 * 60;
  }

  const diffMinutes = end - start;
  const hours = diffMinutes / 60;

  // Redondeamos hacia arriba para cobrar cada hora completa
  return Math.ceil(hours);
}

const PaymentForm: React.FC<{
  vehicles: Vehicle[];
  updatePayment: (plate: string, paymentStatus: string, entryTime: string, exitTime: string, totalPayment: number) => void;
}> = ({ vehicles, updatePayment }) => {
  const [plate, setPlate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [calculatedTotal, setCalculatedTotal] = useState<number | null>(null);

  const PRICE_PER_HOUR = 4000;

  // Actualizar total al cambiar entrada o salida
  React.useEffect(() => {
    if (entryTime && exitTime) {
      const hours = calculateHours(entryTime, exitTime);
      setCalculatedTotal(hours * PRICE_PER_HOUR);
    } else {
      setCalculatedTotal(null);
    }
  }, [entryTime, exitTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate || !paymentStatus || !entryTime || !exitTime) {
      alert("Por favor complete todos los campos.");
      return;
    }

    // Validar que el vehículo exista
    const vehicleExists = vehicles.some(v => v.plate === plate);
    if (!vehicleExists) {
      alert("No se encontró un vehículo con esa placa.");
      return;
    }

    if (calculatedTotal === null) {
      alert("Error calculando el total. Verifique las horas de entrada y salida.");
      return;
    }

    updatePayment(plate, paymentStatus, entryTime, exitTime, calculatedTotal);

    // Limpiar formulario
    setPlate("");
    setPaymentStatus("");
    setEntryTime("");
    setExitTime("");
    setCalculatedTotal(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrar Pago</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Placa del vehículo</label>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ejemplo: ABC123"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Hora de Entrada</label>
          <input
            type="time"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Hora de Salida</label>
          <input
            type="time"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Estado de Pago</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Seleccione estado</option>
            <option value="Pagado">Pagado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Vencido">Vencido</option>
          </select>
        </div>

        <div>
          <p>
            <strong>Total a Pagar: </strong>
            {calculatedTotal !== null ? `$${calculatedTotal.toLocaleString()}` : "-"}
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Pago
        </button>
      </form>
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

  // Función para actualizar el estado de pago y horas de un vehículo por placa
  const updatePayment = (
    plate: string,
    paymentStatus: string,
    entryTime: string,
    exitTime: string,
    totalPayment: number
  ) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((v) =>
        v.plate === plate
          ? { ...v, payment: paymentStatus, entryTime, exitTime, totalPayment }
          : v
      )
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-blue-500 text-white p-7 text-2xl font-bold">
          Parqueadero Autos Colombia
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <nav className="w-50 bg-blue-100 shadow p-6 flex flex-col space-y-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
              Inicio
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Registrar Vehículo
            </Link>
            <Link to="/register-user" className="text-gray-700 hover:text-blue-600">
              Usuario
            </Link>
            <Link to="/register-cell" className="text-gray-700 hover:text-blue-600">
              Celda
            </Link>
            <Link to="/payments" className="text-gray-700 hover:text-blue-600">
              Gestión de Pagos
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
              <Route
                path="/payments"
                element={
                  <>
                    <PaymentForm vehicles={vehicles} updatePayment={updatePayment} />
                    <div className="mt-10">
                      <PaymentList vehicles={vehicles} />
                    </div>
                  </>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
