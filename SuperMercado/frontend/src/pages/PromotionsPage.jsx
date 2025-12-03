import { useState, useEffect } from "react";
import api from "../api";

export default function PromotionsPage() {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [promo, setPromo] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get("/products");
    setProducts(res.data);
  }

  async function apply(e) {
    e.preventDefault();
    await api.put(`/products/${id}/promotion`, { promoPrice: Number(promo) });
    load();
  }

  async function remove(id) {
    await api.delete(`/products/${id}/promotion`);
    load();
  }

  return (
    <div className="page">
      <h1>Promoções</h1>

      <div className="card">
        <form onSubmit={apply}>
          <label>
            Produto:
            <select value={id} onChange={(e) => setId(e.target.value)}>
              <option value="">Selecione</option>
              {products.map((p) => (
                <option value={p._id} key={p._id}>
                  {p.name} - R$ {p.currentPrice}
                </option>
              ))}
            </select>
          </label>

          <label>
            Preço Promocional:
            <input value={promo} onChange={(e) => setPromo(e.target.value)} />
          </label>

          <button className="btn">Aplicar</button>
        </form>
      </div>

      <h2>Ativas</h2>
      <table className="table">
        <tbody>
          {products.filter((p) => p.promoPrice).map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>De R$ {p.currentPrice}</td>
              <td>Por R$ {p.promoPrice}</td>
              <td>
                <button className="btn-small red" onClick={() => remove(p._id)}>
                  Remover Promoção
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
