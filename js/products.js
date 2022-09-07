//Variables para ordenar y buscar
let minCount = undefined;
let maxCount = undefined;
let buscar = undefined;
// funcion para tomar la id con onclick
    function setProdID(id) {
        localStorage.setItem("prodID", id);
        window.location = "product-info.html";
    }

    fetch(PRODUCTS_URL) //llamo la url con el Fetch
    .then((resp) => resp.json()) //convierto el json a objeto js.
    .then((datos) => {
        //Cambio pie de titulo segun la categoria.
            document.getElementById('h2-pie').innerHTML = "Verás aquí todos los productos de la categoria "+ datos.catName +".";
        //Declaro Funcion mostrar para poder utilizar Filtros
            function mostrar(){
            let htmlContentToAppend = "";
        //Recorrro el array de la url y lo delcaro en una variable para poder usarlo con su respectiva categoria 
            for(let i = 0; i < datos.products.length; i++){ 
                    let category = datos.products[i];
        //Filtro
                if(parseInt(category.cost) >= minCount && parseInt(category.cost) <= maxCount || minCount == undefined && maxCount == undefined){
        //Filtro Buscador
                        //toLowerCase para convertir todo a minusculas y includes para filtrar por cada string del array
                    if (category.name.toLowerCase().includes(buscar) || buscar == undefined || category.description.toLowerCase().includes(buscar)){
                    //agrego todo al html
                        htmlContentToAppend += `
                        <div onclick="setProdID(` + category.id + `)" class="list-group-item list-group-item-action cursor-active">
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
            }
        }
        //Filtrando datos ---------------------
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
        document.getElementById('buscador').addEventListener('input', function(){
            buscar =  this.value.toLowerCase();
            mostrar();
        });
        document.getElementById('btn-buscar').addEventListener('click', function(){
            buscar =  document.getElementById('buscador').value.toLowerCase();
            mostrar();
        });
    })
    
    // fin -----------------------------------------------------------------