let Nusuario = document.getElementsByClassName('Nusuario');
// Llamo el objeto de local storage y lo modifico
let arrayCuentas = localStorage.getItem('Cuentas');
let cuentas = JSON.parse(arrayCuentas);
// ----------------------------------------------------
// Funcion Cerrar Sesion
function cerrarS() {
  localStorage.removeItem('logueado?');
}
//Mostrar nombre en navbar
//Recorro todas las clases Nusuario y las modifico
for (i = 0; i < Nusuario.length; i++) {
  Nusuario[i].innerHTML = `
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${cuentas[0].nombre}
      </a>
      <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
        <!-- Redirigo con href y utilizo una funcion con onclick en cerrar sesion ------------------------------------------ -->
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class='dropdown-item' href='my-profile.html'>  Mi perfil </a></li>
        <li><a class="dropdown-item" href="index.html" onclick="cerrarS()" id='cerrar-sesion'> Cerrar sesion </a></li>
      </ul>
    </li>
  </ul>`;
}
//Configurar Perfil
if(localStorage.getItem("Cuentas")){
  document.getElementById("mail").value = cuentas[0].email;
  document.getElementById("nombre").value = cuentas[0].nombre;
  document.getElementById("nombre2").value = cuentas[0].nombre2;
  document.getElementById("apellido").value = cuentas[0].apellido;
  document.getElementById("apellido2").value = cuentas[0].apellido2;
  document.getElementById("tel").value = cuentas[0].tel;
};
document.getElementById("guardar").addEventListener("click", () => {
  // Array Usuario ---------------
  let cuenta = [{
    "nombre": document.getElementById("nombre").value,
    "email": document.getElementById("mail").value,
    "pass": cuentas.pass,
    "nombre2": document.getElementById("nombre2").value,
    "apellido": document.getElementById("apellido").value,
    "apellido2": document.getElementById("apellido2").value,
    "tel": document.getElementById("tel").value
  }];
  // Guardar el array en el localStorage
  localStorage.setItem("Cuentas", JSON.stringify(cuenta));
});
