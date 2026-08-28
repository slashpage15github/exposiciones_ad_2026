const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const servidor = http.createServer((req, res) => {
    // Definimos qué archivo buscar según la URL que pida el navegador
    let rutaArchivo = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Obtenemos la extensión del archivo (ej. .html, .css, .js)
    let extension = path.extname(rutaArchivo);
    let tipoContenido = 'text/html';

    // Ajustamos el tipo de contenido para que el navegador sepa interpretarlo bien
    switch (extension) {
        case '.css':
            tipoContenido = 'text/css';
            break;
        case '.js':
            tipoContenido = 'application/javascript';
            break;
        case '.png':
            tipoContenido = 'image/png';
            break;
        case '.gif':
            tipoContenido = 'image/gif';
            break;
    }

    // Leemos el archivo del disco duro
    fs.readFile(rutaArchivo, (error, contenido) => {
        if (error) {
            // Si el archivo no existe, mandamos un Error 404
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>Error 404: Archivo no encontrado en el servidor Node.js</h1>');
        } else {
            // Si todo sale bien, enviamos el archivo con su tipo correcto
            res.writeHead(200, { 'Content-Type': `${tipoContenido}; charset=utf-8` });
            res.end(contenido);
        }
    });
});

// Ponemos a escuchar el servidor en red local
servidor.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor maestro corriendo en: http://localhost:${PORT}`);
});