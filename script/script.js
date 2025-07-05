document.getElementById('sorteo-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;

  console.log(`Nombre: ${nombre}, Email: ${email}`);

  document.getElementById('mensaje').textContent = "¡Gracias por participar!";
  this.reset();
});
