export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { nombre, celular, email, numero } = req.body;

  const preference = {
    items: [
      {
        title: `Sorteo Kawasaki - Número ${numero}`,
        quantity: 1,
        currency_id: "USD",
        unit_price: 100,
      },
    ],
    payer: {
      name: nombre,
      email: email,
    },
    back_urls: {
      success: "https://tusorteo.vercel.app/success",
      failure: "https://tusorteo.vercel.app/failure",
    },
    notification_url: "https://tusorteo.vercel.app/api/webhook",
    metadata: {
      nombre,
      celular,
      email,
      numero,
    },
  };

  try {
    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer TEST-1789276759478763-070714-d7d2ab9fc332ceb133a5831a2d2b6fde-556143758`,
      },
      body: JSON.stringify(preference),
    });

    const mpData = await mpRes.json();
    return res.status(200).json({ init_point: mpData.init_point });
  } catch (err) {
    return res.status(500).json({ error: "Error creando preferencia" });
  }
}
