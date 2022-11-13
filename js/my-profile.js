let usuario = localStorage.getItem('email');

if (usuario !==null){
    document.getElementById('usuario').innerHTML=usuario;
}
else{
    alert("Debe iniciar sesión")
    location.href='index.html'
}

function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
  }
function showAlertDanger(){
    document.getElementById("alert-danger").classList.add("show")
}

function mostrar(){
    
    document.getElementById("e-mail").value = usuario;
    
    let nombre = localStorage.getItem("nombre");
    if (nombre === null){
        document.getElementById("nameProfile").placeholder = "";}
        else{
        document.getElementById("nameProfile").value = nombre;}

    let apellido = localStorage.getItem("apellido");
    if (apellido === null){
        document.getElementById("lastnameProfile").placeholder = "";}
        else{ 
        document.getElementById("lastnameProfile").value = apellido;}

    let nombre2 = localStorage.getItem("segundo nombre");
    if (nombre2 === null){
        document.getElementById("sNameProfile").placeholder = "";}
        else{
        document.getElementById("sNameProfile").value = apellido;}

    let apellido2 = localStorage.getItem("segundo apellido");
    if (apellido2 === null){
    document.getElementById("sLastnameProfile").placeholder = "";}
    else {
        document.getElementById("sLastnameProfile").value = apellido2;
    }

    let telefono = localStorage.getItem("telefono");
    if (telefono === null){
    document.getElementById("telProfile").placeholder = "";}
    else{
        document.getElementById("telProfile").value = telefono;
    }
}


  
mostrar();

(() => {
    'use strict'

const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            
        }else{
            event.preventDefault()
            event.stopPropagation()
            guardarCambios()
            showAlertSuccess();
        }

        form.classList.add('was-validated')
    }, false)
})
})()

function guardarCambios(){
    let nombre = document.getElementById("nameProfile").value;
    let nombre2 = document.getElementById("sNameProfile").value;
    let apellido = document.getElementById("lastnameProfile").value;
    let apellido2 = document.getElementById("sLastnameProfile").value;
    let telefono = document.getElementById("telProfile").value;

    localStorage.setItem("nombre", nombre);
    localStorage.setItem("segundo nombre", nombre2);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("segundo apellido", apellido2);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("telefono", telefono);   
}
