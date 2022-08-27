let categoria = localStorage.getItem('catID')

let productsArray = [];


function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.products.length; i++){ 
        let datosAutos = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
            <div class="col-3">
                    <img src="` + datosAutos.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ datosAutos.name + ` ` + datosAutos.currency + ` `+ datosAutos.cost +`</h4> 
                        <p> `+ datosAutos.description +`</p> 
                        </div>
                        <small class="text-muted">` + datosAutos.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL + categoria + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
});
