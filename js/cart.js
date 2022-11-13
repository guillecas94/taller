let usuario = localStorage.getItem('email');
let tabla = document.getElementById('tabla');

if (usuario !== null) {
  document.getElementById('usuario').innerHTML = usuario;
}
else {
  alert("Debe iniciar sesión")
  location.href = 'index.html'
}
function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}
function mostrarCompras(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let datos = array[i];

    htmlContentToAppend += `
    
    <th scope="row" id="image"><img style="width: 80px"; src="${datos.image}"></th>
    <td id="name">${datos.name}</td>
    <td><div class="d-flex"><p class="me-1">${datos.currency}</p><p id="cost">${datos.unitCost}</div></div></td>
    <td>
    <input
     class="form-control"
     name="cantInput" 
     type="number" 
     placeholder="1" 
     id="cantidad" 
     style="width: 80px" 
     value="${datos.count}"
     min="1"
     oninput="precioTotal()"/>
     
     </td>
    <div class="d-flex fw-bold" >
    <td class="me-2">${datos.currency} <span id="subtotal"></span></td>
    
    </div>
    </td>
    `;

  }
  document.getElementById("tabla").innerHTML = htmlContentToAppend;

};

function precioTotal() {
  const cant = document.getElementById('cantidad').value;
  const costo = document.getElementById('cost').innerHTML;
  const carrosubtotal = document.getElementById("subtotal");

  precioTotalConEnvio()

  return carrosubtotal.innerHTML = costo * cant;


};

function precioTotalConEnvio() {
  const premium = document.getElementById("premium");
  const express = document.getElementById("express");
  const standard = document.getElementById("standard");

  const subtotal = document.getElementById("mostrarCostoSubtotal");
  const costoEnvio = document.getElementById("mostrarCostoEnvio");
  const total = document.getElementById("mostrarTotal");
  const subtotalTabla = document.getElementById("subtotal").innerHTML;
  subtotal.innerHTML = subtotalTabla;


  if (premium.checked) {
    costoEnvio.innerHTML = Math.round(subtotalTabla * 0.15)
  } else if (express.checked) {
    costoEnvio.innerHTML = Math.round(subtotalTabla * 0.07)
  } else if (standard.checked) {
    costoEnvio.innerHTML = Math.round(subtotalTabla * 0.05)
  }

  return total.innerHTML = parseFloat(subtotalTabla) + parseFloat(costoEnvio.innerText);

};


function desactivarFormaPago() {
  if (document.getElementById('credito').checked) {
    document.getElementById('numtarjeta').disabled = false;
    document.getElementById('codTarjeta').disabled = false;
    document.getElementById('venTarjeta').disabled = false;
    document.getElementById('numCuenta').disabled = true;

  } if (document.getElementById('transBancaria').checked) {
    document.getElementById('numtarjeta').disabled = true;
    document.getElementById('codTarjeta').disabled = true;
    document.getElementById('venTarjeta').disabled = true;
    document.getElementById('numCuenta').disabled = false;

  }
}


document.addEventListener("DOMContentLoaded", function () {
  getJSONData(CART_INFO_URL + "25801.json").then(function (resultObj) {
    if (resultObj.status === "ok") {
      let listaCompras = resultObj.data.articles;

      mostrarCompras(listaCompras);
      precioTotal();
      precioTotalConEnvio();

    }
  })
  document.addEventListener("change", function () {
    precioTotal();
  });
});





(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

        } else {
          showAlertSuccess();
          event.preventDefault();
          event.stopPropagation();

        }

        form.classList.add("was-validated");

      },
      false
    );
  });
})();