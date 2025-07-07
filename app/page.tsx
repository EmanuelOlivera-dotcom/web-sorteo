export default function Home() {
  return (
    <html lang="es">
      <head>
        <title>Sorteo Kawasaki Ninja 500</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={styles.body}>
        <header style={styles.header}>
          <h1>¡Participá y ganá una moto, un celular o un casco por solo 100 USD!</h1>
        </header>

        <main style={styles.main}>
          <section style={styles.premios}>
            {premios.map((premio) => (
              <div key={premio.alt} style={styles.premio}>
                <img src={premio.img} alt={premio.alt} style={styles.img} />
                <h3>{premio.titulo}</h3>
                <p>{premio.descripcion}</p>
              </div>
            ))}
          </section>

          <a href="/numeros" style={styles.btnComprar}>Comprar Ticket</a>
        </main>

        <footer style={styles.footer}>
          <h3>Términos y condiciones</h3>
          <p>[Espacio reservado para términos y condiciones. Aquí se detallará cómo se realiza el sorteo, derechos, devoluciones, reemplazos en efectivo, etc.]</p>
        </footer>

        <a
          href="https://wa.me/59895848993?text=Hola%2C%20tengo%20una%20consulta%20sobre%20el%20sorteo"
          target="_blank"
          style={styles.btnFlotante}
        >
          💬
        </a>
      </body>
    </html>
  );
}

const premios = [
  {
    img: "/assets/moto.png",
    alt: "Moto Kawasaki Ninja 500",
    titulo: "Moto Kawasaki Ninja 500",
    descripcion: "Modelo 2025, 0 km. Valor: 10.000 USD"
  },
  {
    img: "/assets/iphone.png",
    alt: "iPhone 15 Pro",
    titulo: "iPhone 15 Pro",
    descripcion: "Nuevo, sellado. Valor: 1.500 USD"
  },
  {
    img: "/assets/casco.png",
    alt: "Casco HJC RPHA Negro Mate",
    titulo: "Casco HJC RPHA Negro Mate",
    descripcion: "Valor: 1.000 USD"
  }
];

const styles: { [key: string]: React.CSSProperties } = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    background: "#000",
    color: "#fff",
    textAlign: "center"
  },
  header: {
    background: "#000",
    padding: "2rem 1rem"
  },
  main: {
    padding: "1rem",
    maxWidth: "900px",
    margin: "0 auto"
  },
  premios: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "2rem"
  },
  premio: {
    background: "#000",
    borderRadius: 8,
    padding: "1rem",
    maxWidth: "280px",
    margin: "0 auto"
  },
  img: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: 6,
    background: "transparent",
    display: "block",
    margin: "0 auto 1rem auto"
  },
  btnComprar: {
    display: "inline-block",
    background: "#27ae60",
    color: "#fff",
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    margin: "2rem auto"
  },
  footer: {
    background: "#000",
    color: "#ccc",
    padding: "2rem 1rem",
    marginTop: "4rem"
  },
  btnFlotante: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 60,
    height: 60,
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)"
  }
};
