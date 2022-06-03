// Renomeie esse arquivo
const { connection } = require('./connection');

const getAllSales = async () => {
  const result = await connection.execute(
    `SELECT sp.sale_id, sp.product_id, sp.quantity, sales.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales As sales
      ON sp.sale_id = sales.id;
    `,
  );
  return result;
};

const getSaleById = async (id) => {
  const result = await connection.execute(
    `SELECT sp.product_id, sp.quantity, sales.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales As sales
      ON sp.sale_id = sales.id
      WHERE id = ?
    `, [id],
  );
  return result;
};

const updateStockDown = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity - ? WHERE id = ?;';
  const result = await connection.execute(query, [quantity, id]);
  return result;
};

const updateStockUp = async (id, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity = quantity + ? WHERE id = ?;';
  const result = await connection.execute(query, [quantity, id]);
  return result;
};

const registerSale = async () => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES(now())',
  );
  return result;
};

const postSale = async (saleId, productId, quantity) => {
  const query = `
    INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?);
  `;
  const result = await connection.execute(query, [saleId, productId, quantity]);
  return result;
};

const putSale = async (saleId, productId, quantity) => {
  const query = `
    UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;
  `;
  const result = await connection.execute(query, [quantity, saleId, productId]);
  return result;
};

const deleteSaleFromSales = async (id) => {
  const result = await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?;', [id]);
  return result;
};

const deleteSaleFromSalesProducts = async (id) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
  );
  return result;
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
