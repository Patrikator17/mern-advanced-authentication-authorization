    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema({
        username:{
            type : String,
            required: true,
            unique: true
        },
        email:{
            type : String,
            required: true,
            unique: true
        },
        password:{
            type : String,
            required: true,
        },
        profile_picture:{
            type : String,
            default : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9bzWbObcb7ZJbbLu63Q5dhSFa36iz1n1YjosbIhkJIg&s'
        },
    }, {timestamps: true})

    const User = mongoose.model('User', userSchema)

    export default User