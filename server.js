const express = require('express');
const path = require('path');
const app = express();
const PORT = 3030;

// Configurar a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Redirecionar a rota inicial para o form.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Iniciar o servidor
app.listen(PORT, 'localhost', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

