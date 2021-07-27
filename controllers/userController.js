const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
        try {
            const {name, email, password} = req.body;

            // Validate email and password
            const user = await Users.findOne({email});
            if(user) {
                return res.status(400).json({msg: 'This email is already in use!'});
            }
            if (password.length < 8) {
                return res.status(400).json({msg: 'Password must be at least 8 characters long!'})
            }

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                name, email, password: passwordHash
            })

            // Save user to MongoDB
            await newUser.save();

            // Create JSON web token
            const accesstoken = createAccessToken({id: newUser._id});
            const refreshtoken = createRefreshToken({id: newUser._id});

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            });

            res.json({accesstoken});
        }catch (error) {
            return res.status(500).json({msg: error.message});
        }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({email});
        // Validate email and password
        if(!user){
            return res.status(400).json({msg: 'User does not exist.'});
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({msg: 'Incorrect password.'});
        }

        // If login success, create access token and refresh token
        const accesstoken = createAccessToken({id: user._id});
        const refreshtoken = createRefreshToken({id: user._id});

        res.cookie('refreshtoken', refreshtoken, {
            httpOnly: true,
            path: '/user/refresh_token'
        });
        
        res.json({accesstoken});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', {path: '/user/refresh_token'});
        return res.json({msg: 'Logged out!'});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const refreshToken = (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken;

        if (!rf_token) {
            return res.status(400).json({msg: 'Please Login or Register'});
        }

        //test

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if(error) {
                return res.status(400).json({msg: 'Please Login or Register'});
            }
            const accesstoken = createAccessToken({id: user.id})

            res.json({user, accesstoken})
        })
    }catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

const getUser = async (req, res) => {
    try{
        const user = await Users.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(400).json({msg: 'User does not exist!'});
        }
        res.json(user);
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

// Create JSON Web Tokens
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = {
    register,
    login,
    logout,
    getUser,
    refreshToken
};