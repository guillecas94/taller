let categoria = localStorage.getItem('catID')

let productsArray = [];


function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let datos = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
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
    showProductsList(productsArray);
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
    })

    document.getElementById('limpiar').addEventListener('click',() =>{
        limpiar();

    })
   
});
