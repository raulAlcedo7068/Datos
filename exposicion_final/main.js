const firebaseConfig = {
    apiKey: "AIzaSyBW5azYE48ehN3b3Vf-Mi2SbvSiZabnAuw",
    authDomain: "registroweb-acbf3.firebaseapp.com",
    projectId: "registroweb-acbf3",
    storageBucket: "registroweb-acbf3.appspot.com",
    messagingSenderId: "113549582055",
    appId: "1:113549582055:web:8648df71e59ecd5e0a4c42"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Initialize Firebase authentication and get a reference to the service
const auth = firebase.auth();
const fs = firebase.firestore();

//llamando elemento HTML
let BTN_Registrar = document.getElementById('BTN_Registrar');
let BTN_Ingresar = document.getElementById('BTN_Ingresar');
let Biblioteca = document.getElementById('Biblioteca');
let formulario = document.getElementById('formulario');
let btnYoutube = document.getElementById('btnGoogle');
let btnfacebook = document.getElementById('btnfacebook');
let btnPublicar = document.getElementById('btnPublicar');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');



//Funcion de Registro
BTN_Registrar.addEventListener('click', () => {
    let email = document.getElementById('TXT-Email').value;
    let password = document.getElementById('TXT-Contraseña').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.open('Aceptado.html')

            console.log("Inicio sesión correcto");
            Biblioteca.classList.replace('ocultar', 'mostrar');
            formulario.classList.replace('mostrar', 'ocultar');
            var user = userCredential.user;
            datos.json
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
})


//Funciones de Iniciar Sesión
BTN_Ingresar.addEventListener('click', () => {
    let email = document.getElementById('TXT-Email').value;
    let password = document.getElementById('TXT-Contraseña').value;
    console.log("tu email es" + email + "y tu password es " + password);


    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Iniciar sesion correctamente");
            imprimirComentariosPatallas();
            Biblioteca.classList.replace('ocultar', 'mostrar');
            formulario.classList.replace('mostrar', 'ocultar');
            datos.json

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });

})

//Funcion estado del usuario:Activo o viculo

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        Biblioteca.classList.replace('ocultar', 'mostrar');
        formulario.classList.replace('mostrar', 'ocultar');
    } else {
        Biblioteca.classList.replace('mostrar', 'ocultar');
        formulario.classList.replace('ocultar', 'mostrar');
    }
});
//Function facebook
btnfacebook.addEventListener('click', () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            console.log("Inicio sesion facebook")
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error de fabeook");
        });

})
//Function login con Google
btnGoogle.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            console.log("Inicio sesión con google");

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error de login con google");
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

//Funccion de jalar datos Jason

function cargarJson() {
    fetch('data.json')
        .then(function (res) {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            let html = '';
            data.forEach((productos) => {
                html += `
        <div class="producto">
         <p> ${productos.marca} </p>
          <img src="${productos.img}" width="50px" class="imgProducto>
          <strong> ${productos.precio}</strong>
          </div>
        `;
            })
            document.getElementById('resultado').innerHTML = html;
        })
}
// funcion Agregar datos de firestore
btnPublicar.addEventListener('click', () => {
    db.collection("comentarios").add({
        titulo: txtTitulo = document.getElementById('txtTitulo').value,
        descripcion: TxTdescripcion = document.getElementById('TxTdescripcion').value,
    })
        .then((docRef) => {
            console.log("Se guardo tu comentario");
            imprimirComentariosPatallas();
        })
        .catch((error) => {
            console.error("Error al Guardar ");
        });
})


//Funcion leer datos o imprimir comentarios en pantalla
function imprimirComentariosPatallas() {
    db.collection("Libro").get().then((querySnapshot) => {
        let html = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.data().Titulo}`);
            console.log(`${doc.data().lectura}`);
            var listarDatos = `
            <li class="listarDatos">
            <br>
                <h5 class="listarDatosH5"> ${doc.data().Titulo} </5>
                <p> ${doc.data().libro} </p>
                <br><br>
             </li>
            `;
            html += listarDatos;
        }); document.getElementById('imprimirComentariosPatallas').innerHTML = html;
    });
}
