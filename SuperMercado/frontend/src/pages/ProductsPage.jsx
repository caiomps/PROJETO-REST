import { useState, useEffect } from "react";
import api from "../api";

export default function ProductsPage() {
  const empty = {
    nome: "",
    tipo: "",
    descricao: "",
    precoAtual: "",
    dataValidade: ""
  };

  const [form, setForm] = useState(empty);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/products");
    setProducts(res.data);
  }

  async function submit(e) {
    e.preventDefault();

    const data = {
      name: form.nome,
      type: form.tipo,
      description: form.descricao,
      currentPrice: Number(form.precoAtual),
      expiryDate: form.dataValidade
    };

    if (editingId) {
      await api.put(`/products/${editingId}`, data);
    } else {
      await api.post("/products", data);
    }

    setForm(empty);
    setEditingId(null);
    load();
  }

  function edit(p) {
    setEditingId(p._id);
    setForm({
      nome: p.name,
      tipo: p.type,
      descricao: p.description,
      precoAtual: p.currentPrice,
      dataValidade: p.expiryDate?.substring(0, 10)
    });
  }

  async function remove(id) {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      await api.delete(`/products/${id}`);
      load();
    }
  }

  return (
    <div className="page">
      <h1>Gerenciar Produtos</h1>

      <div className="grid">
        <form className="card" onSubmit={submit}>
          <h2>{editingId ? "Editar Produto" : "Novo Produto"}</h2>

          <label>
            Nome do Produto
            <input
              name="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />
          </label>

          <label>
            Tipo
            <input
              name="tipo"
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              required
            />
          </label>

          <label>
            Preço Atual (R$)
            <input
              type="number"
              step="0.01"
              name="precoAtual"
              value={form.precoAtual}
              onChange={(e) => setForm({ ...form, precoAtual: e.target.value })}
              required
            />
          </label>

          <label>
            Data de Validade
            <input
              type="date"
              name="dataValidade"
              value={form.dataValidade}
              onChange={(e) => setForm({ ...form, dataValidade: e.target.value })}
              required
            />
          </label>

          <button className="btn">
            {editingId ? "Salvar Alterações" : "Cadastrar Produto"}
          </button>
        </form>

        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Promoção</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>R$ {p.currentPrice}</td>
                  <td>{p.promoPrice ? `R$ ${p.promoPrice}` : "-"}</td>
                  <td>{p.type}</td>
                  <td>
                    <button className="btn-small" onClick={() => edit(p)}>
                      Editar
                    </button>
                    <button
                      className="btn-small red"
                      onClick={() => remove(p._id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
