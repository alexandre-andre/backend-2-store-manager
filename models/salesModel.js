// Renomeie esse arquivo
const { connection } = require('./connection');
const { serializeAllSales, serializeById } = require('../utils');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, sales.date
      FROM sales_products AS sp
      INNER JOIN sales As sales
      ON sp.sale_id = sales.id;
    `);
  return serializeAllSales(sales);
};

const getSalesById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT sp.product_id, sp.quantity, sales.date
      FROM sales_products AS sp
      INNER JOIN sales As sales
      ON sp.sale_id = sales.id
      WHERE id = ?
    `, [id]
  );
  
  if (!sale) return null;

  return serializeById(sale);
};

const updateStockAfterSale = async (id, quantity) => {
  const query = `UPDATE products SET quantity = quantity - ? WHERE id = ?;`;
  await connection.execute(query, [quantity, id]);
};

const updateStockAfterSaleReintegration = async (id, quantity) => {
  const query = `UPDATE products SET quantity = quantity + ? WHERE id = ?;`;
  await connection.execute(query, [quantity, id]);
};

const registerSale = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales(date) VALUES(now())');
  return insertId;
};

const postSale = async (saleId, productId, quantity) => {
  const query = `INSERT INTO sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?);`;
  await connection.execute(query, [saleId, productId, quantity]);
  return { productId, quantity };
};

const putSale = async (saleId, productId, quantity) => {
  const query = `UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;`;
  await connection.execute(query, [quantity,  saleId, productId]);
  return { productId, quantity };
};

module.exports = {
  getAllSales,
  getSalesById,
  registerSale,
  postSale,
  putSale,
  updateStockAfterSale,
  updateStockAfterSaleReintegration,
};
