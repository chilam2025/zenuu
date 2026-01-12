"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/app/providers";
import { buildOrderMessage, openWhatsAppOrder } from "@/lib/whatsapp";

export default function CheckoutPage() {
  const { items, clear } = useCart();

  const cartRows = useMemo(() => {
    return items
      .map((it) => {
        const p = PRODUCTS.find((x) => x.id === it.id);
        if (!p) return null;
        return { name: p.name, qty: it.qty, priceTZS: p.priceTZS, line: it.qty * p.priceTZS };
      })
      .filter(Boolean) as any[];
  }, [items]);

  const subtotal = cartRows.reduce((s, r) => s + r.line, 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryFee, setDeliveryFee] = useState<number>(5000); // you can change later

  const total = subtotal + (Number.isFinite(deliveryFee) ? deliveryFee : 0);

  const placeOrder = () => {
    if (!cartRows.length) return alert("Cart is empty.");
    if (!name.trim()) return alert("Please enter your name.");
    if (!phone.trim()) return alert("Please enter your phone.");
    if (!address.trim()) return alert("Please enter delivery location.");

    const msg = buildOrderMessage({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      address: address.trim(),
      deliveryFeeTZS: Number(deliveryFee) || 0,
      items: cartRows.map((r) => ({ name: r.name, qty: r.qty, priceTZS: r.priceTZS })),
    });

    openWhatsAppOrder(msg);
    clear();
  };

  return (
    <main className="container">
      <h1>Checkout</h1>
      <p className="muted">Payment is after delivery (WhatsApp/Cash).</p>

      <div className="card">
        <b>Your details</b>

        <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
          <input className="input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" placeholder="Phone (e.g. 07xx...)" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="input" placeholder="Delivery location (area + street)" value={address} onChange={(e) => setAddress(e.target.value)} />
          <input
            className="input"
            type="number"
            placeholder="Delivery fee (TZS)"
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(Number(e.target.value))}
          />
          <span className="muted small">
            Shop is in Kigamboni — far areas can be higher. You can adjust delivery fee anytime.
          </span>
        </div>

        <div className="hr" />

        <b>Order summary</b>

        <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
          {cartRows.length === 0 ? (
            <span className="muted">Cart is empty.</span>
          ) : (
            cartRows.map((r: any, idx: number) => (
              <div key={idx} className="row">
                <span className="muted">{r.name} x{r.qty}</span>
                <b>{r.line.toLocaleString()} TZS</b>
              </div>
            ))
          )}

          <div className="hr" />
          <div className="row"><span className="muted">Subtotal</span><b>{subtotal.toLocaleString()} TZS</b></div>
          <div className="row"><span className="muted">Delivery fee</span><b>{(Number(deliveryFee)||0).toLocaleString()} TZS</b></div>
          <div className="row"><span className="muted">Total</span><b style={{ color: "var(--gold)" }}>{total.toLocaleString()} TZS</b></div>

          <button className="btn" onClick={placeOrder} style={{ marginTop: 10 }}>
            Place order on WhatsApp
          </button>
        </div>
      </div>
    </main>
  );
}
