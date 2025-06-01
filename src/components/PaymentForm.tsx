import React, { useState } from "react";

interface Vehicle {
  plate: string;
  // otros campos que uses...
  payment: string;
}

interface PaymentFormProps {
  vehicles: Vehicle[];
  updatePayment: (plate: string, paymentStatus: string, total: number, entryTime: string, exitTime: string, cell: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ vehicles, updatePayment }) => {
  const [plate, setPlate] = useState("");
  const [cell, setCell] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [total, setTotal] = useState(0);

  const HOURLY_RATE = 4000; // 4000 COP por hora

  // Función para calcular el total basado en horas entre entrada y salida
  const calculateTotal = (entry: string, exit: string) => {
    if (!entry || !exit) return 0;
    // Convertimos a Date objetos (solo horas y minutos)
    const [entryH, entryM] = entry.split(":").map(Number);
    const [exitH, exitM] = exit.split(":").map(Number);

    // Creamos fechas ficticias para calcular diferencia
    const entryDate = new Date(0, 0, 0, entryH, entryM);
    const exitDate = new Date(0, 0, 0, exitH, exitM);

    // Si la hora de salida es antes que la de entrada, asumimos que es al día siguiente
    if (exitDate < entryDate) {
      exitDate.setDate(exitDate.getDate() + 1);
    }

    const diffMs = exitDate.getTime() - entryDate.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60); // diferencia en horas decimal

    // Redondeamos hacia arriba para cobrar la hora completa
    return Math.ceil(diffHrs) * HOURLY_RATE;
  };

  // Actualiza total cuando cambian las horas
  const handleEntryTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEntryTime(val);
    setTotal(calculateTotal(val, exitTime));
  };

  const handleExitTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setExitTime(val);
    setTotal(calculateTotal(entryTime, val));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!plate || !entryTime || !exitTime || !paymentStatus) {
    alert("Por favor complete todos los campos.");
    return;
  }

  const normalizedPlate = plate.trim().toUpperCase();
  const vehicleExists = vehicles.some(v => v.plate.trim().toUpperCase() === normalizedPlate);

  if (!vehicleExists) {
    alert("No se encontró un vehículo con esa placa.");
    return;
  }

  updatePayment(normalizedPlate, paymentStatus, total, entryTime, exitTime, cell);

  // Limpiar campos
  setPlate("");
  setCell("");
  setEntryTime("");
  setExitTime("");
  setPaymentStatus("");
  setTotal(0);
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
          <label className="block font-semibold mb-1">Celda</label>
          <input
            type="text"
            value={cell}
            onChange={(e) => setCell(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Ejemplo: A1, B2, etc."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Hora de Entrada</label>
          <input
            type="time"
            value={entryTime}
            onChange={handleEntryTimeChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Hora de Salida</label>
          <input
            type="time"
            value={exitTime}
            onChange={handleExitTimeChange}
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
          <label className="block font-semibold mb-1">Total a Pagar</label>
          <input
            type="text"
            value={total.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
          />
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

export default PaymentForm;
