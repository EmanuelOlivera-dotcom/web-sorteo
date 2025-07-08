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
