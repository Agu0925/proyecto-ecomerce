//Cambiar de imagen
function change_image(image) {
    let container = document.getElementById("main-image");
    container.src = image.src;
}
//id
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html";
}
document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("btn-back").addEventListener("click", function () {
        window.location.href = "products.html";
    });
    fetch(PRODUCT_INFO_URL)
        .then((resp) => resp.json())
        .then((datos) => {
            //Funcion para guardar datos en el carrito
            function datoscarrito() {
                let D = "";
                let moneda = "UYU";
                let pesos = "";
                //Paso todos los precios a pesos en el subtotal
                if (datos.currency == "USD") {
                    pesos = datos.cost * 42;
                } else {
                    pesos = datos.cost;
                }

                D += `
            <div class="row align-items-center border-bottom pb-4 pt-4 cursor-active">
                     <div class="col-2 text-center">
                            <img class="img-fluid" src="${datos.images[0]
                    }" alt="${datos.name}">
                     </div>
                     <div class="col text-center">
                            <p>${datos.name}</p>
                     </div>
                     <div class="col text-center">
                            <p>${datos.currency} <span id="${"precio" + datos.id}">${datos.cost}</span></p>
                     </div>
                     <div class="col-1 text-center">
                        <input type="number" name="" id="${datos.id}" class="w-100" min="0" value="1">
                     </div>
                     <div class="col text-center">
                            <b>${moneda} <span id="${"pesos" + datos.id}">${pesos
                    }</span></b>
                     </div> 
            </div>
        `;
                //Filtros para carrito---------------------------
                //si existe carrito sumarle a la info existente
                if (window.localStorage.getItem("Carrito") != undefined) {
                    let nprod = localStorage.getItem("Carrito");
                    let nuevoP = JSON.parse(nprod);
                    D += nuevoP;
                    //si existe un producto no repetirlo
                    if (window.localStorage.getItem('Carrito').includes(datos.name)) {
                        document.getElementById("alerta-carrito").style.color = "red";
                        document.getElementById("alerta-carrito").innerHTML =
                            "El producto ya existe en el carrito";
                    }
                    //si no existe el producto agregarlo
                    else {
                        localStorage.setItem("Carrito", JSON.stringify(D));
                        document.getElementById("alerta-carrito").style.color = "green";
                        document.getElementById("alerta-carrito").innerHTML =
                            "El producto se agrego correctamente";
                    }
                    //si no existe carrito crearlo y sumarle la informacion
                } else {
                    localStorage.setItem("Carrito", JSON.stringify(D));
                    document.getElementById("alerta-carrito").style.color = "green";
                    document.getElementById("alerta-carrito").innerHTML =
                        "El producto se agrego correctamente";
                }
            }
            //Agregar al carrito -----------------------------------------
            document
                .getElementById("agregar-alcarrito")
                .addEventListener("click", function () {
                    datoscarrito()
                });
            //Imagenes
            document.getElementById("main-image").src = datos.images[0];
            document.getElementById("mini-image2").src = datos.images[1];
            document.getElementById("mini-image3").src = datos.images[2];
            document.getElementById("mini-image4").src = datos.images[3];
            document.getElementById("mini-image5").src = datos.images[0];
            //Cat
            document.getElementById("prod-cat").innerHTML = datos.category;
            //Titulo
            document.getElementById("title-product").innerHTML = datos.name;
            //Cantidad de Ventas
            document.getElementById("soldCount").innerHTML =
                "Se vendieron " + datos.soldCount + " Unidades.";
            //Precio
            document.getElementById("price-product").innerHTML =
                datos.currency + " " + datos.cost;
            //Descripcion
            document.getElementById("desc-product").innerHTML = datos.description;
            //Productos Relacionados
            let htmlrelacionados = "";
            for (let a = 0; a < datos.relatedProducts.length; a++) {
                const element = datos.relatedProducts[a];

                htmlrelacionados = `
                                 <div class="col-2 border-end cursor-active" onclick="setProdID(${element.id})">
                                    <p class="text-center"> ${element.name} </p>
                                     <div class="d-flex w-100 justify-content-between">
                                        <img class="img-fluid" src="${element.image}" alt="${element.name}">
                                     </div>
                                 </div>
                         `;

                document.getElementById("relacionados").innerHTML += htmlrelacionados;
            }
        });

    //Estrellas para Comentarios------------------------------------------------
    let estrellita = document.getElementsByClassName("str-e");
    function estGris() {
        for (let a = 0; a < estrellita.length; a++) {
            const estrellitas = estrellita[a];
            estrellitas.style.color = "grey";
        }
    }
    function estRoja() {
        for (let a = 0; a < estrellita.length; a++) {
            const estrellitas = estrellita[a];
            estrellitas.style.color = "red";
        }
    }

    estrellita[0].addEventListener("click", function () {
        //Pintando
        estGris();
        estrellita[0].style.color = "red";
    });
    estrellita[1].addEventListener("click", function () {
        //Pintando
        estGris();
        estrellita[0].style.color = "red";
        estrellita[1].style.color = "red";
    });
    estrellita[2].addEventListener("click", function () {
        //Pintando
        estRoja();
        estrellita[3].style.color = "grey";
        estrellita[4].style.color = "grey";
    });
    estrellita[3].addEventListener("click", function () {
        //Pintando
        estRoja();
        estrellita[4].style.color = "grey";
    });
    estrellita[4].addEventListener("click", function () {
        //Pintando
        estRoja();
    });

    //Caja de Comentarios-------------------------------------------
    //Fetch Comentarios
    fetch(PRODUCT_INFO_COMMENTS_URL)
        .then((resp) => resp.json())
        .then((datos) => {
            let htmlContentToAppend = "";

            let estrella = "";

            for (let a = 0; a < datos.length; a++) {
                const element = datos[a];

                // Filtro el score del comentario para mostrar estrellas-------------------------
                if (element.score == "5") {
                    estrella = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>`;
                } else if (element.score == "4") {
                    estrella = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>`;
                } else if (element.score == "3") {
                    estrella = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>`;
                } else if (element.score == "2") {
                    estrella = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>`;
                } else {
                    estrella = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>`;
                }
                // -----------------------------FILTRO-------------------------------------------

                htmlContentToAppend =
                    `
        <div class="list-group-item list-group-item-action">
                             <div class="row">
                                 <div class="col">
                                     <div class="d-flex w-100 justify-content-between">
                                         <p class="mb-1"> ` +
                    `<b>` +
                    element.user +
                    `</b>` +
                    ` - ` +
                    element.dateTime +
                    ` - ` +
                    estrella +
                    `</p>
                                     </div>
                                     <p class="mb-1" id="des-product">` +
                    element.description +
                    `</p>
                                 </div>
                             </div>
        </div>
                         `;
                document.getElementById("caja-comentarios").innerHTML +=
                    htmlContentToAppend;
            }
        });
    //Comentar
    //hora
    let anio = new Date().getFullYear();
    let mes = new Date().getMonth() + 1;
    let dia = new Date().getDate();
    let hora = new Date().getHours();
    let minutos = new Date().getMinutes();
    let segundos = new Date().getSeconds();
    //ifs para agregar un 0 cuando el dato no tiene 2 digitos
    //Mes
    if (mes < 10) {
        mes = "0" + mes;
    }
    //Dia
    if (dia < 10) {
        dia = "0" + dia;
    }
    //Hora
    if (hora < 10) {
        hora = "0" + hora;
    }
    //Minutos
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    //Segundos
    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    // Fecha Completa
    let fecha =
        anio + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;

    document.getElementById("btn-com").addEventListener("click", function () {
        //Valoracion con Estrellas
        let estrellas = "";
        let puntaje = "";
        function valoracion() {
            if (document.getElementById("1").checked == true) {
                puntaje = 1;
                estrellas = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>`;
            } else if (document.getElementById("2").checked == true) {
                puntaje = 2;
                estrellas = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>`;
            } else if (document.getElementById("3").checked == true) {
                puntaje = 3;
                estrellas = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>`;
            } else if (document.getElementById("4").checked == true) {
                puntaje = 4;
                estrellas = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i class="fa fa-star cursor-active str"></i>`;
            } else if (document.getElementById("5").checked == true) {
                puntaje = 5;
                estrellas = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>
                <i style="color: red;" class="fa fa-star cursor-active str"></i>`;
            }
        }
        //---------------------------------------------------------------------------------
        let comentar = "";
        //traigo al array de usuario y lo conviero en js para usarlo
        let arrayCuentas = localStorage.getItem("Cuentas");
        let cuentas = JSON.parse(arrayCuentas);
        //------------------------------------
        if (document.getElementById("comentario").value != "") {
            if (
                document.getElementById("1").checked == true ||
                document.getElementById("2").checked == true ||
                document.getElementById("3").checked == true ||
                document.getElementById("4").checked == true ||
                document.getElementById("5").checked == true
            ) {
                document.getElementById("coment-error").style.color = "green";
                document.getElementById("coment-error").innerHTML =
                    "Gracias por contarnos tu experiencia";
                //llamo la funcion de arriba
                valoracion();
                //--------------------------
                comentar =
                    `
            <div class="list-group-item list-group-item-action">
                             <div class="row">
                                 <div class="col">
                                     <div class="d-flex w-100 justify-content-between">
                                         <p class="mb-1"> ` +
                    `<b>` +
                    cuentas.nombre +
                    `</b>` +
                    ` - ` +
                    fecha +
                    ` - ` +
                    estrellas +
                    `</p>
                                     </div>
                                     <p class="mb-1" id="des-product">` +
                    document.getElementById("comentario").value +
                    `</p>
                                 </div>
                             </div>
            </div>
                         `;
                document.getElementById("caja-comentarios").innerHTML += comentar;
                localStorage.setItem(
                    window.localStorage.getItem("prodID"),
                    JSON.stringify(comentar)
                );
            } else {
                document.getElementById("coment-error").style.color = "red";
                document.getElementById("coment-error").innerHTML =
                    "No puede enviar un comentario sin valoracion";
            }
        } else {
            document.getElementById("coment-error").style.color = "red";
            document.getElementById("coment-error").innerHTML =
                "No puede enviar un comentario vacio";
        }
        //limpio inputs
        document.getElementById("comentario").value = "";
        estGris();
        puntaje = "";
    });
    //Guardar Comentarios para cada producto en Local Storage utilizando el prodID
    if (
        window.localStorage.getItem(window.localStorage.getItem("prodID")) !=
        undefined
    ) {
        let coment = localStorage.getItem(window.localStorage.getItem("prodID"));
        let comentarios = JSON.parse(coment);
        document.getElementById("caja-comentarios").innerHTML += comentarios;
    }
});
