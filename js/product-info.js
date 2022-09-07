function change_image(image){
   let container = document.getElementById("main-image");
   container.src = image.src;
}



document.addEventListener("DOMContentLoaded", function(event) {

document.getElementById('btn-back').addEventListener('click', function(){
    window.location.href = 'products.html';
})
//fetch comentado en products.js
fetch(PRODUCT_INFO_URL)
.then((resp) => resp.json())
.then((datos) => {
    //Imagenes
    document.getElementById('main-image').src = datos.images[0];
    document.getElementById('mini-image2').src = datos.images[1];
    document.getElementById('mini-image3').src = datos.images[2];
    document.getElementById('mini-image4').src = datos.images[3];
    document.getElementById('mini-image5').src = datos.images[0];
    //Cat
    document.getElementById('prod-cat').innerHTML = datos.category;
    //Titulo
    document.getElementById('title-product').innerHTML = datos.name;
    //Cantidad de Ventas
    document.getElementById('soldCount').innerHTML = 'Se vendieron ' + datos.soldCount + ' Unidades.';
    //Precio
    document.getElementById('price-product').innerHTML = datos.currency + ' ' + datos.cost;
    //Descripcion
    document.getElementById('desc-product').innerHTML = datos.description;

})




//Caja de Comentarios-------------------------------------------
//Estrellas
let estrellita = document.getElementsByClassName('str-e');
function estGris(){
for (let a = 0; a < estrellita.length; a++) {
    const estrellitas = estrellita[a];
    estrellitas.style.color = 'grey';
}
}
function estRoja(){
    for (let a = 0; a < estrellita.length; a++) {
        const estrellitas = estrellita[a];
        estrellitas.style.color = 'red';
    }
    }

estrellita[0].addEventListener('click', function() {
    //Pintando
    estGris()
    estrellita[0].style.color='red';
})
estrellita[1].addEventListener('click', function() {
    //Pintando
    estGris()
    estrellita[0].style.color='red';
    estrellita[1].style.color='red';
})
estrellita[2].addEventListener('click', function() {
    //Pintando
    estRoja()
    estrellita[3].style.color='grey';
    estrellita[4].style.color='grey';
})
estrellita[3].addEventListener('click', function() {
    //Pintando
    estRoja()
    estrellita[4].style.color='grey';
})
estrellita[4].addEventListener('click', function() {
    //Pintando
    estRoja()
})
//Estrellas-----------------------------------------------

//Fetch Comentarios 
fetch(PRODUCT_INFO_COMMENTS_URL)
.then((resp) => resp.json())
.then((datos) => {

    let htmlContentToAppend = '';

    let estrella = '';

    for (let a = 0; a < datos.length; a++) {
        const element = datos[a];

        // Filtro el score del comentario para mostrar estrellas-------------------------
        if(element.score == '5'){
            estrella = `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>`;
        }else if(element.score == '4'){
            estrella =
            `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>`;
        }else if(element.score == '3'){
            estrella =
            `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>`;
        }else if(element.score == '2'){
            estrella =
            `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>`;
        }else{
            estrella =
            `<i style="color: red;" class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>
            <i class="fa fa-star cursor-active str"></i>`;
        }
        // -----------------------------FILTRO-------------------------------------------

        htmlContentToAppend = `
        <div class="list-group-item list-group-item-action">
                             <div class="row">
                                 <div class="col">
                                     <div class="d-flex w-100 justify-content-between">
                                         <p class="mb-1"> `+ `<b>` + element.user + `</b>`  + ` - ` + element.dateTime + ` - ` + estrella + `</p>
                                     </div>
                                     <p class="mb-1" id="des-product">` + element.description + `</p>
                                 </div>
                             </div>
        </div>
                         `;
        document.getElementById('caja-comentarios').innerHTML += htmlContentToAppend;
    }
    
})

});