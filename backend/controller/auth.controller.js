import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

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
