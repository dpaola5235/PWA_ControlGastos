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

//botones camara
let player = $('#player');
let btnCameraBack = $('#btnCameraBack');
let btnTakePhoto = $('#btnTakePhoto');
let photo = $('#photo');

const camera = new Camera(player[0]);


$('#monederos').on('click', '.btn-ver', function (e) {
    //e.preventDefault();
    principal.fadeOut(function () {
        monedero.fadeIn(1000);
    })
});

$('.btn-regresar').on('click', function () {
    console.log('Regresar');
    monedero.fadeOut(function () {
        principal.fadeIn(1000);
    });
});

$('.btn-regresarTran').on('click', function () {
    console.log('Regresar');
    transaccion.fadeOut(function () {
        monedero.fadeIn(1000);
    });
    $('#fotoRecibo').attr('src','')
    $('#div-player').attr('style','height: 300px;')
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

btnTakePhoto.on('click',()=>{
    camera.off();
    //photoUser.attr('src',);
    let photo = camera.takePhoto();
    let image = createImage(photo);
    $('#cardPhoto').append(image);
    $('#div-player').attr('style','display:none')
});


/*************************** Funciones ***************************/

function createImage(img) {

    let card = $(`
    <div class="col-12 text-center">       
        <img id="fotoRecibo" style="width: 300px; height: 300px;" src="${img}">        
    </div>
    `)
    return card
}

