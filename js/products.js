//Funcion para ordenar
let minCount = undefined;
let maxCount = undefined;
let Pmin = undefined;
let Pmax = undefined;

// funcion para tomar la id con onclick
    function setCatID(id) {
        localStorage.setItem("catID", id);
    }

    fetch(PRODUCTS_URL) //llamo la url con el Fetch
    .then((resp) => resp.json()) //convierto el json a objeto js.
    .then((datos) => {
            
        //Declaro Funcion mostrar para poder utilizar Filtros
            function mostrar(){
            let htmlContentToAppend = "";
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
                    //pongo el array en lista para ordenarlo
                }
            }
        //Filtrando datos --------------------
        mostrar()
        //Boton Filtro por Precio
        document.getElementById('rangeFilterCount').addEventListener('click', function(){
            //Si esta vacio min agrego valor
            if(document.getElementById('rangeFilterCountMin').value == ''){
                minCount = 1;
                maxCount = parseInt(document.getElementById('rangeFilterCountMax').value);
                mostrar();
                //Si esta vacio max agrego valor
            }else if(document.getElementById('rangeFilterCountMax').value == ''){
                minCount = parseInt(document.getElementById('rangeFilterCountMin').value);
                maxCount = 9999999;
                mostrar();
                //Si estan los 2 con datos traigo el valor de los inputs
            }else{
                minCount = parseInt(document.getElementById('rangeFilterCountMin').value);
                maxCount = parseInt(document.getElementById('rangeFilterCountMax').value);
                mostrar();
            }
            //Si estan los 2 vacios los dejo undefined para mostrar todo
            if(document.getElementById('rangeFilterCountMin').value == '' && document.getElementById('rangeFilterCountMax').value == ''){
                minCount = undefined;
                maxCount = undefined;
                mostrar();
            }
        });
        //Borrar Filtro Precio
        document.getElementById('clearRangeFilter').addEventListener('click', function(){
            document.getElementById('rangeFilterCountMin').value = ''
            document.getElementById('rangeFilterCountMax').value = ''
            minCount = undefined;
            maxCount = undefined;
            mostrar();
        });

        ////Ordenar Precio Ascendente 
        document.getElementById('sortAsc').addEventListener('click', function(){
            datos.products.sort(function (a, b) {
                return (parseInt(a.cost) -  parseInt(b.cost));
            })
            mostrar();
        });

        //Ordenar Precio Decendente
        document.getElementById('sortDesc').addEventListener('click', function(){
            datos.products.sort(function (a, b) {
                return (parseInt(b.cost) -  parseInt(a.cost));
            })
            mostrar();
        });

        //Ordenar por relevancia Decendente
        document.getElementById('sortByCount').addEventListener('click', function(){
            //llamo a products porque category queda adentro de la funcion mostrar
            datos.products.sort(function (a, b) {
                 return (parseInt(b.soldCount) -  parseInt(a.soldCount));
             })
             mostrar();
        });
        //Ordenar por Buscador
        document.getElementById('buscador').addEventListener('keydown', function(){
        });
        document.getElementById('btn-buscar').addEventListener('click', function(){
            
        });
    })
    
    // fin -----------------------------------------------------------------