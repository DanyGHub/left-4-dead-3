function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();
}

function drawKey(ctx, text, x, y, width, height, radius) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, x, y, width, height, radius);
    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x + width / 2, y + height / 1.5);
}

function drawImage(image, x, y, width, height) {
    ctx.drawImage(image, x, y, width, height);
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let gameWidth = 1200;
let gameHeight = 600;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, gameWidth, gameHeight);

ctx.strokeStyle = "white";
ctx.lineWidth = 4;
let rectWidth = 240, rectHeight = 300, radius = 20;
let spacing = 50;
let startX = (gameWidth - (4 * rectWidth + 3 * spacing)) / 2;
let startY = (gameHeight - rectHeight) / 2;

let instrucciones = [
    { text: "Muévete con:", keys: ["A", "W", "D", "←", "↑", "→"], jumpKey: "W o ↑" },
    { text: "Dispara a los\nzombies mirando a\nla derecha o izquierda\ncon:", keys: ["S"] ,image: "public/assets/zombie.webp" },
    { text: "Ve por los bidones\nde gasolina,\nrecógelos todos", image: "public/assets/gasoline.png" },
    { text: "El final siempre\nestá a la derecha", image: "public/assets/mapa1-2.jpg" }
];

for (let i = 0; i < 4; i++) {
    let x = startX + i * (rectWidth + spacing);
    let y = startY;

    drawRoundedRect(ctx, x, y, rectWidth, rectHeight, radius);

    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    let lines = instrucciones[i].text.split("\n");
    lines.forEach((line, index) => {
        ctx.fillText(line, x + rectWidth / 2, y + 30 + index * 22);
    });

    if (instrucciones[i].keys) {
        let medX = 0, medY = 0;
        if (instrucciones[i].keys.length < 2) {
            medX = 70;
            medY = 50;
        }

        let keySpacing = 8;
        let keyWidth = 35, keyHeight = 35;
        let keyStartX = x + (rectWidth - (instrucciones[i].keys.length * (keyWidth + keySpacing) - keySpacing)) / 2;
        let keyY = y + 60;
        let aux = 3;

        instrucciones[i].keys.forEach((key, index) => {
            if (index < 3) {
                drawKey(ctx, key, keyStartX + index * (keyWidth + keySpacing) + 65 - medX, keyY + medY, keyWidth, keyHeight, 10);
            } else {
                drawKey(ctx, key, keyStartX + (index - aux) * (keyWidth + keySpacing) + 65, keyY + 45, keyWidth, keyHeight, 10);
            }
        });
    }

    if (i === 0 && instrucciones[i].jumpKey) {
        ctx.fillText("Salta con:", x + rectWidth / 2, y + 180);
        drawKey(ctx, "A", x + rectWidth / 2 - 40, y + 200, 30, 30, 10);
        drawKey(ctx, "↑", x + rectWidth / 2 + 10, y + 200, 30, 30, 10);
    }
}

ctx.fillStyle = "white";
ctx.font = "bold 32px Arial";
ctx.textAlign = "center";
ctx.fillText("Instrucciones", gameWidth / 2, 60);

let img = new Image();
img.src = "public/assets/zombie.webp";
img.onload = () => {
    drawImage(img, 420, 350, 80, 80);
}

let bullet = new Image();
bullet.src = "public/assets/ammo.png";
bullet.onload = () => {
    drawImage(bullet, 400, 350, 40, 40);
}

let gasoline = new Image();
gasoline.src = "public/assets/gasoline.png";
gasoline.onload = () => {
    drawImage(gasoline, 710, 250, 40, 40);
}

ctx.fillStyle = "white";
ctx.font = "bold 18px Arial";
ctx.fillText("Toma el objeto especial", 740, 320);
ctx.font = "14px Arial";
ctx.fillText("Solo tienes 15 segundos", 740, 340);
ctx.fillText("💀Y solo una oportunidad por vida💀", 745, 360);

let bot = new Image();
bot.src = "public/assets/botiquin.webp";
bot.onload = () => {
    drawImage(bot, 710, 370, 60, 60);
}

let fin = new Image();
fin.src = "public/assets/mapa1-2.jpg";
fin.onload = () => {
    drawImage(fin, 935, 210, 200, 200);
}

ctx.fillStyle = "crimson";
ctx.font = "bold 14px Arial";
ctx.fillText("Cuidado... en el segundo hay...", 1050, 420);
ctx.fillText("Mata a... esa cosa... 💀", 1060, 440);

const ret = document.getElementById("return");
const sonidoClick = new Audio("public/assets/audio/startSFX.mp3");

ret.addEventListener('click', () => {
    let origen = JSON.parse(localStorage.getItem('origen'));
    sonidoClick.play();

    setTimeout(() => {
        if (origen.origen === 'menu') {
            window.location.href = '/menu';
        } else {
            window.location.href = '/game';
        }
    }, 300);

});
