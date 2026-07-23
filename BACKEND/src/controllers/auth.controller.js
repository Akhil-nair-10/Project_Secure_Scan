const userModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

//for creating a new user
async function registerUser(req,res) {
    
    const { username, email, password } = req.body;

    const userAlreadyExists = await userModel.findOne({email});

    if(userAlreadyExists){
        return res.status(409).json({
            message: 'User Already Exists'
        });
    }

    const hashedPwd = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username, 
        email, 
        password:hashedPwd
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie('Token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    res.status(201).json({
        message: 'New User Created Successfully!'
    })
}

//for login the existing user
async function loginUser(req, res) {

    const {email, password} = req.body;

    const existingUser = await userModel.findOne({email});

    if(!existingUser){
        return res.status(409).json({
            message: 'No Such User Exists, Please register'
        });
    }

    const pwdValid = await bcrypt.compare(password, existingUser.password);

    if(!pwdValid){
        return res.status(401).json({
            message: 'Invalid Password'
        })
    }

    const token = jwt.sign({
        id: existingUser._id
    }, process.env.JWT_SECRET);

    res.cookie("Token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    res.status(200).json({
        message: 'Welcome back logged-in User'
    });

}

//for logout the existing user
async function logoutUser(req, res){
    res.clearCookie("Token",{
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};