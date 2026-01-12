const SHOP_WHATSAPP = "+255786176234";

function toWaDigits(phoneWithPlus: string) {
  return phoneWithPlus.replace(/\D/g, ""); // "+255..." -> "255..."
}

export function openWhatsAppOrder(message: string) {
  const wa = toWaDigits(SHOP_WHATSAPP);
  const url = `https://wa.me/${wa}?text=${encodeURIComponent(message)}`;
  window.location.href = url;
}

export function buildOrderMessage(params: {
  customerName: string;
  customerPhone: string;
  address: string;
  deliveryFeeTZS: number;
  items: { name: string; qty: number; priceTZS: number }[];
}) {
  const subtotal = params.items.reduce((s, i) => s + i.qty * i.priceTZS, 0);
  const total = subtotal + params.deliveryFeeTZS;

  const itemsText = params.items
    .map((i) => `- ${i.name} x${i.qty} = ${i.qty * i.priceTZS} TZS`)
    .join("\n");

  return (
`*Zenuu - New Order*
Shop: Kigamboni, Dar es Salaam

Customer: ${params.customerName}
Phone: ${params.customerPhone}
Delivery Location: ${params.address}
Delivery Fee: ${params.deliveryFeeTZS} TZS

Items:
${itemsText}

Subtotal: ${subtotal} TZS
Total: *${total} TZS*

Payment: *After Delivery (WhatsApp/Cash)*`
  );
}
