import React, { useState } from "react";

interface User {
  name: string;
  email: string;
}

interface Props {
  addUser: (user: User) => void;
}

const UserForm: React.FC<Props> = ({ addUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Registrar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 mb-2 block w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo"
          className="border p-2 mb-2 block w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default UserForm;
