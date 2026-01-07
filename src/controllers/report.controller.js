const db = require('../config/db');

exports.categoryWise = (req,res)=>{
  const sql = `
    SELECT c.name, COUNT(r.id) as total
    FROM categories c
    LEFT JOIN requests r ON c.id = r.category_id
    GROUP BY c.name
  `;

  db.query(sql,(err,rows)=>{
    if(err) return res.status(500).json({success:false});

    let result = {};
    rows.forEach(r=>{
      result[r.name] = r.total;
    });

    res.json(result);
  });
};
