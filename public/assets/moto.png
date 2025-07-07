export async function POST(request) {
  try {
    const { nombre, celular, email, numero } = await request.json();

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

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer TEST-1789276759478763-070714-d7d2ab9fc332ceb133a5831a2d2b6fde-556143758`,
      },
      body: JSON.stringify(preference),
    });

    const mpData = await response.json();

    return new Response(JSON.stringify({ init_point: mpData.init_point }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Error creando preferencia" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
