import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.mjs';
import { notFound, errorHandler } from './middleware/errorMiddleware.mjs';

import productRoutes from './routes/productRoutes.mjs'
import userRoutes from './routes/userRoutes.mjs';
import orderRoutes from './routes/orderRoutes.mjs';
import uploadRoutes from './routes/uploadRoutes.mjs'
const port=process.env.PORT || 5000;
connectDB();//connect to MongoDB

const app=express();
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);
app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}));

const __dirname=path.resolve(); //set to __dirname to current directry
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
if(process.env.NODE_ENV==='production')
{
    //set static folder
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    //any route that is not api will be redirected to index.html
    app.get('*',(req,res)=>
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    );
}
else{


    app.get('/',(req,res)=>{
        res.send('API is Runnig..')
    });
    
}


app.use(notFound);
app.use(errorHandler);
app.listen(port,()=>console.log(`Server is running on ${port}`));