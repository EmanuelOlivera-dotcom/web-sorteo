"use client";
import { useEffect, useState } from "react";

export default function NumerosPage() {
  const [vendidos, setVendidos] = useState<string[]>([]);
  const [numeroSeleccionado, setNumeroSeleccionado] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [graciasVisible, setGraciasVisible] = useState(false);

  const API_URL = "https://sheetdb.io/api/v1/mqd28qyy5ilw2";

  useEffect(() => {
    async function cargar() {
      const res = await fetch(API_URL);
      const data = await res.json();
      setVendidos(data.map((e: any) => e["Número"]));
    }
    cargar();
  }, []);

  useEffect(() => {
    if (graciasVisible) {
      const script = document.createElement("script");
      script.src = "https://www.mercadopago.com.uy/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", "556143758-d1b44109-0817-4868-b8c7-1c6527ac5fe7");
      script.setAttribute("data-source", "button");
      document.getElementById("mp-button")?.appendChild(script);
    }
  }, [graciasVisible]);

  const seleccionarNumero = (num: string) => {
    setNumeroSeleccionado(num);
    setFormVisible(true);
    setGraciasVisible(false);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 200);
  };

  const enviarFormulario = async (e: any) => {
    e.preventDefault();

    const datos = {
      Timestamp: new Date().toISOString(),
      Nombre: e.target.Nombre.value,
      Celular: e.target.Celular.value,
      Email: e.target.Email.value,
      Número: numeroSeleccionado,
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: datos }),
      });
    } catch (err) {
      alert("Error guardando los datos.");
      return;
    }

    e.target.reset();
    setFormVisible(false);
    setGraciasVisible(true);
  };

  return (
    <div style={styles.body}>
      <h1>Elegí tu número</h1>

      <div style={styles.numeros}>
        {Array.from({ length: 250 }, (_, i) => {
          const num = String(i + 1).padStart(3, "0");
          const vendido = vendidos.includes(num);
          return (
            <button
              key={num}
              disabled={vendido}
              style={{
                ...styles.numero,
                background: vendido ? "#555" : "#27ae60",
                cursor: vendido ? "not-allowed" : "pointer",
              }}
              onClick={() => !vendido && seleccionarNumero(num)}
            >
              {num}
            </button>
          );
        })}
      </div>

      {formVisible && (
        <form onSubmit={enviarFormulario} style={styles.form}>
          <input name="Nombre" placeholder="Nombre completo" required style={styles.input} />
          <input name="Celular" placeholder="Número de contacto" required style={styles.input} />
          <input name="Email" placeholder="Email" type="email" required style={styles.input} />
          <button type="submit" style={styles.submit}>Confirmar reserva</button>
        </form>
      )}

      {graciasVisible && (
        <div style={styles.gracias}>
          ✅ ¡Gracias! Ya podés completar el pago abajo 👇
        </div>
      )}

      <div id="mp-button" style={{ marginTop: "1rem" }}></div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    fontFamily: "Arial, sans-serif",
    background: "#000",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
    minHeight: "100vh",
  },
  numeros: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "2rem",
    maxWidth: "900px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  numero: {
    width: "50px",
    height: "50px",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "0 auto 2rem auto",
    textAlign: "left",
  },
  input: {
    padding: "0.8rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    background: "#222",
    color: "#fff",
  },
  submit: {
    padding: "0.8rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    background: "#27ae60",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  gracias: {
    fontSize: "1.2rem",
    color: "#0f0",
    marginTop: "1rem",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
};
