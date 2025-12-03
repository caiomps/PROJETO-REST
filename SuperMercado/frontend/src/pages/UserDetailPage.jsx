import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    role: ""
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get(`/users/${id}`);
    setUser(res.data);
    setForm(res.data);
  }

  async function save(e) {
    e.preventDefault();
    await api.put(`/users/${id}`, form);
    alert("Usuário atualizado");
  }

  async function del() {
    if (confirm("Tem certeza?")) {
      await api.delete(`/users/${id}`);
      navigate("/users");
    }
  }

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="page">
      <h1>Detalhes do Usuário</h1>

      <div className="grid">
        <div className="card">
          <p><b>ID:</b> {user._id}</p>
          <p><b>Nome:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>CPF:</b> {user.cpf}</p>
          <p><b>Perfil:</b> {user.role}</p>
        </div>

        <form className="card" onSubmit={save}>
          <label>Nome:
            <input value={form.name} onChange={(e)=> setForm({...form, name:e.target.value})}/>
          </label>
          <label>Email:
            <input value={form.email} onChange={(e)=> setForm({...form, email:e.target.value})}/>
          </label>
          <label>CPF:
            <input value={form.cpf} onChange={(e)=> setForm({...form, cpf:e.target.value})}/>
          </label>
          <label>Perfil:
            <select value={form.role} onChange={(e)=> setForm({...form, role:e.target.value})}>
              <option value="funcionario">Funcionário</option>
              <option value="admin">Administrador</option>
            </select>
          </label>

          <button className="btn">Salvar</button>
          <button type="button" className="btn red" onClick={del}>Excluir</button>
        </form>
      </div>
    </div>
  );
}
