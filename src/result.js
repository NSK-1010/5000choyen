/* globals Drawer */
let drawer = null;

const queries = window.location.href.split('?')[1];
const params = {};

queries.split('&').forEach(function (query) {
    const name = query.split('=')[0];
    const data = query.split('=')[1];
    params[name] = data;
});

window.onload = function() {
    const canvas = document.createElement("canvas");
    canvas.height = Number(params.height);
    canvas.width = Number(params.width);

    drawer = new Drawer(canvas);
    drawer.lang = "ja";

    var fontA = new FontFaceObserver('Noto Sans JP');
    var fontB = new FontFaceObserver('Noto Serif JP');
    var fontC = new FontFaceObserver('Noto Sans SC');
    var fontD = new FontFaceObserver('Noto Serif SC');

    Promise.all([fontA.load(), fontB.load(), fontC.load(), fontD.load()]).then(function () {
        const ctx = drawer.ctx;

        drawer.bottomText.onLoadImg(() => {
            drawer.useTransparent = params.color == 'true';
            drawer.bottomText.useImg = params.order == 'true';
            if (decodeURI(params.correctjp) == "yes") {
                drawer.topText.value = cjpgen(decodeURI(params.top));
                drawer.bottomText.value = cjpgen(decodeURI(params.bottom));
            } else {
                drawer.topText.value = decodeURI(params.top);
                drawer.bottomText.value = decodeURI(params.bottom);
            }
            drawer.bottomText.x = Number(params.bx);

            drawer.refresh();

            document.fonts.ready.then(function () {
                drawer.refresh();
                document.getElementById('result').src = ctx.canvas.toDataURL("image/png");
                document.getElementById('result2').src = ctx.canvas.toDataURL("image/png");
            });

            document.getElementById('result').src = ctx.canvas.toDataURL("image/png");
            document.getElementById('result2').src = ctx.canvas.toDataURL("image/png");
        });
    });
};
