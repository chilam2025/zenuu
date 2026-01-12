import Link from "next/link";
import { PRODUCTS } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="container">
      <div className="hero">
        <h1 style={{ margin: 0 }}>Zenuu</h1>
        <p className="muted" style={{ marginTop: 6 }}>
          Electronics in Dar es Salaam (Kigamboni) — Order on WhatsApp, pay after delivery.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
          <Link className="btn" href="/shop">Shop Now</Link>
          <Link className="btn outline" href="/cart">View Cart</Link>
        </div>
      </div>

      <div className="hr" />

      <h2 style={{ margin: "8px 0" }}>Popular items</h2>
      <div className="grid">
        {PRODUCTS.slice(0, 4).map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="img" src={p.image} alt={p.name} />
            <div className="row" style={{ marginTop: 10 }}>
              <b>{p.name}</b>
              <span style={{ color: "var(--gold)", fontWeight: 900 }}>
                {p.priceTZS.toLocaleString()} TZS
              </span>
            </div>
            <p className="muted small">{p.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
