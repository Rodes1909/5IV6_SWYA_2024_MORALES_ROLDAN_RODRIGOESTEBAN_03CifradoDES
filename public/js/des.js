var socket = io();
var form = document.getElementById("form-cifrar")
var key = document.getElementById('clave').value;
var entradaCifrado = document.getElementById('descifrar');


form.addEventListener('submit', function (e) {
    e.preventDefault();
    var cifrado = document.getElementById("cifrado-output").innerHTML;
    var key = document.getElementById('clave').value;
    var datos = {
        key: key,
        textoCifrado: cifrado
    };

    socket.emit("datos", datos);
    document.getElementById('clave').value = "";
    document.getElementById('mensaje').value = "";
});

socket.on('datos', datos => {
    console.log("llegó", datos)
    var key = datos['key'];
    document.getElementById('texto-cifrado').innerHTML = datos['textoCifrado'];
    document.getElementById('texto-clave').innerHTML = datos['key'];
});

function cifrado() {
    var password = document.getElementById('clave').value;
    var mensaje = document.getElementById('mensaje').value;
    var cifrado = CryptoJS.DES.encrypt(mensaje, password);
    document.getElementById("cifrado-output").innerHTML = cifrado;
}
function saveTextAsFile()
{      
// grab the content of the form field and place it into a variable
    var textToWrite = document.getElementById("texto-cifrado").innerHTML;
//  create a new Blob (html5 magic) that conatins the data from your form feild
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
// Specify the name of the file to be saved
    var fileNameToSaveAs = "TextoCifrado.txt";
    
// Optionally allow the user to choose a file name by providing 
// an imput field in the HTML and using the collected data here
// var fileNameToSaveAs = txtFileName.text;
 
// create a link for our script to 'click'
    var downloadLink = document.createElement("a");
//  supply the name of the file (from the var above).
// you could create the name here but using a var
// allows more flexability later.
    downloadLink.download = fileNameToSaveAs;
// provide text for the link. This will be hidden so you
// can actually use anything you want.
    downloadLink.innerHTML = "My Hidden Link";
    
// allow our code to work in webkit & Gecko based browsers
// without the need for a if / else block.
    window.URL = window.URL || window.webkitURL;
          
// Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
// when link is clicked call a function to remove it from
// the DOM in case user wants to save a second file.
    downloadLink.onclick = destroyClickedElement;
// make sure the link is hidden.
    downloadLink.style.display = "none";
// add the link to the DOM
    document.body.appendChild(downloadLink);
    
// click the new link
    downloadLink.click();
}

function destroyClickedElement(event)
{
// remove the link from the DOM
    document.body.removeChild(event.target);
}

function descifrado() {
    var archivo = document.getElementById('archivoDescifrar');
    var contenidoArchivo = archivo.files[0];

    if (contenidoArchivo) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var txt = event.target.result;
            try {
                var descifrado = CryptoJS.DES.decrypt(txt, document.getElementById('texto-clave').innerHTML);
                document.getElementById("texto-descifrado").innerHTML = descifrado.toString(CryptoJS.enc.Utf8);
            } catch (error) {
                console.error("Error al descifrar:", error);
            }
        }
        reader.readAsText(contenidoArchivo);
    }
}
function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = event.target.result;
      // Do something with result
    });
/*async function subirArchivoDescifrar(file){

    var txt = await file.text();
    descifrado(key, txt)

}*/ 

// Vvalidamos
const Validar = () =>{

    var archivoEscogido = document.getElementById('archivoDescifrar');
    var contenidoarchivoEscogido = archivoEscogido.value;
    var ext = /(.txt)$/i;

    if(!ext.exec(contenidoarchivoEscogido)){

        alert('Por favor, ingrese un archivo .txt valido');
        archivoEscogido.value = '';
        return false;

    }
    /*else{

        if(archivoEscogido.files && archivoEscogido.files[0]){

            var lector = new FileReader();
            lector.onload = function(event){

                subirArchivoDescifrar(archivoEscogido.files[0]); 

            }
        

            lector.readAsDataURL(archivoEscogido.files[0]);

        }

    }*/
}
}