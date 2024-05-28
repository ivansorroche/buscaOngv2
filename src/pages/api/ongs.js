const { openDb } = require('../../../database');

export default async function handler(req, res) {
  const db = await openDb();
  
  if (req.method === 'POST') {
    const { name, cnpj, mail, phone, cep, street, number, neighbourhood, city, state, moreInfo } = req.body;
    await db.run('INSERT INTO ongs (name, cnpj, mail, phone, cep, street, number, neighbourhood, city, state, moreInfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, cnpj, mail, phone, cep, street, number, neighbourhood, city, state, moreInfo]);
    res.status(201).json({ message: 'ONG created successfully' });
  } else if (req.method === 'GET') {
    const ongs = await db.all('SELECT * FROM ongs');
    res.status(200).json(ongs);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
