import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if(!accessToken) return res.status(400).json({success: false, message: "Access denied. Try login in."});

    try{
        const verify = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
        req.user = verify;
    }catch(error){
        console.log("Invalid token. Try login in.", error);
        res.status(400).json({success: false, message: 'Invalid Token'});
        return
    }

    next();
}

export default authenticate