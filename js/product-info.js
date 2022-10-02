let infoProducto = localStorage.getItem("productID");
let infoProducts = [];
let comentsProducts = [];
let usuario = localStorage.getItem('email');

if (usuario !==null){
    document.getElementById('usuario').innerHTML=usuario;
}
else{
    alert("Debe iniciar sesión")
    location.href='index.html'
}




function mostrarProducto() {
  let htmlContentToAppend = "";

  htmlContentToAppend = `
        <div class="text-center p-4">
        <h2>${infoProducts.category}</h2>
          <h5>Verás aqui todos las Caracteristicas de ${infoProducts.name}</h5>
        
          
        </div>
        <div class="container img-thumbnail">
        <div class="row"><div class="col-md-6"><div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${infoProducts.images[0]}" class="d-block w-100 img-thumbnail" alt="auto1">
          </div>
          <div class="carousel-item">
            <img src="${infoProducts.images[1]}" class="d-block w-100 img-thumbnail" alt="auto2">
          </div>
          <div class="carousel-item">
            <img src="${infoProducts.images[2]}" class="d-block w-100 img-thumbnail" alt="auto2">
          </div>
          <div class="carousel-item">
            <img src="${infoProducts.images[3]}" class="d-block w-100 img-thumbnail" alt="auto3">
          </div>
          
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div></div>

      <div class="col-md-6">
      <div class="d-flex w-100 justify-content-between">
          <div class="mb-1">
          <h4>${infoProducts.name}</h4>
          <hr>
          <span class="mb-1" style="font-weight:bold;">Precio: </span>${infoProducts.currency} ${infoProducts.cost}<br>
          <span class="mb-1" style="font-weight:bold;">Descripcion: </span>${infoProducts.description}<br>
          <span class="mb-1" style="font-weight:bold;">Categoria: </span>${infoProducts.category}<br>
          <span class="mb-1" style="font-weight:bold;">Cantidad vendidos: </span>${infoProducts.soldCount}
          </div></div></div></div></div><br>
        `;
  document.getElementById("showProduct").innerHTML = htmlContentToAppend;
}

function mostrarComentarios(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let datos = array[i];
    htmlContentToAppend += `
      <div class="container img-thumbnail">
      <div class="d-flex w-100 justify-content-between">
    <div class="mb-1">
     <img src="/img/img_perfil.png" width=30> ${
       datos.user
     }</i> - <small class="text-muted"><i class="fas fa-clock"></i>${
      datos.dateTime
    }</small>
      <p class="mb-1">${datos.description}</p>
      </div></div>
      ${puntuacion(datos.score)}
      
		</div>
	
      `;
    document.getElementById("showComents").innerHTML = htmlContentToAppend;
  }
}

function puntuacion(puntos) {
  let estrellas = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= puntos) {
      estrellas += '<img src="/img/star.png" width=20>';
    } else {
      estrellas += '<img src="/img/starvacia.png" width=15>';
    }
  }
  return estrellas;
}

function AgregarComentario() {
  let comentario = {};
  comentario.newComent = document.getElementById("newComent").value;
  comentario.newScore = document.getElementById("newScore").value;
  let today = new Date();
  let now = today.toLocaleString();
  let htmlContentToAppend = "";
  htmlContentToAppend += `
      <div class="container img-thumbnail">
      <div class="d-flex w-100 justify-content-between">
    <div class="mb-1">
     <img src="/img/img_perfil.png" width=30> ${user}</i> - <small class="text-muted"><i class="fas fa-clock"></i>${now}</small>
      <p class="mb-1">${comentario.newComent}</p>
      </div></div>
      ${puntuacion(comentario.newScore)}
      
		</div>
	
      `;
  document.getElementById("newComents").innerHTML = htmlContentToAppend;
  document.getElementById("newComent").value = "";
  document.getElementById("newScore").value = "";
}

function mostrarProdRelacionados() {
  let htmlContentToAppend = ` <br><h4>Productos Relacionados:</h4> <hr><br>`;

  for (let relacionado of infoProducts.relatedProducts) {
    htmlContentToAppend += `     
               <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${relacionado.image}">
  <div class="card-body">
    <p class="card-text">${relacionado.name}</p>
    <button class="mt-2 btn btn-primary my-3"onclick= setProductId(${relacionado.id})>Mas detalles</button>
  </div></div>

          <br> 
         `;

    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
  }
}

function setProductId(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL + infoProducto + EXT_TYPE).then(function (
    resultObj
  ) {
    if (resultObj.status === "ok") {
      infoProducts = resultObj.data;
      mostrarProducto(infoProducts);
      mostrarProdRelacionados(infoProducts.relatedProducts);
      //console.log(infoProducts.relatedProducts)
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL + infoProducto + EXT_TYPE).then(
    function (resultObj) {
      if (resultObj.status === "ok") {
        comentsProducts = resultObj.data;
        mostrarComentarios(comentsProducts);
        //console.log(comentsProducts)
      }
    }
  );
});

document.getElementById("btnAgrego").addEventListener("click", function () {
  AgregarComentario();
});










/*Falta modificar fecha para que quede igual a los tomados del json
Falta controlar que el usuario este logeado antes de comentar
 falta controlar que no ingrese un numero mayor a 5 o otro otro diseño mas intuitivo 
 ver como agregar mas de 1 comentario

 FALTA DESAFIATE 1 y 2
*/
