//Funcion para ordenar
let minCount = undefined;
let maxCount = undefined;
//Ordenar por cantidad
document.getElementById('sortByCount').addEventListener('click', function(){
    
});
//Ordenar alfaAsen
document.getElementById('sortAsc').addEventListener('click', function(){
    
});
//Ordenar alfaDesen
document.getElementById('sortDesc').addEventListener('click', function(){
    
});

// funcion para tomar la id con onclick
    function setCatID(id) {
        localStorage.setItem("catID", id);
        window.location = "products.html"
    }

    fetch(PRODUCTS_URL) //llamo la url con el Fetch
    .then((resp) => resp.json()) //convierto el json a objeto js.
    .then((datos) => {
            
            let htmlContentToAppend = "";
            function mostrar(){
        //Recorrro el array de la url y lo delcaro en una variable para poder usarlo con su respectiva categoria 
                for(let i = 0; i < datos.products.length; i++){ 
                    let category = datos.products[i];
        //Filtro
                    if(parseInt(category.cost) >= minCount && parseInt(category.cost) <= maxCount || minCount == undefined && maxCount == undefined)
        //agrego todo al html
                    htmlContentToAppend += `
                    <div onclick="setCatID(` + category.id + `)" class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col-3">
                                <img src="` + category.image + `" alt="` + category.description + `" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">` + category.name + ` - ` + category.currency + ` ` + category.cost +`</h4>
                                    <small class="text-muted">` + category.soldCount + ` vendidos</small>
                                </div>
                                <p class="mb-1" id="des-product">` + category.description + `</p>
                            </div>
                        </div>
                    </div>
                    `;
                    document.getElementById("container-products").innerHTML = htmlContentToAppend;
                }
            }
        //Filtrando datos --------------------
        mostrar()
        //Boton Filtro
        document.getElementById('rangeFilterCount').addEventListener('click', function(){
            if(document.getElementById('rangeFilterCountMin').value == ''){
                minCount = 1;
                maxCount = parseInt(document.getElementById('rangeFilterCountMax').value);
                htmlContentToAppend = "";
                mostrar();
            }else if(document.getElementById('rangeFilterCountMax').value == ''){
                minCount = parseInt(document.getElementById('rangeFilterCountMin').value);
                maxCount = 9999999;
                htmlContentToAppend = "";
                mostrar();
            }else{
                minCount = parseInt(document.getElementById('rangeFilterCountMin').value);
                maxCount = parseInt(document.getElementById('rangeFilterCountMax').value);
                htmlContentToAppend = "";
                mostrar();
            }
            if(document.getElementById('rangeFilterCountMin').value == '' && document.getElementById('rangeFilterCountMax').value == ''){
                minCount = 1;
                maxCount = 9999999;
                htmlContentToAppend = "";
                mostrar();
            }
                console.log(maxCount)
        });
        //Borrar Filtro
        document.getElementById('clearRangeFilter').addEventListener('click', function(){
            document.getElementById('rangeFilterCountMin').value = ''
            document.getElementById('rangeFilterCountMax').value = ''
            minCount = undefined;
            maxCount = undefined;
            htmlContentToAppend = "";
            mostrar();
        });
        //Ordenar por Buscador
        document.getElementById('buscador').value
    })
    

    
    // fin -----------------------------------------------------------------