// Renomeie esse arquivo
const { connection } = require('./connection');

const getAllProducts = async () => {
  const [allProducts] = await connection.execute(`SELECT * FROM products;`);
  return allProducts;
};

const getProductById = async (id) => {
  const [[product]] = await connection.execute(
    `SELECT * FROM products WHERE id = ?`, [id]
  );

  if (!product) return null;

  return product;
}

const getProductByName = async (name) => {
  const [[product]] = await connection.execute(
    `SELECT * FROM products WHERE name = ?`, [name]
  );

  if (!product) return null;

  return product;
}

const postProductdByName = async (name, quantity) => {
  let productByName = await getProductByName(name);
  if (productByName) return null;

  await connection.execute(`
    INSERT INTO products(name, quantity) VALUES (?, ?); 
  `, [name, quantity]);
  
  productByName = await getProductByName(name);
  return productByName;
};

module.exports = {
  getAllProducts,
  getProductById,
  postProductdByName,
}