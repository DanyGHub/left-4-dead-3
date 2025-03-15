const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image();
image.src = "public/assets/fondo.jpg"
image.onload = () => {
    drawImage();
}

const logo = new Image();
logo.src = "public/assets/titulo.webp";
logo.onload = () => {
    ctx.drawImage(logo, canvas.width / 2 + 20, 20);
}

function drawImage() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

const iniciar = document.getElementById('game');
const records = document.getElementById('records');
const instrucciones = document.getElementById('instructions');
const creditos = document.getElementById('credits');
const salir = document.getElementById('exit');
const sonidoClick = new Audio("public/assets/audio/backsound.mp3");


records.addEventListener("click", () => {
    sonidoClick.play();

    setTimeout(() => {
        window.location.href = "/records";
    }, 300);
    sonidoClick.play();

    setTimeout(() => {
        window.location.href = "/records";
    }, 300);
});

creditos.addEventListener("click", () => {
    sonidoClick.play();

    setTimeout(() => {
        window.location.href = "/creditos";
    }, 300);
    sonidoClick.play();

    setTimeout(() => {
        window.location.href = "/creditos";
    }, 300);
});

salir.addEventListener("click", () => {
    sonidoClick.play();

    setTimeout(() => {
        window.location.href = "/";
    }, 300);
    sonidoClick.play();

    setTimeout(() => {
        window.location.href = "/";
    }, 300);
});

iniciar.addEventListener("click", () => {
    sonidoClick.play();
    sonidoClick.play();
    localStorage.setItem('origen', JSON.stringify({'origen': 'game'}));

    setTimeout(() => {
        window.location.href = "/instrucciones";
    }, 300);

    setTimeout(() => {
        window.location.href = "/instrucciones";
    }, 300);
});

instrucciones.addEventListener('click', () => {
    sonidoClick.play();
    sonidoClick.play();
    localStorage.setItem('origen', JSON.stringify({'origen': 'menu'}));

    setTimeout(() => {
        window.location.href = "/instrucciones";
    }, 300);

    setTimeout(() => {
        window.location.href = "/instrucciones";
    }, 300);
});

