//mi intento de login-------------------------------------------------
let correo = document.getElementById('form2Example1');
let pw = document.getElementById('form2Example2');
let btn = document.getElementById('btn-login');
let lblemail = document.getElementById('label-email');
let lblpw = document.getElementById('label-pw');
let formlogin = document.getElementById('cont-login');
let mail = 'prueba@hotmail.com';
let psw = 12345678;
let intentos = 5;
//Items Form Reg
let formreg = document.getElementById('form-registro');
let btnreg = document.getElementById('register');
let btnregistrarse = document.getElementById('registrarse');
let check = document.getElementById('check-terms');
let regname = document.getElementById('reg-nombre');
let regemail = document.getElementById('reg-email');
let regpsw = document.getElementById('reg-psw');
let regpsw2 = document.getElementById('reg-psw2');

formreg.style.display = 'none';

btn.addEventListener("click", function(event){
// Formulario no puede enviar datos vacios
    if (correo.value == ""){
        correo.style.borderColor = 'red';
        lblemail.style.color = 'red';
        lblemail.innerHTML = "Introduce un Email address valido.";
    }else{
        correo.style.borderColor = 'grey';
        lblemail.innerHTML = "";
    }

    if (pw.value == ""){
        pw.style.borderColor = 'red';
        lblpw.style.color = 'red';
        lblpw.innerHTML = "Introduce un password valido.";
    }else{
        pw.style.borderColor = 'grey';
        lblpw.innerHTML = "";
    }
//si el formulario no cumple estos requisitos manda error y no ejecuta el login
 if(correo.value != "" && pw.value != ""){
    if(correo.value == mail && pw.value == psw){
        window.location.href='inicio.html';
        alert('Ingresaste Correctamente');
    }else if(intentos > 0){
        alert('Mail o Contraseñas no son correctos, Le quedan '+ intentos +' intentos');
        intentos--
    }else{
        btn.disabled = true;
        alert('No te quedan intentos vuelve mas tarde');
    }
 }
//-------------------------------------------
});

// Formulario de Registro -------------------

//array para guardar datos 
let nombre = [];
let email = [];
let contraseña = [];
//------------------------



btnreg.addEventListener("click", function(event){
    formlogin.style.display = 'none';
    formreg.style.display = 'block';
});


btnregistrarse.addEventListener("click",function(event){
    if(check.checked != true){
        check.style.borderColor = 'red';
    }else{
        check.style.borderColor = 'grey';
    }

    if(regname.value == ''){
        regname.style.borderColor = 'red';
    }else{
        regname.style.borderColor = 'grey';
    }

    if(regemail.value == ''){
        regemail.style.borderColor = 'red';
    }else{
        regemail.style.borderColor = 'grey';
    }

    if(regpsw.value == ''){
        regpsw.style.borderColor = 'red';
    }else{
        regpsw.style.borderColor = 'grey';
    }

    if(regpsw2.value == ''){
        regpsw2.style.borderColor = 'red';
    }else{
        regpsw2.style.borderColor = 'grey';
    }

    if(check.checked == true && regname.value != '' && regemail.value != '' && regpsw.value != '' && regpsw2.value != ''){
        formlogin.style.display = 'block';
        formreg.style.display = 'none';
        alert('Se Registro Correctamente!')
    }
})

//-------------------------------------------------------------------------------------------