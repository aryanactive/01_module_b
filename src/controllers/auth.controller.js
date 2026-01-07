const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req,res)=>{
  const {name,email,password,role} = req.body;
  const hash = await bcrypt.hash(password,10);

  db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name,email,hash,role],
    ()=> res.status(201).json({success:true,message:"User registered successfully"})
  );
};

exports.login = (req,res)=>{
  const {email,password} = req.body;
  db.query("SELECT * FROM users WHERE email=?", [email], async (err,rows)=>{
    if(!rows.length) return res.status(401).json({success:false,message:"Invalid credentials"});

    const valid = await bcrypt.compare(password, rows[0].password);
    if(!valid) return res.status(401).json({success:false,message:"Invalid credentials"});

    const token = jwt.sign(
      {id:rows[0].id, role:rows[0].role},
      process.env.JWT_SECRET,
      {expiresIn:'1h'}
    );

    res.json({success:true, token});
  });
};

exports.profile = (req,res)=>{
  db.query(
    "SELECT id,name,role FROM users WHERE id=?",
    [req.user.id],
    (e,r)=>res.json({success:true,data:r[0]})
  );
};

exports.logout = (req,res)=>{
  res.json({success:true,message:"Logged out successfully"});
};
