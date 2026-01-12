"use client";

import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/app/providers";

export default function ShopPage() {
  const { add } = useCart();

  return (
    <main className="container">
      <h1>Shop</h1>
      <p className="muted">Choose a product, add to cart, then checkout via WhatsApp.</p>

      <div className="grid">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="card">
            <Link href={`/product/${p.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="img" src={p.image} alt={p.name} />
            </Link>

            <div className="row" style={{ marginTop: 10 }}>
              <b>{p.name}</b>
              <span style={{ color: "var(--gold)", fontWeight: 900 }}>
                {p.priceTZS.toLocaleString()} TZS
              </span>
            </div>

            <p className="muted small">{p.category} • {p.desc}</p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn" onClick={() => add(p.id)}>Add to cart</button>
              <Link className="btn outline" href={`/product/${p.id}`}>View</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
