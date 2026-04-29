const db = require('../config/db.config');

exports.submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO contact_submissions (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject, message, ip_address || null]
    );

    res.status(201).json({ message: 'Message sent successfully!', id: result.insertId });
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
};
