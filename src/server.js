const app = require('./app');
app.listen(process.env.PORT, () =>
  console.log("SSRMS running on port", process.env.PORT)
);
