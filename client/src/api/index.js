import axios from 'axios';

// created Axios instance with default settings such as the base URL. to avoid repeaded code
const API = axios.create({ baseURL: "http://localhost:4000/api", });  //local server
// const API = axios.create({ baseURL: "https://fitness-freak-wj6v.onrender.com/api", });

export const UserSignUp = async (data) => API.post("/user/signup", data)
export const UserSignIn = async (data) => API.post("/user/signin", data);

// Authorization Header: Include the Authorization header with the Bearer token in the request headers.
// that we have received upon user authentication (e.g., after login).
export const getDashboardDetails = async (token) =>
    await API.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
    });
// sending date params dynamically
export const getWorkouts = async (token, date) =>
    await API.get(`/user/workout${date}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const addWorkout = async (token, data) =>
    await API.post(`/user/addworkout`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const ContactUs =async (data)=> API.post('/user/contactUs',data);



