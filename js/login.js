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

// Msg Error o Success
function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

//volver atras si ya esta registrado

document.getElementById('sign-in').addEventListener("click", function(event){
    formlogin.style.display = 'block';
    formreg.style.display = 'none';
    check.checked = false;
        regname.value = '';
        regemail.value = '';
        regpsw.value = '';
        regpsw2.value = '';
        document.getElementById('lblname').innerHTML = ''
        document.getElementById('lblemail').innerHTML = ''
        document.getElementById('lblpsw').innerHTML = ''
        document.getElementById('lblpsw2').innerHTML = ''
        regname.style.borderColor = 'grey';
        regemail.style.borderColor = 'grey';
        regpsw.style.borderColor = 'grey';
        regpsw2.style.borderColor = 'grey';
        check.style.borderColor = 'grey';
});

//array para guardar datos 
   let arraynombre = [];
   let arrayemail = [];
   let arraycontraseña = [];
   console.log(arrayemail)
//Validacion de Formulario y Errores


btnreg.addEventListener("click", function(event){
    formlogin.style.display = 'none';
    formreg.style.display = 'block';
});


btnregistrarse.addEventListener("click",function(event){
    //check
    if(check.checked != true){
        check.style.borderColor = 'red';
    }else{
        check.style.borderColor = 'grey';
    }
    //Name----------------------------------------------------------------------------
    if (regname.value.length < 5 || regname.value == '' || regname.value.length > 30){
        regname.style.borderColor = 'red';
        if(regname.value.length < 5){
            document.getElementById('lblname').innerHTML = 'El nombre debe contener al menos 5 caracteres';
        }
    }else if(regname.value.length > 30){
        document.getElementById('lblname').innerHTML = 'El nombre es muy largo';
    }else{
        regname.style.borderColor = 'grey';
        document.getElementById('lblname').innerHTML = '';
    }
    //Email------------------------------------------------------------------------------
    if(regemail.value.length < 5 || regemail.value == '' || regemail.value.length > 45){
        regemail.style.borderColor = 'red';
        if(regemail.value.length < 5){
            document.getElementById('lblemail').innerHTML = 'El email es muy corto';
        }
    }else{
        regemail.style.borderColor = 'grey';
        document.getElementById('lblemail').innerHTML = '';
    }
    //Password-----------------------------------------------------------------------------------
    if(regpsw.value.length < 6 || regpsw.value == '' || regpsw.value.length > 30){
        regpsw.style.borderColor = 'red';
        if(regpsw.value.length < 5){
            document.getElementById('lblpsw').innerHTML = 'La password debe contener al menos 6 caracteres';
        }
    }else{
        regpsw.style.borderColor = 'grey';
        document.getElementById('lblpsw').innerHTML = '';
    }
    //Repetir Password----------------------------------------------------------------------------
    if(regpsw2.value.length < 6 || regpsw2.value == '' || regpsw2.value.length > 30 || regpsw2.value != regpsw.value){
        regpsw2.style.borderColor = 'red';
        if(regpsw.value.length < 5 || regpsw2.value != regpsw.value){
            document.getElementById('lblpsw2').innerHTML = 'La password no coincide';
        }
    }else{
        regpsw2.style.borderColor = 'grey';
        document.getElementById('lblpsw2').innerHTML = '';
    }
    //Validacion Boton----------------------------------------------------------------------------------
    if(check.checked == true && regname.value != '' && regemail.value != '' && regpsw.value != '' && regpsw2.value != '' && regpsw.value == regpsw2.value){
        formlogin.style.display = 'block';
        formreg.style.display = 'none';
        check.checked = false;
        regname.value = '';
        regemail.value = '';
        regpsw.value = '';
        regpsw2.value = '';
        alert('Se registro Correctamente')
        showAlertSuccess()
    }else{
        showAlertError()
    }
})


//-------------------------------------------------------------------------------------------