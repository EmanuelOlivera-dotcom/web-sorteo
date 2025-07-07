import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const mpTopic = req.headers["x-mercadopago-topic"];
  const mpResource = req.headers["x-mercadopago-resource-id"];

  if (mpTopic !== "payment") {
    res.status(400).end();
    return;
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;

  try {
    // Consultar detalle de pago en Mercado Pago
    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${mpResource}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const paymentData = await paymentRes.json();

    if (paymentData.status === "approved") {
      // Extraer metadata
      const { metadata } = paymentData;

      // Guardar en Google Sheets
      // Ejemplo: usar Google Sheets API para insertar fila
      // Necesitarás configurar credenciales y client para Sheets

      // Aquí el código para guardar metadata (nombre, celular, email, número) en Sheets

      console.log("Pago aprobado y datos guardados:", metadata);
    }

    res.status(200).end();
  } catch (error) {
    console.error("Error procesando webhook:", error);
    res.status(500).end();
  }
}
