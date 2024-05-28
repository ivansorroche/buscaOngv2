const { openDb } = require('../../../database');

export default async function handler(req, res) {
  const db = await openDb();
  
  if (req.method === 'POST') {
    const { firstName, lastName, phone, mail, cep, street, neighbourhood, city, state, moreInfo } = req.body;
    await db.run('INSERT INTO users (firstName, lastName, phone, mail, cep, street, neighbourhood, city, state, moreInfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, phone, mail, cep, street, neighbourhood, city, state, moreInfo]);
    res.status(201).json({ message: 'User created successfully' });
  } else if (req.method === 'GET') {
    const users = await db.all('SELECT * FROM users');
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
