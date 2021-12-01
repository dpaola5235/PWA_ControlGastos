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

