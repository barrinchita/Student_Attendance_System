import bcrypt from 'bcrypt';
import Admin from '../../models/adminSchema.js';
import Student from '../../models/studentSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

const login = async (req, res) => {
    try {
        const { type, user } = req.body;

        if (!type || !user || !user.email) {
            return res.status(400).json({ error: true, message: "An email is required please." });
        }

        // check if user exist with email.
        let checkUser = null;
        type == "Admin" ? checkUser = await Admin.findOne({ email: `${user.email}` }, { email: 1, password: 1, adminId: 1 }) : checkUser = await Student.findOne({ email: `${user.email}` }, { email: 1, password: 1, studentId: 1 });

        if (checkUser == null) return res.status(301).json({ error: true, message: `User with email ${user.email} doesn't exist.` });

        if (type == "Admin") {
            let { password } = user;

            const isValid = await bcrypt.compare(password, checkUser.password);
            if (isValid) {
                const accessToken = jwt.sign({ userEmail: checkUser.email, userId: checkUser.studentId }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '5m' });

                return res.status(201).json({ success: true, message: 'User verified', accessToken: accessToken });
            } else {
                return res.status(400).json({ error: true, message: "Can't find user with corresponding password" });
            }
        } else if (type == "Student") {
            let {password} = user
            const isValid = await bcrypt.compare(password, checkUser.password);
            if (isValid) {
                const accessToken = jwt.sign({ userEmail: checkUser.email, userId: checkUser.adminId }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '5m' });

                return res.status(201).json({ success: true, message: 'User verified', accessToken: accessToken });
            } else {
                return res.status(400).json({ error: true, message: "Can't find user with corresponding password" });
            }
        }

        return res.status(400).json({ error: true, message: "User type not found." });

    } catch (err) {
        console.log("An error occured: ", err);
        res.status(500).json({ success: false, message: "Internal error." });
    }
}

export default login;