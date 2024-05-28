const { openDb } = require('../database');

(async () => {
  const db = await openDb();
  await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, phone TEXT, mail TEXT, cep TEXT, street TEXT, neighbourhood TEXT, city TEXT, state TEXT, moreInfo TEXT)');
  await db.exec('CREATE TABLE IF NOT EXISTS ongs (id INTEGER PRIMARY KEY, name TEXT, cnpj TEXT, mail TEXT, phone TEXT, cep TEXT, street TEXT, number TEXT, neighbourhood TEXT, city TEXT, state TEXT, moreInfo TEXT)');
  console.log('Database initialized');
})();
