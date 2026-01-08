SSRMS Lite Backend – OdishaSkills

Base URL-:
http://<server>/01_module_b/api

Authentication:
Use JWT token in Authorization header

Database:
MySQL – ssrms.sql attached

Postman:
Postman collection included for testing all APIs

Run Project:
npm install
node src/server.js


const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.register = async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  db.query(
    "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
    [req.body.name,req.body.email,hash,req.body.role],
    ()=>res.json({success:true,message:"User registered successfully"})
  );
};


