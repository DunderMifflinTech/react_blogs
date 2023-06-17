const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressFileUpload = require('express-fileupload');
const userRoutes = require('./routers/userRouter');
const authRoutes = require('./routers/authRouter');
const app = express();
app.use(cors(), express.json(), expressFileUpload());
module.exports.port = port = 3001;
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


app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.send('Error 404 page not found :(');
});
