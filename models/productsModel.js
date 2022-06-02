// Renomeie esse arquivo
const { connection } = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute('SELECT * FROM StoreManager.products;');
  return allProducts;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return product;
};

const getProductByName = async (name) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?', [name],
  );
  return product;
};

const postProductdByName = async (name, quantity) => {
  let productByName = await getProductByName(name);
  if (productByName) return null;

  await connection.execute(
    'INSERT INTO StoreManager.products(name, quantity) VALUES (?, ?);', [name, quantity],
  );
  
  productByName = await getProductByName(name);
  return productByName;
};

const putProduct = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
  return await connection.execute(query, [name, quantity, id]);
};

const deleteProductById = async (id) => {
  await connection.execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return null;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  postProductdByName,
  putProduct,
  deleteProductById,
};