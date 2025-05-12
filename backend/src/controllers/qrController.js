import db from "../config/pgDB.js";
const getTabletByUUID=async(req,res)=>{
    const { qrUUID } = req.body;
    try {
      const query  = 'SELECT t.tid, t.mid, t.expiry_date, m.medicine_name, m.ingredient, m.use, m.side_effect, m.price FROM tablets t JOIN medicines m ON t.mid = m.id WHERE t.qrUUID = $1';
      const result = await db.query(query, [qrUUID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'UUID not found' });
    }

    const row = result.rows[0];
    const currentDate = new Date();
    const expiryDate = new Date(row.expiry_date);

    const responseData = {
      tid: row.tid,
      mid: row.mid,
      expiry_date: row.expiry_date,
      status: expiryDate < currentDate ? 'Expired' : 'Not Expired',
      medicine_name: row.medicine_name,
      ingredient: row.ingredient,
      use: row.use,
      side_effect: row.side_effect,
      price: row.price
    };

    res.json(responseData);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export { getTabletByUUID };