let Nusuario = document.getElementsByClassName('Nusuario');
// Llamo el objeto de local storage y lo modifico
let arrayCuentas = localStorage.getItem('Cuentas');
cuentas = JSON.parse(arrayCuentas);
// ----------------------------------------------------
//Recorro todas las clases Nusuario y las modifico
for (i = 0; i < Nusuario.length; i++){
Nusuario[i].innerHTML = "<a class='nav-link' href='my-profile.html'> " + cuentas.nombre + " </a>";
}
