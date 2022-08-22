function login() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;

    if(email === ''){
        alert('Debe ingresar su e-Mail');
    } else if(pass === ''){
        alert('Debe ingresar su Contraseña');
    } else {
        sessionStorage.setItem('email',email)
        location.href='home.html';
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById("btnInicio").addEventListener('click',()=>{
        login();
    })
})

