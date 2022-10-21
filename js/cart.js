function setProdID(id) {
   localStorage.setItem("prodID", id);
   window.location = "product-info.html";
}
//Funcion para actualizar en tiempo real
function totales() {
   //creo el array numeros para agregar todos los subtotales traidos de el array de clases
   let numeros = [];
   for (const suma of document.getElementsByClassName("subt")) {
      //sumo los subtotales al array numeros
      numeros.push(parseInt(suma.innerHTML));
      //Modifico el innerHTML del subtotal y realizo la suma de el array numeros
      document.getElementById("subtotal").innerHTML = numeros.reduce((a, b) => a + b, 0);
   }
   //Precio Envio
   //Standar
   if (document.getElementById("standard").checked == true) {
      document.getElementById("envio").innerHTML = parseInt(parseInt(document.getElementById("subtotal").innerHTML) * 0.05);
   }
   //Express
   else if (document.getElementById("express").checked == true) {
      document.getElementById("envio").innerHTML = parseInt(parseInt(document.getElementById("subtotal").innerHTML) * 0.07);
   }
   //Premium
   else if (document.getElementById("premium").checked == true) {
      document.getElementById("envio").innerHTML = parseInt(parseInt(document.getElementById("subtotal").innerHTML) * 0.15);
   }
   //Precio Total
   document.getElementById("total").innerHTML = parseInt(document.getElementById("subtotal").innerHTML) + parseInt(document.getElementById("envio").innerHTML);
}
//Funcion para multiplicar precio por cantidad de producto
function carritoID(id) {
   //Multiplicando con los inputs numbers identificados por id
   //si es en pesos hacer la conversion a dolares en un futuro puede ser dinamico
   if (document.getElementById("moneda" + id).innerHTML == 'UYU') {
      document.getElementById("dolares" + id).innerHTML =
         document.getElementById(id).value *
         (Math.trunc(document.getElementById("precio" + id).innerHTML / 42));
      //sino solo multiplicar   
   } else {
      document.getElementById("dolares" + id).innerHTML =
         document.getElementById(id).value *
         document.getElementById("precio" + id).innerHTML;
   }
   //LLamo la funcion para actualizar en tiempo real los totales
   totales();
}
//Borrar productos del carrito y guardar carrito
function borrarProd(id) {
   //Borro div con removeChild
   document.getElementById("carrito").removeChild(document.getElementById("div" + id));
   //Guardo el nuevo carrito
   localStorage.setItem("Carrito", JSON.stringify(document.getElementById("carrito").innerHTML));
   //LLamo la funcion para actualizar en tiempo real los totales
   totales();
}

function mostrarCarrito() {
   fetch(CART_INFO_URL)
      .then((resp) => resp.json())
      .then((datos) => {

         iterator = datos.articles[0];

         let articulos = "";
         //Paso todos los precios a dolares en el subtotal
         let moneda = "USD";
         let dolares = "";
         if (iterator.currency == "UYU") {
            dolares = Math.trunc(iterator.unitCost / 42);
         } else {
            dolares = iterator.unitCost;
         }
         articulos += `
                              <div class="row align-items-center border-bottom pb-4 pt-4">
                                 <div onclick="setProdID(${iterator.id})" class="col-2 text-center cursor-active">
                                        <img class="img-fluid" src="${iterator.image}" alt="${iterator.name}">
                                 </div>
                                 <div onclick="setProdID(${iterator.id})" class="col text-center cursor-active">
                                        <p class='m-0'>${iterator.name}</p>
                                 </div>
                                 <div class="col text-center">
                                        <p class='m-0'><span id="${"moneda" + iterator.id}">${iterator.currency}</span> <span id="${"precio" + iterator.id}">${iterator.unitCost}</span></p>
                                 </div>
                                 <div class="col-1 text-center">
                                    <input type="number" name="" id="${iterator.id}" oninput='carritoID(${iterator.id})' class="w-100" min="1" value="1">
                                 </div>
                                 <div class="col text-center">
                                        <b>${moneda} <span class="subt" id="${"dolares" + iterator.id}">${dolares}</span></b>
                                 </div>
                                 <div class="col-1 text-center">
                                    <i class="fa fa-trash text-danger cursor-active display-6" aria-hidden="true"></i>
                                 </div>
                              </div>
                         `;
         localStorage.setItem("carritoInicial", JSON.stringify(articulos));

         //Agregar Nuevos Productos
         if (localStorage.getItem("Carrito")) {
            let nprod = localStorage.getItem("Carrito");
            let nuevoP = JSON.parse(nprod);
            let carritoini = JSON.parse(localStorage.getItem('carritoInicial'));
            //No repetir producto por defecto
            if (nuevoP.includes(iterator.name)) {
               document.getElementById("carrito").innerHTML = nuevoP;
            } else { document.getElementById("carrito").innerHTML = nuevoP + carritoini; }

         } else {
            //sino existe carrito que cargue el por defecto
            document.getElementById("carrito").innerHTML = JSON.parse(localStorage.getItem('carritoInicial'));
         }
         //LLamo la funcion para actualizar en tiempo real los totales
         totales();
      });
}

window.addEventListener('DOMContentLoaded', (event) => {

   mostrarCarrito();

   //Sumar el costo al cambiar tipo de envio
   //Standar
   document.getElementById("standard").addEventListener('input', totales);
   //Express
   document.getElementById("express").addEventListener('input', totales);
   //Premium
   document.getElementById("premium").addEventListener('input', totales);

   //Paises
   let urlpaises =
      "https://gist.githubusercontent.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/raw/107e0bdf27918adea625410af0d340e8fc1cd5bf/countries.json";
   fetch(urlpaises)
      .then((resp) => resp.json())
      .then((datos) => {
         let paises = "";
         for (const iterator of datos.countries) {
            paises += `
            <option value="${iterator.name_en}">${iterator.name_es}</option>
        `;
            document.getElementById("pais").innerHTML =
               `<option value="" disabled selected hidden>Pais</option>` + paises;
         }
      });
   //Ciudades
   let pais = "";
   let urlciudad =
      "https://raw.githubusercontent.com/mmejiadeveloper/uruguay-departamentos-y-localidades-json/master/uruguay.json";
   function mostrarCiudad() {
      fetch(urlciudad)
         .then((resp) => resp.json())
         .then((datos) => {
            let ciudades = "";
            for (const iterator of datos) {
               ciudades += `
            <option value="${iterator.departamento}">${iterator.departamento}</option>
            `;
               document.getElementById("ciudad").innerHTML =
                  `<option value="" disabled selected hidden>Ciudad</option>` + ciudades;
            }
         });
   }
   document.getElementById("pais").addEventListener("change", function () {
      pais = document.getElementById("pais").value;
      if (pais == "Uruguay") {
         mostrarCiudad();
      } else {
         alert("actualmente solo funcionamos en Uruguay");
         document.getElementById("ciudad").innerHTML =
            `<option value="" disabled selected hidden>Ciudad</option>`;
      }
   });

   // Formulario de Pagos ---------------------------------------------------------------------
   // Formulario desactivado al iniciar
   document.getElementById("nroTarjeta").disabled = true;
   document.getElementById("codTarjeta").disabled = true;
   document.getElementById("vencimiento").disabled = true;
   document.getElementById("numCuenta").disabled = true;
   // Tarjeta de credito
   document.getElementById("tarjeta").addEventListener("input", () => {
      document.getElementById("pagoSelec").innerHTML = "Tarjeta de credito";
      document.getElementById("nroTarjeta").disabled = false;
      document.getElementById("codTarjeta").disabled = false;
      document.getElementById("vencimiento").disabled = false;
      document.getElementById("numCuenta").disabled = true;
      document.getElementById("numCuenta").classList.remove("is-invalid");
      document.getElementById("numCuenta").classList.remove("is-valid");
      document.getElementById("numCuenta").value = "";
   });
   // Transferencia Bancaria
   document.getElementById("transferencia").addEventListener("input", () => {
      document.getElementById("nroTarjeta").disabled = true;
      document.getElementById("codTarjeta").disabled = true;
      document.getElementById("vencimiento").disabled = true;
      document.getElementById("numCuenta").disabled = false;
      document.getElementById("nroTarjeta").value = "";
      document.getElementById("codTarjeta").value = "";
      document.getElementById("vencimiento").value = "";
      document.getElementById("vencimiento").classList.remove("is-invalid");
      document.getElementById("nroTarjeta").classList.remove("is-invalid");
      document.getElementById("codTarjeta").classList.remove("is-invalid");
      document.getElementById("vencimiento").classList.remove("is-valid");
      document.getElementById("nroTarjeta").classList.remove("is-valid");
      document.getElementById("codTarjeta").classList.remove("is-valid");
      document.getElementById("pagoSelec").innerHTML = "Cuenta Bancaria";
   });
   // Cerrar/Guardar - Modal
   document.getElementById("cerrarMod").addEventListener("click", () => {
      //vaciar inputs
      document.getElementById("nroTarjeta").value = "";
      document.getElementById("codTarjeta").value = "";
      document.getElementById("vencimiento").value = "";
      document.getElementById("numCuenta").value = "";
      document.getElementById("nroTarjeta").disabled = true;
      document.getElementById("codTarjeta").disabled = true;
      document.getElementById("vencimiento").disabled = true;
      document.getElementById("numCuenta").disabled = true;
      document.getElementById("transferencia").checked = false;
      document.getElementById("tarjeta").checked = false;
      //Remover clases
      document.getElementById("vencimiento").classList.remove("is-invalid");
      document.getElementById("nroTarjeta").classList.remove("is-invalid");
      document.getElementById("codTarjeta").classList.remove("is-invalid");
      document.getElementById("vencimiento").classList.remove("is-valid");
      document.getElementById("nroTarjeta").classList.remove("is-valid");
      document.getElementById("codTarjeta").classList.remove("is-valid");
      document.getElementById("numCuenta").classList.remove("is-invalid");
      document.getElementById("numCuenta").classList.remove("is-valid");
      document.getElementById("pagoSelec").innerHTML = "No seleccionada";
   });
   document.getElementById("guardarMod").addEventListener("click", () => {
      
   });
   //Boton Finalizar Compra
   document.getElementById("finCompra").addEventListener("click", validar);
   //Cerrar alert exitosa
   document.getElementById("cerrarExito").addEventListener("click", () => {
      document.getElementById('compraExito').classList.add('d-none');
   });
   //Cerrar alert error
   document.getElementById("cerrarError").addEventListener("click", () => {
      document.getElementById('compraError').classList.add('d-none');
   });
});
// Validacion formulario
function validar() {
   // Example starter JavaScript for disabling form submissions if there are invalid fields

   'use strict'
 
   // Fetch all the forms we want to apply custom Bootstrap validation styles to
   var forms = document.querySelectorAll('.needs-validation')
 
   // Loop over them and prevent submission
   Array.prototype.slice.call(forms)
     .forEach(function (form) {
       form.addEventListener('submit', function (event) {
         if (!form.checkValidity()) {
           event.preventDefault()
           event.stopPropagation()
         }
 
         form.classList.add('was-validated')
       }, false)
     })
}
