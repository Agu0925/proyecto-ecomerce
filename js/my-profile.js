let cuenta = JSON.parse(localStorage.getItem('logueado'));
//Funcion para imprimir imagen si se encuentra en local storage o imprimimr SVG
function imgOsvg() {
  if (cuenta.img != '') { document.getElementById("img").innerHTML = `<img src="${cuenta.img}" alt="" width="150" height="150">`; }
  else {
    document.getElementById("img").innerHTML = ` <svg
  xmlns="http://www.w3.org/2000/svg"
  width="150"
  height="150"
  fill="currentColor"
  class="bi bi-person-bounding-box text-secondary"
  viewBox="0 0 16 16"
>
  <path
    d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
  />
  <path
    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
  />
</svg>`}
}
//Relleno campos en Perfil
document.getElementById("mail").value = cuenta.email;
document.getElementById("nombre").value = cuenta.nombre;
document.getElementById("nombre2").value = cuenta.nombre2;
document.getElementById("apellido").value = cuenta.apellido;
document.getElementById("apellido2").value = cuenta.apellido2;
document.getElementById("tel").value = cuenta.tel;
imgOsvg();
//Funcion para validar con BS5 y guardar datos.
function validar() {
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.need-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          //Si se valida que introduzca este codigo
          // Traigo el array del localStorage
          let arrayCuentas = JSON.parse(localStorage.getItem('Cuentas'));
          //Modifico el array cuentas con el indice encontrado atraves de findIndex
          arrayCuentas[arrayCuentas.findIndex(arrayCuentas => arrayCuentas.email == cuenta.email)].nombre = document.getElementById("nombre").value;
          arrayCuentas[arrayCuentas.findIndex(arrayCuentas => arrayCuentas.email == cuenta.email)].nombre2 = document.getElementById("nombre2").value;
          arrayCuentas[arrayCuentas.findIndex(arrayCuentas => arrayCuentas.email == cuenta.email)].apellido = document.getElementById("apellido").value;
          arrayCuentas[arrayCuentas.findIndex(arrayCuentas => arrayCuentas.email == cuenta.email)].apellido2 = document.getElementById("apellido2").value;
          arrayCuentas[arrayCuentas.findIndex(arrayCuentas => arrayCuentas.email == cuenta.email)].tel = document.getElementById("tel").value;
          if (img != "") {
            arrayCuentas[arrayCuentas.findIndex(arrayCuentas => arrayCuentas.email == cuenta.email)].img = img;
          };
          // Y lo actualizo ademas creo un objeto para actualizar tambien la cuenta logueada
          // Si inputFile no tiene ninguna imagen seleccionada enviar la informacion guardada en localStorage
          let logueado = {
            "email": document.getElementById("mail").value,
            "nombre": document.getElementById("nombre").value,
            "nombre2": document.getElementById("nombre2").value,
            "apellido": document.getElementById("apellido").value,
            "apellido2": document.getElementById("apellido2").value,
            "tel": document.getElementById("tel").value,
            "img": arrayCuentas[arrayCuentas.findIndex(arrayCuentas => arrayCuentas.email == document.getElementById("mail").value)].img
          };
          // Si inputFile tiene imagen cambiar el objeto para enviar la informacion al localStorage
          if (img != "") { logueado.img = img };
          localStorage.setItem('logueado', JSON.stringify(logueado));
          localStorage.setItem('Cuentas', JSON.stringify(arrayCuentas));
          //Cambiar imagen solamente si selecciono un archivo
          if (img != '') { document.getElementById("img").innerHTML = `<img src="${img}" alt="" width="150" height="150">`; }
        }
        form.classList.add('was-validated')
      }, false)
    })
}
//Guardando configuracion de perfil
//Creo el on change afuera de el boton guardar porque sino no actualiza en tiempo real la imagen 
//guardo resultado en una variable.
let img = '';
document.getElementById("imgperfil").addEventListener('change', () => {
  //Si selecciono una imagen mostrarla sino mostrar el svg
  if (document.getElementById("imgperfil").value != '') {
    let imagen = document.getElementById("imgperfil").files[0];
    let leerImagen = new FileReader();
    leerImagen.readAsDataURL(imagen);
    leerImagen.onload = () => {
      img = leerImagen.result;
      document.getElementById("img").innerHTML = `<img src="${img}" alt="" width="150" height="150">`;
    }
  } else {
    img = '';
    document.getElementById("img").innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="150"
  height="150"
  fill="currentColor"
  class="bi bi-person-bounding-box text-secondary"
  viewBox="0 0 16 16"
>
  <path
    d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
  />
  <path
    d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
  />
</svg>`
  }
})
//Guardo los datos con funcion validar
document.getElementById("guardar").addEventListener("click", validar)