const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Olá, Express!');
});

app.listen(3050, () => {
  console.log('Servidor rodando na porta 3050!');
});