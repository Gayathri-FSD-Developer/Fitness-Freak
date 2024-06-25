import express from 'express'
import { UserLogin, UserRegister, addWorkout, contactUs, getUserDashboard, getWorkoutsByDate } from '../Controller/User.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const Router = express.Router();

// path for api
Router.post("/signup", UserRegister); //http://localhost:4000/api/user/signup
Router.post("/signin", UserLogin );  //http://localhost:4000/api/user/signin

Router.get("/dashboard",verifyToken, getUserDashboard );  //http://localhost:4000/api/user/dashboard  
Router.get("/workout", verifyToken, getWorkoutsByDate);
Router.post("/addworkout", verifyToken, addWorkout);
Router.post("/contactUs",contactUs); //http://localhost:4000/api/user/contactUs


export default Router;