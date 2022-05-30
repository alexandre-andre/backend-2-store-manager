const fs = require('fs');
const sinon = require('sinon');
const { expect } = require('chai');

// const frisby = require("frisby");
// const mysql = require("mysql2/promise");
const restoreDb = require("./restoreDb");
require("dotenv").config();

describe('01 - Escreva testes para cobrir 35% das camadas da sua aplicação', () => {
  const url = `http://localhost:${process.env.PORT}`;
  let connection;

  beforeAll(async() => {
    const {
      MYSQL_USER,
      MYSQL_PASSWORD,
      MYSQL_HOST
    } = process.env;

    connection = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
    }); 
  });

  afterAll(async () => {
    await connection.execute("DROP DATABASE StoreManager")
    await connection.end();
  });
  
});