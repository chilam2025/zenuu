import "./globals.css";
import { CartProvider } from "./providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Zenuu",
  description: "Electronics shop - WhatsApp orders",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
