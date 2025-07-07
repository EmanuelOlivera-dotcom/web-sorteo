// app/api/createPreference/route.js

export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, celular, email, numero } = body;

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

    const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, // Usa variables de entorno seguras
      },
      body: JSON.stringify(preference),
    });

    const mpData = await mpRes.json();

    if (!mpRes.ok) {
      return new Response(JSON.stringify({ error: mpData }), { status: mpRes.status });
    }

    return new Response(JSON.stringify({ init_point: mpData.init_point }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error en createPreference:", err);
    return new Response(JSON.stringify({ error: "Error creando preferencia" }), {
      status: 500,
    });
  }
}
