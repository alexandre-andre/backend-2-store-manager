const app = require('./app');
const express = require('express');
const routes = require('./routes');

app.use(express.json());

app.use('/products', routes.ProductController);
app.use('/sales', routes.SalesController);

app.all('*', (err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server internal error' });
});
// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto
app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
