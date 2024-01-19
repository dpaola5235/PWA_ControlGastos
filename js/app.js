let pathSw = '/20213-PWA-EF/sw.js';
let url = window.location.href;

if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        pathSw = '/sw.js';
    }
    navigator.serviceWorker.register(pathSw);
}

// botones
let principal = $('#principal-mon');
let monedero = $('#mon');
let transaccion = $('#transaccion');
let categorias = $('#cat');
let categoria = $('#categoria');
let btnGuardar = $('#btnGuardar');
let btnGuardarIndex = $('#btnGuardar-index')

let newMonedero = $('#newMonedero');

let monederoNuevo = $('#monedero-nuevo')

//botones camara
let player = $('#player-index');
let btnCameraBack = $('#btnCamera-index');
let btnTakePhoto = $('#btnTakePhoto-index');
let photo = $('#photo');

let btnCameraMonederos = $('#btnCameraMonederos');
let btnGuardarCategorias = $('#btnGuardar-Categorias');

// inputs
let cantidad = $('#cantidad-index');
let monederoInput = $('#monederoInput-index');
let categoriaSelect = $('#categoriaSelect-index');
let recibo = $('#fotoRecibo');
let idMonederoIndex = $('#idMonedero-index')

let nombreCat = $('#nombreCategoria')
let tipo = ''
let categoriasLista = []

let montoInicial = $('#montoInicial');
let monederoNombre = $('#monederoNombre');

//Monedero Index

let nombreMonedero = $('#nombreMonedero');
let totalMonedero = $('#totalMonedero');
let total = $('#total');
//let entradasIndex = $('#entradas-index');
//let salidasIndex = $('#salidas-index')

// Mondero Page
let nombremone = $('#nombreMonedero-monedero');
let totalMoneP = $('#totalMonedero-monedero');
let totalMone = $('#total-monedero');
let idMonedero = $('#idMonedero');
let entradas = $('#entradas');

let monederoInputMonederos = $('#monederoInput-monederos');
let cantidadMonederos = $('#cantidad-monederos')


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
    nombremone.empty()
    totalMoneP.empty();
    totalMone.empty();
    idMonedero.empty()
    entradas.empty();
    $('#salidas-index').empty()
    $('#entradas-index').empty()
    $('#gastos-nombre').empty()
    $('#ingresos-nombre').empty()
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

// index agregar una nueva transaccion
$('.btn-transaccion').on('click', function () {
    monedero.fadeOut(function () {
        transaccion.fadeIn(1000);
    });
    consultaCategorias();
});

$('.btn-categoria').on('click', function () {
    categorias.fadeOut(function () {
        categoria.fadeIn(1000);
    });
});

$('.btn-transaccionMonederos').on('click',function(){
    principal.fadeOut(function(){
        newMonedero.fadeIn(1000)
    })
});

$('.btn-regresarMonedero').on('click',function(){
    newMonedero.fadeOut(function(){
        principal.fadeIn(1000)
    });
})

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
    $('#cardPhoto-index').append(image);
    $('#div-player').attr('style','display:none');
    recibo.attr('src','')
});

btnGuardar.on('click',()=>{
    registrarMonedero()
    monederoNuevo.fadeOut(function () {
        monedero.fadeIn(1000);
    });
});

$('#btnGuardar-monedero').on('click',()=>{
    registrarMonedero()
    newMonedero.fadeOut(function(){
        principal.fadeIn(1000)
    })
})

btnGuardarCategorias.on('click',()=>{
    registrarCategoria();
    
    categoria.fadeOut(function () {
        categorias.fadeIn(1000);
    });

});

btnGuardarIndex.on('click',()=>{
    guardarGatos()
    transaccion.fadeOut(function () {
        monedero.fadeIn(1000);
    });
});

$('#btnGuardarTran-monedero').on('click',()=>{
    guardarNuevaTransaccion();
    transaccion.fadeOut(function () {
        monedero.fadeIn(1000);
    });
});


/*************************** Funciones ***************************/

$(document).ready(function(){
    console.log('funciona')
    
    fetch('http://localhost:8090/control-gastos/monedero').
    then(res => res.json())
    .then((resJson) => {     
        if(resJson.length > 0){            
            console.log('Hay monederos');
            consultaUltimoMonedero()            
            categoriasLista.forEach(cat => {
                let catOption = cargarSelectCategorias(cat)
                $('#categoriaSelect-index').append(catOption);
            });
            consultaCategorias()
            consultarMonederos()
        }else{
            console.log("No hay nada registrado");
            monedero.fadeOut(function () {
                monederoNuevo.fadeIn(1000);
            });            
        }
    }).catch(err => console.log(err));
    consultaCategorias()
    consultarMonederos()
    
});

function consultaUltimoMonedero(){
    fetch('http://localhost:8090/control-gastos/monedero/ultimoMonedero').
    then(res => res.json())
    .then((resp) => {
        nombreMonedero.append(resp.nombre);
        monederoInput.val(resp.nombre);
        idMonederoIndex.val(resp.idMonedero)
        totalMonedero.append(resp.montoTotal)
        total.append(resp.montoTotal)
        //entradasIndex.append(resp.montoTotal)
        consultaGastos(resp.idMonedero)
        consultaIngresos(resp.idMonedero)
    }).catch(err => console.log(err));
}

function consultaGastos(id){
    fetch('http://localhost:8090/control-gastos/gasto-by-monedero/'+id).
    then(res => res.json())
    .then((resp) => {
        resp.forEach(gasto => {
            let gastoLi = cargarGastosLi(gasto)
            $('#salidas-index').append(gastoLi);
            let nombregasto = cargarGastoNombre(gasto);
            $('#gastos-nombre').append(nombregasto);
        });
        //salidasIndex.append(resp.monto) 
        //
    }).catch(err => console.log(err));
}

function cargarGastosLi(gasto){
    return $(`
    <li class="list-group-item text-danger">- ${gasto.monto}</li>
    `)
}

function cargarGastoNombre(gasto){
    return $(`
    <li class="list-group-item ">${gasto.categoria.categoria}</li>
    `)
}

function  consultaIngresos(id){
    fetch('http://localhost:8090/control-gastos/ingreso-by-monedero/'+id).
    then(res => res.json())
    .then((resp) => {
        resp.forEach(ingreso => {
            let ingresoLi = cargarIngresoLi(ingreso)
            $('#entradas-index').append(ingresoLi);
            let ingresonombre = cargaringresoNombre(ingreso);
            $('#ingresos-nombre').append(ingresonombre);
        });
    }).catch(err => console.log(err));
}

function cargarIngresoLi(ingreso){
    return $(`
    <li class="list-group-item text-success"> +${ingreso.monto}</li>
    `)
}

function cargaringresoNombre(ingreso){
    return $(`
    <li class="list-group-item"> ${ingreso.categoria.categoria}</li>
    `)
}


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
    let idCategoria = categoriaSelect.val()
    let srcRecibo = btoa(recibo.attr('src'));
    

    fetch("http://localhost:8090/control-gastos/categoria/"+idCategoria)
    .then(res => res.json())
    .then((resp) =>{ 
        let cuerpoGasto = {
            "categoria":{
                "idCategoria":idCategoria
            },
            "monedero":{
                "idMonedero":idMonederoIndex.val()
            },
            "monto":cantidadinput,
            "comprobante" : srcRecibo
        }
        console.log(cuerpoGasto);
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

        cantidad.val('')
        categoriaSelect.val('')
        idMonederoIndex.val('')
        $('#cardPhoto-index').empty();
        
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
        $('#ingreso').prop('checked', false);
        $('#gasto').prop('checked', false);

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
    idMonedero.val(id);

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
        entradas.append(resJson.montoTotal);
        monederoInputMonederos.val(resJson.nombre)
        consultaGastos(id)
        consultaIngresos(resJson.idMonedero)
    }).catch(err => console.log(err));    
}

function crearMonederosLi(monedero){
    return $(`
    <li class="list-group-item text-success"> +${monedero.monto}</li>
    `)
}

function guardarNuevaTransaccion(){
    let cantidadinput=cantidadMonederos.val()   
    let idCategoria = categoriaSelect.val()
    let srcRecibo = recibo.attr('src');
    if(srcRecibo != null){
        btoa(srcRecibo);
    }
    

    fetch("http://localhost:8090/control-gastos/categoria/"+idCategoria)
    .then(res => res.json())
    .then((resp) =>{ 
        let cuerpoGasto = {
            "categoria":{
                "idCategoria":idCategoria
            },
            "monedero":{
                "idMonedero":idMonedero.val()
            },
            "monto":cantidadinput,
            "comprobante" : srcRecibo
        }
        console.log(cuerpoGasto);
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

        cantidadMonederos.val('')
        categoriaSelect.val('')
        idMonedero.val('')
        recibo.attr('src','')
        $('#cardPhoto-index').empty();
        
        
    });
}


