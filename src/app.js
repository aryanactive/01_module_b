const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/01_module_b/api/auth', require('./routes/auth.routes'));
app.use('/01_module_b/api/users', require('./routes/user.routes'));
app.use('/01_module_b/api/categories', require('./routes/category.routes'));
app.use('/01_module_b/api/requests', require('./routes/request.routes'));
app.use('/01_module_b/api/reports', require('./routes/report.routes'));

module.exports = app;


