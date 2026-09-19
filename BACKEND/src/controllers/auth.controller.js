const userModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');

//for creating a new user
async function registerUser(req,res) {
    
    const { username, email, password } = req.body;

    const cleanUsername = req.body.username?.trim(); //will only check if value exists if yes then trim if no then undefined and wont call trim 
    const cleanEmail = req.body.email?.trim(); //same for them 
    const cleanPwd = req.body.password?.trim(); //same for them 

    if(!cleanUsername){
        return res.status(400).json({message:"Username is Empty"});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail) || !cleanEmail) {
            return res.status(400).json({
            message: "Invalid email format."
        });
    }

    if(!cleanPwd){
        return res.status(400).json({message:"Password is Empty"});
    }

    const userAlreadyExists = await userModel.findOne({email:cleanEmail});

    if(userAlreadyExists){
        return res.status(409).json({
            message: 'User Already Exists'
        });
    }

    const hashedPwd = await bcrypt.hash(cleanPwd,10);

    const user = await userModel.create({
        username:cleanUsername, 
        email:cleanEmail, 
        password:hashedPwd
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie('Token', token, {
        httpOnly: true, //means dont let javascript read the cookie
        secure: true, //send this cookie over HTTPS
        sameSite: "None" //allows cross origin cookie exchange frontend-backend
    });

    res.status(201).json({
        message: 'New User Created Successfully!'
    })
}

//for login the existing user
async function loginUser(req, res) {

    const cleanEmail = req.body.email?.trim();
    const cleanPwd = req.body.password?.trim();


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail) || !cleanEmail) {
            return res.status(400).json({
            message: "Invalid email format."
        });
    }
    
    if(!cleanPwd){
        return res.status(400).json({message:"Password is Empty"});
    }

    const existingUser = await userModel.findOne({email:cleanEmail});

    if(!existingUser){
        return res.status(409).json({
            message: 'No Such User Exists, Please register'
        });
    }

    const pwdValid = await bcrypt.compare(cleanPwd, existingUser.password);

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
        httpOnly: true, //means dont let javascript read the cookie
        secure: true, //send cookie over HTTPS only
        sameSite: "None" //allows cross origin as the frontend and backend urls are on different links on render
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });

}

//to FETCH user data
async function getUser(req, res){
    try {

        const user = await userModel
            .findById(req.user.id)
            .select("username email");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        return res.status(200).json({
            username: user.username,
            email: user.email
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

//to DELETE user 
async function deleteUser(req, res){
    
    await userModel.findByIdAndDelete(req.user.id);

    res.clearCookie("Token",{
        httpOnly: true, //means dont let javascript read the cookie
        secure: true, //send cookie over HTTPS only
        sameSite: "None" //allows cross origin as the frontend and backend urls are on different links on render
    });

    return res.status(200).json({
        message: "User deleted successfully"
    });
 
}

//for changing the password of an existing user
async function changePassword(req, res) {

    const { currentPassword, newPassword } = req.body;

    const cleanCurrentPwd = currentPassword?.trim();
    const cleanNewPwd = newPassword?.trim();

    if(!cleanCurrentPwd){
        return res.status(400).json({message:"Current Password is Empty"});
    }

    if(!cleanNewPwd){
        return res.status(400).json({message:"New Password is Empty"});
    }

    const existingUser = await userModel.findById(req.user.id);

    if(!existingUser){
        return res.status(404).json({
            message: 'User not found'
        });
    }

    const pwdValid = await bcrypt.compare(cleanCurrentPwd, existingUser.password);

    if(!pwdValid){
        return res.status(401).json({
            message: 'Current Password is Incorrect'
        });
    }

    const hashedPwd = await bcrypt.hash(cleanNewPwd, 10);

    existingUser.password = hashedPwd;
    await existingUser.save();

    return res.status(200).json({
        message: 'Password changed successfully'
    });

}

//to FETCH scan history of the logged-in user
async function getScanHistory(req, res){
    try {

        const user = await userModel
            .findById(req.user.id)
            .select("scanHistory");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        //reverse so most recent scan shows first
        const history = [...user.scanHistory].reverse();

        return res.status(200).json({
            scanHistory: history
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    deleteUser,
    changePassword,
    getScanHistory
};