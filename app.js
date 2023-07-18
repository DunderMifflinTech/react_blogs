const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routers/userRouter');
const authRoutes = require('./routers/authRouter');
const testRouter = require('./routers/testRouter');
const app = express(); 
app.use(cors(), express.json(),cookieParser());
module.exports.port = port = 3001;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin:admin123@mastercluster.dxy63ez.mongodb.net/General?retryWrites=true&w=majority').then(() => {
  try {
    app.listen(port, () => console.log(`Server connected to port ${port}`));
  } catch (e) {
    console.log(e.message);
  }
})
.catch(e=>{
    console.log(`Invalid database connection, error message: ${e.message}`)
})


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/test', testRouter);

app.get('*', (req, res) => {
  res.send('Error 404 page not found :(');
});