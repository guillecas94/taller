let categoria = localStorage.getItem('catID')

let productsArray = [];



function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let datos = array[i];
        htmlContentToAppend += `
        <div onclick="setProductId(${datos.id})" class="list-group-item list-group-item-action">
            <div class="row">
            <div class="col-3">
                    <img src="` + datos.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ datos.name + ` ` + datos.currency + ` `+ datos.cost +`</h4> 
                        <p> `+ datos.description +`</p> 
                        </div>
                        <small class="text-muted">` + datos.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}

function filtrar (){ 
let precioMin = parseInt(document.getElementById('precioMin').value);
let precioMax = parseInt(document.getElementById('precioMax').value);
let listaFiltrada = productsArray.filter(datos => datos.cost >= precioMin && datos.cost <= precioMax);
    showProductsList(listaFiltrada)
}

function limpiar(){
    document.getElementById("precioMin").value = "";
    document.getElementById("precioMax").value = "";

    precioMin = undefined;
    precioMax = undefined;

    showProductsList(productsArray);
}

function orderDesc (){
    productsArray.sort((a,b) => {
        return b.cost - a.cost;
    })
    showProductsList(productsArray);
}
    
function orderAsc (){
        productsArray.sort((a,b) => {
            return   a.cost - b.cost;
        })
        showProductsList(productsArray);
}
function orderSoldCount (){
    productsArray.sort((a,b) => {
        return   b.soldCount - a.soldCount ;
    })
    showProductsList(productsArray);
}
    
function setProductId(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL + categoria + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        }
    });
    document.getElementById('filtrar').addEventListener('click',()=>{
        filtrar();
    });

    document.getElementById('limpiar').addEventListener('click',() =>{
        limpiar();

    });
    document.getElementById("minMax").addEventListener("click", () =>{
        orderAsc();
    });

    document.getElementById("maxMin").addEventListener("click", () =>{
      orderDesc();
    });

    document.getElementById("soldCount").addEventListener("click", () =>{
        orderSoldCount();
    });
   
});
