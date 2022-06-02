// Renomeie esse arquivo
const { connection } = require('./connection');
const { serializeAllSales, serializeById } = require('../utils');

const getAllSales = async () => {
  return await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, sales.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales As sales
      ON sp.sale_id = sales.id;
    `,
  );
};

const getSaleById = async (id) => {
  return await connection.execute(
    `SELECT sp.product_id, sp.quantity, sales.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales As sales
      ON sp.sale_id = sales.id
      WHERE id = ?
    `, [id],
  );
};

const updateStockDown = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?;';
  await connection.execute(query, [quantity, id]);
};

const updateStockUp = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity + ? WHERE id = ?;';
  return await connection.execute(query, [quantity, id]);
};

const registerSale = async () => {
  return await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES(now())',
  );
};

const postSale = async (saleId, productId, quantity) => {
  const query = `
    INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?);
  `;
  return await connection.execute(query, [saleId, productId, quantity]);
};

const putSale = async (saleId, productId, quantity) => {
  const query = `
    UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;
  `;
  return await connection.execute(query, [quantity, saleId, productId]);
};

const deleteSaleFromSales = async (id) => {
  return await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?;', [id]);
};

const deleteSaleFromSalesProducts = async (id) => {
  return await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?;', [id]);
};

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
  postSale,
  putSale,
  updateStockDown, 
  updateStockUp,
  deleteSaleFromSales,
  deleteSaleFromSalesProducts,
};
