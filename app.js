const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routers/userRouter');
const authRoutes = require('./routers/authRouter');
const app = express();
app.use(cors());
const port = 3001;
const __DBURL =
  'mongodb+srv://admin:admin123@mastercluster.dxy63ez.mongodb.net/General?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose.connect(__DBURL).then(() => {
  try {
    app.listen(port, () => console.log(`Server conneccted to port ${port}`));
  } catch (e) {
    console.log(e.message);
  }
})
.catch(e=>{
    console.log(`Invalid database connection, error message: ${e.message}`)
})
app.listen(3001);

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello world');
});
