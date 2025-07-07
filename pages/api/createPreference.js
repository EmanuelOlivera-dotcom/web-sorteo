import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { nombre, celular, email, numero } = req.body;

  if (!nombre || !celular || !email || !numero) {
    res.status(400).json({ error: "Faltan datos" });
    return;
  }

  const accessToken = process.env.MP_ACCESS_TOKEN; // Tu token Mercado Pago en variables de entorno

  const preference = {
    items: [
      {
        title: `Ticket número ${numero} - Sorteo Kawasaki Ninja`,
        quantity: 1,
        currency_id: "UYU",
        unit_price: 100, // Precio del ticket en pesos uruguayos, ajustá si querés USD
      },
    ],
    payer: {
      name: nombre,
      phone: {
        area_code: "598", // código Uruguay, ajustar si necesario
        number: celular.replace(/\D/g, ""), // solo números
      },
      email: email,
    },
    back_urls: {
      success: "https://tusitio.com/gracias",
      failure: "https://tusitio.com/error",
      pending: "https://tusitio.com/pendiente",
    },
    auto_return: "approved",
    metadata: {
      numero: numero,
      nombre: nombre,
      celular: celular,
      email: email,
    },
  };

  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });
    const data = await response.json();
    res.status(200).json({ preferenceId: data.id });
  } catch (error) {
    res.status(500).json({ error: "Error creando preferencia" });
  }
}

