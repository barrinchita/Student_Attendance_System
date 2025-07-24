import express from 'express'

const authv1Routes = express.Router();

import singup from "../controllers/authv1/singup.js";
import login from '../controllers/authv1/login.js';

authv1Routes.post("/singup", singup);
authv1Routes.post("/login", login);

export default authv1Routes;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJYYXZlckBnbWFpbC5jb20iLCJpYXQiOjE3NTMzMjI3ODYsImV4cCI6MTc1MzMyMzA4Nn0.UFcAbfD_1GvW8xnxE6ewduqednciLQwusLkNMvQevqk