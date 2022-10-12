function carritoID(id) {
   localStorage.setItem("carritoID", id);
}
function mostrar() {
   fetch(CART_INFO_URL)
      .then((resp) => resp.json())
      .then((datos) => {
         let articulos = "";
         for (const iterator of datos.articles) {
            //Paso todos los precios a pesos en el subtotal
            let moneda = "UYU";
            let pesos = "";
            if (iterator.currency == "USD") {
               pesos = iterator.unitCost * 42;
            } else {
               pesos = iterator.unitCost;
            }
            articulos += `
                              <div class="row align-items-center border-bottom pb-4 pt-4 cursor-active">
                                 <div class="col-2 text-center">
                                        <img class="img-fluid" src="${iterator.image
               }" alt="${iterator.name}">
                                 </div>
                                 <div class="col text-center">
                                        <p>${iterator.name}</p>
                                 </div>
                                 <div class="col text-center">
                                        <p>${iterator.currency} <span id="${"precio" + iterator.id}">${iterator.unitCost
               }</span></p>
                                 </div>
                                 <div class="col-1 text-center">
                                    <input type="number" name="" id="${iterator.id}" class="w-100" min="0" value="1">
                                 </div>
                                 <div class="col text-center">
                                        <b>${moneda} <span id="${"pesos" + iterator.id}">${pesos
               }</span></b>
                                 </div> 
                              </div>
                         `;
            window.localStorage.setItem("carritoInicial", JSON.stringify(articulos))
            localStorage.setItem("carritoID", iterator.id);
         }
      });
} mostrar();
document.addEventListener('DOMContentLoaded', () => {
   //Agregar Nuevos Productos
   if (window.localStorage.getItem("Carrito") != undefined) {
      let nprod = localStorage.getItem("Carrito");
      let nuevoP = JSON.parse(nprod);
      let carritoini = JSON.parse(localStorage.getItem('carritoInicial'))
      document.getElementById("carrito").innerHTML += nuevoP + carritoini;
   } else {
      //sino existe carrito que cargue el por defecto
      document.getElementById("carrito").innerHTML += JSON.parse(localStorage.getItem('carritoInicial'));
   }
   //Multiplicando con los inputs numbers identificados por id
   document.getElementById(localStorage.getItem("carritoID")).addEventListener("input", (e) => {
      document.getElementById("pesos" + localStorage.getItem("carritoID")).innerHTML =
         document.getElementById(localStorage.getItem("carritoID")).value *
         (document.getElementById("precio" + localStorage.getItem("carritoID")).innerHTML * 42);
   })

})
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
         let paises = "";
         for (const iterator of datos) {
            paises += `
            <option value="${iterator.departamento}">${iterator.departamento}</option>
            `;
            document.getElementById("ciudad").innerHTML =
               `<option value="" disabled selected hidden>Ciudad</option>` + paises;
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

