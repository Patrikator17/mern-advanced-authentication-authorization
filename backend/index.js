import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js'

const app = express()

mongoose.connect("mongodb+srv://pratikgauth:pratikgauth@mern.dofdkic.mongodb.net/?retryWrites=true&w=majority")
.then(() =>{
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('Server running on port 3000');
})

app.use('/user', userRouter)
// pratikgauth