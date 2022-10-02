let usuario = localStorage.getItem('email');

if (usuario !==null){
    document.getElementById('usuario').innerHTML=usuario;
}
else{
    alert("Debe iniciar sesión")
    location.href='index.html'
}