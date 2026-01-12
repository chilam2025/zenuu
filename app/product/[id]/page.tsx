            "use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/app/providers";

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const { add } = useCart();

  const product = useMemo(() => PRODUCTS.find((p) => p.id === params.id), [params.id]);

  if (!product) {
    return (
      <main className="container">
        <h1>Product not found</h1>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>{product.name}</h1>
      <p className="muted">{product.category}</p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="img" style={{ height: 320 }} src={product.image} alt={product.name} />

      <div className="row" style={{ marginTop: 14 }}>
        <span style={{ color: "var(--gold)", fontWeight: 900, fontSize: 18 }}>
          {product.priceTZS.toLocaleString()} TZS
        </span>
        <button className="btn" onClick={() => add(product.id)}>Add to cart</button>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <b>Description</b>
        <p className="muted">{product.desc}</p>
      </div>
    </main>
  );
}
