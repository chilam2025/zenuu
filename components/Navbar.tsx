"use client";

import Link from "next/link";
import { useCart } from "@/app/providers";

export default function Navbar() {
  const { count } = useCart();

  return (
    <div className="nav">
      <div className="navInner container">
        <Link href="/" className="brand">ZENUU</Link>

        <div className="links">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">
            Cart <span className="badge">{count}</span>
          </Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      </div>
    </div>
  );
}
