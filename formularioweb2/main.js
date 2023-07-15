//Conectando con firebase
const firebaseConfig = {
    apiKey: "AIzaSyBW5azYE48ehN3b3Vf-Mi2SbvSiZabnAuw",
    authDomain: "registroweb-acbf3.firebaseapp.com",
    projectId: "registroweb-acbf3",
    storageBucket: "registroweb-acbf3.appspot.com",
    messagingSenderId: "113549582055",
    appId: "1:113549582055:web:8648df71e59ecd5e0a4c42"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//llamando elementos de html
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaweb = document.getElementById('contenidoDeLaweb');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');


//Funcion Registrar
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtpassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.open('contenido.html')
            console.log("Inicio de sesion correcto");
            //cargarJson();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            console.log("error de inicio de sesion")
            // ..
        });
})

//Función Iniciar Sesión
btnIngresar.addEventListener('click', () => {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtpassword').value;
    console.log("tu email es" + email + "y tu password es " + password);

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Inicio sesion correctamente");
            //cargarJson();
            contenidoDeLaweb.classList.replace('ocultar', 'mostrar');
            formulario.classList.replace('mostrar', 'ocultar');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
})

//Funcion Cerrar Sesión
btnCerrarSesion.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        console.log("Cierre cesesion correo")
        contenidoDeLaweb.classList.replace('mostrar', 'ocultar');
        formulario.classList.replace('ocultar', 'mostrar');
    }).catch((error) => {
        console.log("Error con el cierre de Sesion")
    });
})

//Funcion estado del usuario:Activo o viculo
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        //cargarJson();
        contenidoDeLaweb.classList.replace('ocultar', 'mostrar');
        formulario.classList.replace('mostrar', 'ocultar')
    } else {
        contenidoDeLaweb.classList.replace('mostrar', 'ocultar');
        formulario.classList.replace('ocultar', 'mostrar');
    }
});


