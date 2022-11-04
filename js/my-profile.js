let cuenta = JSON.parse(localStorage.getItem('logueado?'));
let usuario = JSON.parse(localStorage.getItem('usuario: ' + cuenta.email));
//Funcion para imprimir imagen si se encuentra en local storage o imprimimr SVG
function imgOsvg() {
  if (usuario.img != '') { document.getElementById("img").innerHTML = `<img src="${usuario.img}" alt="" width="150" height="150">`; }
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
//Configurar Perfil
//verifico si existe el objeto en el localStorage y relleno los campos
if (localStorage.getItem('usuario: ' + cuenta.email)) {
  document.getElementById("mail").value = usuario.email;
  document.getElementById("nombre").value = usuario.nombre;
  document.getElementById("nombre2").value = usuario.nombre2;
  document.getElementById("apellido").value = usuario.apellido;
  document.getElementById("apellido2").value = usuario.apellido2;
  document.getElementById("tel").value = usuario.tel;
  imgOsvg();
}
//Sino traigo el objeto creado a partir del login y relleno los campos
else {
  document.getElementById("mail").value = cuenta.email;
  document.getElementById("nombre").value = cuenta.nombre;
  imgOsvg();
};
//Creo el on change afuera de el boton guardar porque sino no actualiza en tiempo real la imagen.
let img = '';
document.getElementById("imgperfil").addEventListener('change', () => {
  //Si selecciono una imagen mostrarla sino mostrar el svg
  if (document.getElementById("imgperfil").value != '') {
    let imagen = document.getElementById("imgperfil").files[0];
    let leerImagen = new FileReader();
    leerImagen.readAsDataURL(imagen);
    leerImagen.onload = () => {
      img = leerImagen.result;
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
//Creo un objeto nuevo con los valores de los campos y lo reescribo en el localStorage
document.getElementById("guardar").addEventListener("click", () => {
  let guardarPerfil = {
    "nombre": document.getElementById("nombre").value,
    "email": cuenta.email,
    "nombre2": document.getElementById("nombre2").value,
    "apellido": document.getElementById("apellido").value,
    "apellido2": document.getElementById("apellido2").value,
    "tel": document.getElementById("tel").value,
    "img": img
  };
  //Cambiar imagen solamente si selecciono un archivo
  if (img != ''){document.getElementById("img").innerHTML = `<img src="${img}" alt="" width="150" height="150">`;} 
  localStorage.setItem('usuario: ' + cuenta.email, JSON.stringify(guardarPerfil));
});
