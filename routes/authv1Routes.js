import express from 'express'

const authv1Routes = express.Router();

import singup from "../controllers/authv1/singup.js";
import login from '../controllers/authv1/login.js';

authv1Routes.post("/singup", singup);
authv1Routes.post("/login", login);

export default authv1Routes;