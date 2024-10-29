const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const predictRoutes = require('./routes/predict');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', predictRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});