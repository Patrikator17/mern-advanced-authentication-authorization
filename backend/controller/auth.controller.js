import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = 'qwerty';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body; //get from user
    const hashedPassword = bcryptjs.hashSync(password, 10);

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // If email already exists, return an error
            return res.status(400).json({ error: 'Email already registered' });
        }

        // If email doesn't exist, create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User added successfully' });

    } catch (error) {
        // Check for specific errors and send appropriate messages
        if (error.name === 'ValidationError') {
            // Handle validation errors (e.g., required fields missing)
            return res.status(400).json({ error: 'Validation failed', details: error.errors });
        } else {
            // For other errors, return internal server error
            next(error);
        }
    }
};


export const login = async(req, res, next) => {
    const {email, password} = req.body;
    try{
        const validUser = await User.findOne({email : email})
        if(!validUser){
            return res.status(401).json({message : 'User not found'})
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword){
            return res.status(401).json({message : 'Invalid credentials'})
        }
        const token = jwt.sign({id : validUser._id}, JWT_SECRET_KEY)
        const {password : hashedPassword, ...rest} = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        res.cookie('access_token', token, {
            httpOnly : true, 
            expires : expiryDate})
        .status(200).json(rest)

    }catch(error){
        next(error)
    }
}


export const google = async (req, res, next) => {
    try {
        const { name, email, photo } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });

        if (user) {
            // If user exists, generate token and send user data
            const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY);
            const { password, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);

            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json(rest);
        } else {
            // If user doesn't exist, create a new user
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = new User({
                username: name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email,
                password: hashedPassword,
                profile_picture: photo
            });

            user = await newUser.save();

            const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY);
            const { password: hashedPassword2, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);

            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};


export const signOut = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout Successful')
}

