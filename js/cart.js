function mostrar() {
   fetch(CART_INFO_URL)
      .then((resp) => resp.json())
      .then((datos) => {
         let articulos = "";
         for (const iterator of datos.articles) {
            articulos += `
                              <div class="row align-items-center border-bottom pb-4 pt-4">
                                 <div class="col-2 text-center">
                                        <img class="img-fluid" src="${iterator.image}" alt="${iterator.name}">
                                 </div>
                                 <div class="col text-center">
                                        <p>${iterator.name}</p>
                                 </div>
                                 <div class="col text-center">
                                        <p>${iterator.currency} ${iterator.unitCost}</p>
                                 </div>
                                 <div class="col-1 text-center">
                                    <input type="number" name="" class="w-100" min="1" value="1">
                                 </div>
                                 <div class="col text-center">
                                        <b>${iterator.currency} ${iterator.unitCost * 1}</b>
                                 </div> 
                              </div>
                         `;
            document.getElementById("carrito").innerHTML += articulos;
         }
      })
}
mostrar();
//Paises
let urlpaises = "https://gist.githubusercontent.com/Yizack/bbfce31e0217a3689c8d961a356cb10d/raw/107e0bdf27918adea625410af0d340e8fc1cd5bf/countries.json";
fetch(urlpaises)
   .then((resp) => resp.json())
   .then((datos) => {
      let paises = "";
      for (const iterator of datos.countries) {
         paises += `
            <option value="${iterator.name_en}">${iterator.name_es}</option>
        `
         document.getElementById("pais").innerHTML = `<option value="" disabled selected hidden>Pais</option>` + paises
      }
   })
   //Ciudades
   let pais = '';
   let urlciudad = "https://raw.githubusercontent.com/mmejiadeveloper/uruguay-departamentos-y-localidades-json/master/uruguay.json";
   function mostrarCiudad(){
      fetch(urlciudad)
      .then((resp) => resp.json())
      .then((datos) => {
         let paises = "";
         for (const iterator of datos) {
            paises += `
            <option value="${iterator.departamento}">${iterator.departamento}</option>
            `
            document.getElementById("ciudad").innerHTML = `<option value="" disabled selected hidden>Ciudad</option>` + paises
         }
      })
   }
document.getElementById("pais").addEventListener("change", function () {
   pais = document.getElementById("pais").value;
   if(pais == 'Uruguay'){
   mostrarCiudad();
   }else{
      alert('actualmente solo funcionamos en Uruguay')
   }
})
//Agregar Nuevos Productos
if ((window.localStorage.getItem('Carrito') != undefined)) {
      let nprod = localStorage.getItem('Carrito');
      let nuevoP = JSON.parse(nprod);
      document.getElementById('carrito').innerHTML += nuevoP;
    }
