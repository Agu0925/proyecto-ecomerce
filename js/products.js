//Funcion para ordenar de a-z z-a y cantidad
function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
// funcion para tomar la id con onclick
    function setCatID(id) {
        localStorage.setItem("catID", id);
        window.location = "products.html"
    }
    fetch(PRODUCTS_URL) //llamo la url con el Fetch
    .then((resp) => resp.json()) //convierto el json a objeto js.
    .then((datos) => {
        let htmlContentToAppend = "";

//Recorrro el array de la url y lo delcaro en una variable para poder usarlo con su respectiva categoria 
        for(let i = 0; i < datos.products.length; i++){ 
            let category = datos.products[i];
//-------------------------------------------------
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
    })
    // fin -----------------------------------------------------------------