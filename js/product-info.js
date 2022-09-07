function change_image(image){

    var container = document.getElementById("main-image");

   container.src = image.src;
}



document.addEventListener("DOMContentLoaded", function(event) {

document.getElementById('btn-back').addEventListener('click', function(){
    window.location.href = 'products.html';
})


});