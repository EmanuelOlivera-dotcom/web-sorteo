import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json();

    if (body?.type !== "payment") {
      return NextResponse.json({ message: "No es un pago" }, { status: 200 });
    }

    const paymentId = body.data.id;

    const mpRes = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });

    const info = mpRes.data;

    if (info.status === "approved") {
      const externalData = JSON.parse(info.external_reference);
      const numero = externalData.numero;

      await axios.post("https://sheetdb.io/api/v1/mqd28qyy5ilw2", {
        data: {
          Timestamp: new Date().toISOString(),
          Nombre: externalData.nombre,
          Email: externalData.email,
          Celular: externalData.celular,
          Número: numero,
        },
      });

      console.log(`✅ Número ${numero} marcado como vendido.`);
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });

  } catch (err) {
    console.error("❌ Error procesando webhook:", err.response?.data || err.message);
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 });
  }
}
