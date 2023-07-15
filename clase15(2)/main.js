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
const db = firebase.firestore();


//llamando elementos de html o del Dom
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaweb = document.getElementById('contenidoDeLaweb');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnYoutube = document.getElementById('btnGoogle');
let btnfacebook = document.getElementById('btnfacebook');
let btnPublicar = document.getElementById('btnPublicar');


//Funcion Registrar
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtpassword').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            //window.open('contenido.html')
            console.log("Inicio de sesion correcto");
            cargarJson();
            imprimirComentariosPatallas();

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
            cargarJson();
            imprimirComentariosPatallas();
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
        cargarJson();
        imprimirComentariosPatallas();
        contenidoDeLaweb.classList.replace('ocultar', 'mostrar');
        formulario.classList.replace('mostrar', 'ocultar')
    } else {
        contenidoDeLaweb.classList.replace('mostrar', 'ocultar');
        formulario.classList.replace('ocultar', 'mostrar');
    }
});

//Function login con Google
btnGoogle.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var credential = result.credential;
            console.log("Inicio sesión con google");
            imprimirComentariosPatallas();
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error de login con google");
        });

})
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
            
            <div class="productos">
           
             <br>
                <div> <img src="${productos.img}" width="50px" class="imgProducto"></div>
                <div>
                  <p> ${productos.marca} </p>
                  <br>
                <strong>$/ ${productos.precio}</strong>
                <strong> ${productos.tipo}</strong>
                <strong> ${productos.precio}</strong>
                </div>
              
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
    db.collection("comentarios").get().then((querySnapshot) => {
        let html = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.data().titulo}`);
            console.log(`${doc.data().descripcion}`);
            var listarDatos = `
            <li class="listarDatos">
            <br>
                <h5 class="listarDatosH5"> ${doc.data().titulo} </5>
                <p> ${doc.data().descripcion} </p>
                <br><br>
             </li>
            `;
            html += listarDatos;
        }); document.getElementById('imprimirComentariosPatallas').innerHTML = html;
    });
}







