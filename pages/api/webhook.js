import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const payment = req.body;

  if (payment?.type === "payment") {
    try {
      // Obtener los datos del pago
      const mpRes = await axios.get(`https://api.mercadopago.com/v1/payments/${payment.data.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, // Tu token privado de MP
        },
      });

      const info = mpRes.data;

      if (info.status === "approved") {
        const externalData = JSON.parse(info.external_reference);
        const numero = externalData.numero;

        // ✅ Enviar actualización a Google Sheets para marcarlo como vendido
        await axios.post("https://sheetdb.io/api/v1/mqd28qyy5ilw2", {
          data: {
            Timestamp: new Date().toISOString(),
            Nombre: externalData.nombre,
            Email: externalData.email,
            Celular: externalData.celular,
            Número: numero
          }
        });

        console.log(`✅ Pago confirmado y número ${numero} marcado como vendido.`);
      }

      res.sendStatus(200);
    } catch (err) {
      console.error("❌ Error en webhook:", err.response?.data || err.message);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(200);
  }
});

export default router;
