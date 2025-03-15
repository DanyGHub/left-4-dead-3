const port = 3000;
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "../../frontend")));

app.use((req, res, next) => {                                        
    if (req.url.endsWith('.html') || !req.url.includes('.')) {
        console.log(`Método: ${req.method} en ${req.url}`);
    }
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/pages/index.html'));
});
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/pages/game.html'));
});
app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/pages/menu.html'));
});
app.get('/records', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/pages/records.html'));
});
app.get('/creditos', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/pages/creditos.html'));
});
app.get('/instrucciones', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/pages/instrucciones.html'));
})
// Inicia el servidor
app.listen(port, function() {                           
    console.log("Server running at: http://localhost:" + port);
});