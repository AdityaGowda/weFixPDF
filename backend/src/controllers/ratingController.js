const db = require('../config/db.config');

exports.submitRating = async (req, res) => {
  const { tool_slug, rating, feedback, user_name } = req.body;
  const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!tool_slug || !rating) {
    return res.status(400).json({ error: 'Tool slug and rating are required.' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO tool_ratings (tool_slug, rating, feedback, user_name, ip_address) VALUES (?, ?, ?, ?, ?)',
      [tool_slug, rating, feedback || null, user_name || null, ip_address || null]
    );

    res.status(201).json({ message: 'Rating submitted successfully!', id: result.insertId });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ error: 'Failed to submit rating.' });
  }
};

exports.getRatingStats = async (req, res) => {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ error: 'Tool slug is required.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT AVG(rating) as averageRating, COUNT(*) as totalRatings FROM tool_ratings WHERE tool_slug = ?',
      [slug]
    );

    const stats = rows[0];
    res.status(200).json({
      averageRating: parseFloat(stats.averageRating || 0).toFixed(1),
      totalRatings: stats.totalRatings || 0,
    });
  } catch (error) {
    console.error('Error fetching rating stats:', error);
    res.status(500).json({ error: 'Failed to fetch rating stats.' });
  }
};
