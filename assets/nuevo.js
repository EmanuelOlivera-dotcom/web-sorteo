<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Comprar Ticket - Sorteo Kawasaki</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #000;
      color: #fff;
      font-family: Arial, sans-serif;
      text-align: center;
    }

    header {
      background: #000;
      padding: 2rem 1rem;
    }

    main {
      padding: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 400px;
      margin: 0 auto;
    }

    input {
      padding: 0.8rem;
      border-radius: 5px;
      border: none;
      font-size: 1rem;
    }

    button {
      padding: 1rem;
      font-size: 1.1rem;
      background-color: #27ae60;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    #mensaje {
      margin-top: 1rem;
      font-weight: bold;
    }

    footer {
      background: #000;
      color: #ccc;
      padding: 2rem 1rem;
      margin-top: 4rem;
    }

    .btn-flotante {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #27ae60;
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
  </style>
</head>
<body>
  <header>
    <h1>Formulario de participación</h1>
  </header>

  <main>
    <form id="sorteo-form">
      <input type="text" id="nombre" placeholder="Nombre" required />
      <input type="email" id="email" placeholder="Correo electrónico" required />
      <input type="text" id="celular" placeholder="Celular" required />
      <input type="number" id="numero" placeholder="Número elegido" required />
      <button type="submit">Enviar</button>
    </form>

    <p id="mensaje"></p>
  </main>

  <footer>
    <p>Solo se guardarán los datos si se confirma el pago. Luego recibirás tu número por WhatsApp o email.</p>
  </footer>

  <a
    href="https://wa.me/59895848993?text=Hola%2C%20tengo%20una%20consulta%20sobre%20el%20sorteo"
    target="_blank"
    class="btn-flotante"
  >
    💬
  </a>

  <script>
    document.getElementById('sorteo-form').addEventListener('submit', async function (e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const celular = document.getElementById('celular').value;
      const numero = document.getElementById('numero').value;

      try {
        const res = await fetch("/api/createPreference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, celular, numero })
        });

        const data = await res.json();
        if (data.init_point) {
          window.location.href = data.init_point;
        } else {
          document.getElementById("mensaje").textContent = "Error al generar el pago.";
        }
      } catch (err) {
        console.error(err);
        document.getElementById("mensaje").textContent = "Error en el formulario.";
      }

      this.reset();
    });
  </script>
</body>
</html>
