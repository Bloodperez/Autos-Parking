import React, { useState } from "react";

interface Cell {
  number: string;
  type: string;
}

interface Props {
  addCell: (cell: Cell) => void;
}

const CellForm: React.FC<Props> = ({ addCell }) => {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("carro");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCell({ number, type });
    setNumber("");
    setType("carro");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Registrar Celda</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Número de Celda"
          className="border p-2 mb-2 block w-full"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <select
          className="border p-2 mb-2 block w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="carro">Carro</option>
          <option value="moto">Moto</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default CellForm;
