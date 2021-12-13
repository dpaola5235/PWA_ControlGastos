let pathSw = '/20213-PWA-EF/sw.js';
let url = window.location.href;

if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        pathSw = '/sw.js';
    }
    navigator.serviceWorker.register(pathSw);
}

// botones
let principal = $('#principal-monederos');
let monedero = $('#monedero');
let transaccion = $('#transaccion');
let categorias = $('#categorias');
let categoria = $('#categoria');
let btnGuardar = $('#btnGuardar');

let monederoNuevo = $('#monedero-nuevo')

//botones camara
let player = $('#player');
let btnCameraBack = $('#btnCamera');
let btnTakePhoto = $('#btnTakePhoto');
let photo = $('#photo');

let btnCameraMonederos = $('#btnCameraMonederos');
let btnGuardarCategorias = $('#btnGuardar-Categorias');

// inputs
let cantidad = $('#cantidad');
let monederoInput = $('#monederoInput');
let categoriaSelect = $('#categoriaSelect');
let recibo = $('#fotoRecibo');

let nombreCat = $('#nombreCategoria')
let tipo = ''
let categoriasLista = []

let montoInicial = $('#montoInicial');
let monederoNombre = $('#monederoNombre');

//Monedero Index

let nombreMonedero = $('#nombreMonedero');
let totalMonedero = $('#totalMonedero');
let total = $('#total');

// Mondero Page
let nombremone = $('#nombreMonedero-monedero');
let totalMoneP = $('#totalMonedero-monedero');
let totalMone = $('#total-monedero');
let idMonedero = $('#idMonedero');
let entradas = $('#entradas')


const camera = new Camera(player[0]);


/*$('#monederos').on('click', '.btn-ver', function (e) {
    //e.preventDefault();
    principal.fadeOut(function () {
        monedero.fadeIn(1000);
    });
   monederoPorId(idMonedero)
});*/

$('.btn-regresar').on('click', function () {
    console.log('Regresar');
    monedero.fadeOut(function () {
        principal.fadeIn(1000);
    });
    nombremone.val('');
    totalMoneP.val('');
    totalMone.val('');
    idMonedero= '';
    entradas.val('')
});

$('.btn-regresarTran').on('click', function () {
    console.log('Regresar');
    transaccion.fadeOut(function () {
        monedero.fadeIn(1000);
    });
    
    
});

$('.btn-regresarCat').on('click', function () {
    console.log('Regresar');
    categoria.fadeOut(function () {
        categorias.fadeIn(1000);
    });
});

$('.btn-transaccion').on('click', function () {
    console.log('Transaccion');
    monedero.fadeOut(function () {
        transaccion.fadeIn(1000);
    });
});

$('.btn-categoria').on('click', function () {
    categorias.fadeOut(function () {
        categoria.fadeIn(1000);
    });
});

btnCameraBack.on('click',()=>{
    //photoText = "Camara Trasera"
    camera.on().then(result=>{
        if(!result){
            alert("Error al iniciar la camara")
        } 
    })
});

btnCameraMonederos.on('click',()=>{
    //photoText = "Camara Trasera"
    camera.on().then(result=>{
        if(!result){
            alert("Error al iniciar la camara")
        } 
    })
});

btnTakePhoto.on('click',()=>{
    camera.off();
    //photoUser.attr('src',);
    let photo = camera.takePhoto();
    let image = createImage(photo);
    $('#cardPhoto').append(image);
    $('#div-player').attr('style','display:none')
});

btnGuardar.on('click',()=>{
    registrarMonedero()
    monederoNuevo.fadeOut(function () {
        monedero.fadeIn(1000);
    });
});

btnGuardarCategorias.on('click',()=>{
    registrarCategoria();
    
    categoria.fadeOut(function () {
        categorias.fadeIn(1000);
    });

});




/*************************** Funciones ***************************/

$(document).ready(function(){
    console.log('funciona')
    consultaCategorias();
    fetch('http://localhost:8090/control-gastos/monedero').
    then(res => res.json())
    .then((resJson) => {     
        if(resJson.length > 0){
            console.log('Hay monederos');
        }else{
            console.log("No hay nada registrado");
            monedero.fadeOut(function () {
                monederoNuevo.fadeIn(1000);
            });
            /*categoriasLista.forEach(cat => {
                let catOption = cargarSelectCategorias(cat)
                $('#categoriaSelect').append(catOption);
            });*/
        }
    }).catch(err => console.log(err));
    consultarMonederos()
    
});

function createImage(img) {

    let card = $(`
    <div class="col-12 text-center">       
        <img id="fotoRecibo" style="width: 300px; height: 300px;" src="${img}">        
    </div>
    `)
    return card
}

function guardarGatos(){

    let cantidadinput=cantidad.val()
    let idMonedero= monederoInput.val()
    let idCategoria = categoriaSelect.val()
    let srcRecibo = recibo.attr('src');

    fetch("http://localhost:8090/control-gastos/categoria/"+idCategoria)
    .then(res => res.json())
    .then((resp) =>{ 
        let cuerpoGasto = {
            "categoria":{
                "idCategoria":idCategoria
            },
            "monedero":{
                "idMonedero":idMonedero
            },
            "monto":cantidadinput
        }
        if(resp.tipo == 'gasto'){
            
            fetch("http://localhost:8090/control-gastos/gasto",{
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(cuerpoGasto)
            }).then(res => res.json())
            .then((resJson) =>{
                console.log(resJson);
                alert('El gasto ha sido registrado')
               
            }).catch (function (error) {
                console.log('No se registro el gasto', error);
                alert('Opps!! Ocurrio un error')
            });
    
        }else{
             
            fetch("http://localhost:8090/control-gastos/ingreso",{
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(cuerpoGasto)
            }).then(res => res.json())
            .then((resJson) =>{
                console.log(resJson);
                alert('El ingreso ha sido registrado')
               
            }).catch (function (error) {
                console.log('No se registro el ingreso', error);
                alert('Opps!! Ocurrio un error')
            });
        }

        cantidadinput.val('')
        idCategoria.val('')
        idMonedero.val('')
        
    });

    
}

function registrarMonedero(){
    let cuerpoMonedero = {
        "montoTotal":montoInicial.val(),
        "montoInicial":montoInicial.val(),
        "nombre":monederoNombre.val()
    }

    fetch("http://localhost:8090/control-gastos/monedero",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(cuerpoMonedero)
    }).then(res => res.json())
    .then((resJson) =>{
        console.log(resJson);
        alert('El monedero ha sido registrada')
        montoInicial.val(''),
        monederoNombre.val('')
    }).catch (function (error) {
        console.log('No se registro el monedero', error);
        alert('Opps!! Ocurrio un erros')
    });
}

function registrarCategoria(){
    
    if($('#ingreso').is(':checked')){
        console.log('es ingreso');
        tipo = 'ingreso'
    }else{
        console.log('es gasto');
        tipo = 'gasto'
    }

    let cuerpo = {
        "categoria": nombreCat.val(),
        "tipo":tipo 
    }
    fetch("http://localhost:8090/control-gastos/categoria",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(cuerpo)
    }).then(res => res.json())
    .then((resJson) =>{
        console.log(resJson);
        alert('La categoría ha sido registrada')
        nombreCat.val(''),
        tipo = ""
    }).catch (function (error) {
        console.log('No se registro la categoria', error);
        alert('Opps!! Ocurrio un erros')
    });
    
}

function consultaCategorias(){
    fetch("http://localhost:8090/control-gastos/categoria")
    .then(res => res.json())
    .then((resp) =>{ 
        categoriasLista = resp;       
        resp.forEach(categoria => {
            let categoriaHtml = crearCategorias(categoria)
            $('#categorias-list').append(categoriaHtml);
        });
    }).catch (function (error) {
        console.log(' la categoria', error);
        alert('Opps!! Ocurrio un errors')
    });
    
}

function crearCategorias(categoria){
    return $(`
        <li class="list-group-item list-group-item-light">${categoria.categoria}</li>
    `)
}

function cargarSelectCategorias(optionCat){
    return $(`
    <option value="${optionCat.idCategoria}">${optionCat.categoria}</option>
    `)
}

function consultarMonederos(){
    fetch('http://localhost:8090/control-gastos/monedero').
    then(res => res.json())
    .then((resJson) => {
        
        resJson.forEach(monedero => {
            let monederoLi = crearLiMonederos(monedero)
            $('#monederos-list').append(monederoLi);
        });
        
    }).catch(err => console.log(err));
}

function crearLiMonederos(monedero){
 
    return $(`
    <li class="list-group-item btn-ver" onclick="monederoPorId(${monedero.idMonedero})" id="${monedero.idMonedero}">${monedero.nombre}</li>
    `)
}

function monederoPorId(id){
    
    principal.fadeOut(function () {
        monedero.fadeIn(1000);
    });

    fetch('http://localhost:8090/control-gastos/monedero/'+id).
    then(res => res.json())
    .then((resJson) => {
        console.log("--> ",resJson)
        nombremone.append(resJson.nombre);
        totalMoneP.append(resJson.montoTotal);
        totalMone.append(resJson.montoTotal);
        entradas.append(resJson.montoTotal)
    }).catch(err => console.log(err));    
}


