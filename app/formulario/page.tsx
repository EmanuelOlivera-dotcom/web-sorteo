"use client";
import { useState } from "react";

export default function FormularioSorteo() {
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    console.log(`Nombre: ${nombre}, Email: ${email}`);

    setMensaje("¡Gracias por participar!");
    form.reset();
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.titulo}>Formulario de participación</h1>

      <form id="sorteo-form" onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.boton}>
          Enviar
        </button>
      </form>

      <p id="mensaje" style={styles.mensaje}>{mensaje}</p>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    padding: "2rem",
    background: "#000",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    textAlign: "center",
  },
  titulo: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    margin: "0 auto",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    borderRadius: 6,
    border: "none",
    fontSize: "1rem",
  },
  boton: {
    padding: "1rem",
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  mensaje: {
    marginTop: "1.5rem",
    fontSize: "1.2rem",
    color: "#27ae60",
  },
};
