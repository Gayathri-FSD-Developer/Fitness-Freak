import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DbConnection from './Database/config.js';
import UserRoutes from './Router/User.js'

dotenv.config();
const app =express()

app.use(express.json())
app.use(cors())

// Routes for router call
app.use("/api/user/", UserRoutes);

// error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

// function call for db connection
DbConnection()

app.get('/',(req,res)=>{
   res.status(200).json({message:"API connection done"})
})

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server running successfully in this port", port);
})