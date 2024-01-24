require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const supportRouter = require('./routers/route.js');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('MongoDB Error:', error));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World');
  })
app.use('/api', supportRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
