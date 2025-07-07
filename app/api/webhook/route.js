import axios from "axios";

export async function POST(request) {
  try {
    const payment = await request.json();

    if (payment?.type === "payment") {
      const paymentId = payment.data.id;

      const mpRes = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer TEST-1789276759478763-070714-d7d2ab9fc332ceb133a5831a2d2b6fde-556143758`
        }
      });

      const info = mpRes.data;

      if (!info.external_reference) {
        return new Response("Falta external_reference", { status: 400 });
      }

      if (info.status.toLowerCase() === "approved") {
        const externalData = JSON.parse(info.external_reference);
        const numero = externalData.numero;

        await axios.post("https://sheetdb.io/api/v1/mqd28qyy5ilw2", {
          data: {
            Timestamp: new Date().toISOString(),
            Nombre: externalData.nombre,
            Email: externalData.email,
            Celular: externalData.celular,
            Número: numero
          }
        });

        console.log(`✅ Número ${numero} marcado como vendido.`);
      }

      return new Response("OK", { status: 200 });
    } else {
      return new Response("No es un pago", { status: 200 });
    }
  } catch (err) {
    console.error("❌ Error procesando webhook:", err.response?.data || err.message);
    return new Response("Error", { status: 500 });
  }
}
