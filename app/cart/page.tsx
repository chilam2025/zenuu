"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/app/providers";

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart();

  const cartRows = items
    .map((it) => {
      const p = PRODUCTS.find((x) => x.id === it.id);
      if (!p) return null;
      return { ...p, qty: it.qty, line: it.qty * p.priceTZS };
    })
    .filter(Boolean) as any[];

  const subtotal = cartRows.reduce((s, r) => s + r.line, 0);

  return (
    <main className="container">
      <h1>Cart</h1>

      {cartRows.length === 0 ? (
        <div className="card">
          <p className="muted">Your cart is empty.</p>
          <Link className="btn" href="/shop">Go to shop</Link>
        </div>
      ) : (
        <div className="card">
          {cartRows.map((r) => (
            <div key={r.id} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div className="row">
                <b>{r.name}</b>
                <span style={{ color: "var(--gold)", fontWeight: 900 }}>
                  {r.line.toLocaleString()} TZS
                </span>
              </div>

              <div className="row" style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span className="muted small">Qty</span>
                  <input
                    className="input"
                    style={{ width: 90 }}
                    type="number"
                    min={1}
                    max={99}
                    value={r.qty}
                    onChange={(e) => setQty(r.id, Number(e.target.value))}
                  />
                </div>
                <button className="btn outline" onClick={() => remove(r.id)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="row" style={{ marginTop: 12 }}>
            <b>Subtotal</b>
            <span style={{ color: "var(--gold)", fontWeight: 900 }}>
              {subtotal.toLocaleString()} TZS
            </span>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
            <Link className="btn" href="/checkout">Go to checkout</Link>
            <button className="btn outline" onClick={clear}>Clear cart</button>
          </div>
        </div>
      )}
    </main>
  );
}
