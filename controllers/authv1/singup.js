import express from 'express';
import bcrypt from 'bcrypt';
import Admin from '../../models/adminSchema.js';
import Student from '../../models/studentSchema.js';

const signup = async (req, res) => {
    try {
        const { type, user } = req.body;

        if (!type || !user || !user.fullName || !user.email || !user.phone || !user.password) {
            return res.status(400).json({ error: true, message: "All fields are required." });
        }

        // check if user exist with email.
        let checkUser = null;
        type == "Admin" ? checkUser = await Admin.findOne({email: `${user.email}`}, {email: 1}) : checkUser = await Student.findOne({email: `${user.email}`}, {email: 1})

        if(checkUser != null) return res.status(301).json({error: true, message: `User with email ${checkUser.email} already exist.`});

        if (type === 'Admin') {
            try {
                const lastAdmin = await Admin.findOne().sort({ adminId: -1 }).exec();
                let nextId = 'ADM001';
                if (lastAdmin && lastAdmin.adminId) {
                    const lastNum = parseInt(lastAdmin.adminId.slice(3)) + 1;
                    nextId = 'ADM' + String(lastNum).padStart(3, '0');
                }

                const hashedPassword = await bcrypt.hash(user.password, 13);

                const newAdmin = new Admin({
                    adminId: nextId,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    password: hashedPassword,
                });


                await newAdmin.save();

                console.log('Admin saved:', newAdmin);

                return res.status(201).json({ error: false, message: "Admin user created successfully." });
            } catch (err) {
                console.log("Error creating Admin: ", err);
                return res.status(201).json({ error: true, message: "Error creating Admin user.", errorMessage: err.error });
            }

        } else if (type === 'Student') {

            if(!user.departmentId || !user.level) return res.status(400).json({ error: true, message: "All fields are required." });

           try {
                const lastStudent = await Student.findOne().sort({ studentId: -1 }).exec();
                let nextId = 'STD001';
                if (lastStudent && lastStudent.studentId) {
                    const lastNum = parseInt(lastStudent.studentId.slice(3)) + 1;
                    nextId = 'STD' + String(lastNum).padStart(3, '0');
                }

                const hashedPassword = await bcrypt.hash(user.password, 13);

                const newStudent = new Student({
                    studentId: nextId,
                    fullName: user.fullName,
                    email: user.email,
                    departmentId: user.departmentId,
                    level: user.level,
                    phone: user.phone,
                    password: hashedPassword,
                });


                await newStudent.save();

                console.log('Student saved:', newStudent);

                return res.status(201).json({ error: false, message: "Student user created successfully." });
            } catch (err) {
                console.log("Error creating studet: ", err);
                return res.status(301).json({ error: true, message: "Error creating new student.", errorMessage: err.errmsg });
            }
        }

        return res.status(400).json({ error: true, message: "Invalid user type provided." });

    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ error: true, message: "Internal server error.", errorMessage: err.message });
    }
};

export default signup;
