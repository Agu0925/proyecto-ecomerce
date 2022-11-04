//declaro estos 2 lets para tomar la id desde local storage de categorias y productos para mostrar correctamente el listado al hacer click en una categoria o producto
let catID = localStorage.getItem('catID');
let prodID = localStorage.getItem('prodID');
//----------------------------------------------
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"+ catID +".json";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"+ prodID +".json";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/"+ prodID +".json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Funcion Cerrar Sesion
function cerrarS() {
  localStorage.removeItem('logueado?');
}
//Mostrar nombre en navbar
let Nusuario = document.getElementsByClassName('Nusuario');
// Llamo el objeto de local storage y lo modifico
let cuentas = JSON.parse(localStorage.getItem('logueado?'));
//Recorro todas las clases Nusuario y las modifico
for (i = 0; i < Nusuario.length; i++) {
  Nusuario[i].innerHTML = `
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navNombre" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      ${cuentas.email}
      </a>
      <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
        <!-- Redirigo con href y utilizo una funcion con onclick en cerrar sesion ------------------------------------------ -->
        <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
        <li><a class='dropdown-item' href='my-profile.html'>  Mi perfil </a></li>
        <li><a class="dropdown-item" href="index.html" onclick="cerrarS()" id='cerrar-sesion'> Cerrar sesion </a></li>
      </ul>
    </li>
  </ul>`;
};