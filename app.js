const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routers/userRouter');
const authRoutes = require('./routers/authRouter');
const app = express();

app.listen(3001);

app.use(express.json())
app.use('/users', userRoutes);
app.use('/auth', authRoutes)


app.get('/', (req, res)=>{
    res.send('Hello world');
})