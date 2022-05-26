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
}

module.exports = {
  getAllSales,
  getSalesById,
}
