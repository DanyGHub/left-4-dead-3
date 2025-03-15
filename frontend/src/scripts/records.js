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

    ctx.font = '64px Future Rot'
    ctx.fillStyle = 'white'
    ctx.fillText("RECORDS", 100, 120);
}

const newFont = new FontFace('MiFuente', 'url(/public/assets/font/future_rot_transform/FutureRot.woff2)');

newFont.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
    console.log('Fuente cargada');
    
}).catch((error) => {
    console.error('Error al cargar la fuente:', error);
});


let records = [];
const recordsTableBody = document.querySelector('#records tbody');


function recordsTable() {
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        if(key.startsWith("superviviente")) {
            let newRecord = JSON.parse(localStorage.getItem(key))
            records.push(newRecord);
        }
    }

    records.sort((a, b) => b.puntuacion - a.puntuacion);
    console.log(records);


    renderTable();
}

function renderTable() {
    recordsTableBody.innerHTML = '';

    records.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.jugador}</td>
            <td>${record.puntuacion}</td>
            <td>${record.fecha}</td>
        `;
        recordsTableBody.appendChild(row);
    });
}

recordsTable();