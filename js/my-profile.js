let Nusuario = document.getElementsByClassName('Nusuario');
// Llamo el objeto de local storage y lo modifico
let arrayCuentas = localStorage.getItem('Cuentas');
let cuentas = JSON.parse(arrayCuentas);
// ----------------------------------------------------
// Funcion Cerrar Sesion
function cerrarS(){
    localStorage.removeItem('logueado?');
}
//Recorro todas las clases Nusuario y las modifico
for (i = 0; i < Nusuario.length; i++){
Nusuario[i].innerHTML = `
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${cuentas.nombre}
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
