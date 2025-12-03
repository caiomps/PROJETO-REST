import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/users");
    setUsers(res.data);
  }

  return (
    <div className="page">
      <h1>Usuários</h1>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>CPF</th>
              <th>Perfil</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.cpf}</td>
                <td>{u.role}</td>
                <td>
                  <Link to={`/users/${u._id}`} className="btn-small">
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
