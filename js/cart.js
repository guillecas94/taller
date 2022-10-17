let usuario = localStorage.getItem('email');

if (usuario !==null){
    document.getElementById('usuario').innerHTML=usuario;
}
else{
    alert("Debe iniciar sesión")
    location.href='index.html'
}


let tabla = document.getElementById("tabla");


const mostrarCompras = (array) => {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let datos = array[i];

    htmlContentToAppend += `
    
    <th scope="row" id="image"><img style="width: 80px"; src="${datos.image}"></th>
    <td id="name">${datos.name}</td>
    <td id="cost"><div class="d-flex"><p class="me-1">${datos.currency}</p><p>${datos.unitCost}</p></div></td>
    <td>
    <input class="form-control" type="number" placeholder="1" id="${datos.id}" style="width: 80px"/>
    </td>
    <td id="subtotal">
    <div class="d-flex fw-bold" >
    <p class="me-2">${datos.currency}</p>
    <p id="${datos.unitCost}">${datos.unitCost}</p>
    </div>
    </td>
    `;
    document.getElementById("tabla").innerHTML = htmlContentToAppend;
    
    const cantidad = document.getElementById(`${datos.id}`);

    cantidad.onchange = () => {
      document.getElementById(`${datos.unitCost}`).innerHTML =
        datos.unitCost * cantidad.value;
    };
  };
};



   


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CART_INFO_URL + "25801.json").then(function (resultObj) {
      if (resultObj.status === "ok") {
        let listaCompras = resultObj.data.articles;
  
        mostrarCompras(listaCompras);
      
      }
    });
  });
  