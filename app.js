const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routes.ProductController);
app.use('/sales', routes.SalesController);

// app.use((err, _req, res, _next) => {
//   return res.status(err.status || 500).json({ message: err.message });
// });

app.all('*', (err, _req, res, _next) => {
  console.log(err);
  res.status(err.status || 500).json({ message: err.message || 'Server internal error' });
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
