import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({
        message: 'User Route',
    })
}

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return res.status(401).json({message: 'You can update only your account'})
    }
    try{
        if (req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,{
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profile_picture: req.body.profile_picture,
                  },
                  
            },
            { new: true }
        )
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json({ ...rest });

    }catch(error){
        return res.status(401).json({message: 'error'})
    }
}


export const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return res.status(401).json({message: 'You can delete only your account'})
    }
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'User Deleted..'})
    }catch(error){
        res.status(400).json({message: 'Someting went wrong!!'})
    }
}