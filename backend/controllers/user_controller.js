import User from '../models/user_model.js'
import bcrypt from 'bcryptjs'

export const getAllUser = async (request, response) => {
    let user;
    try {
        user = await User.find({});

    } catch (err) {
        console.log(err);
    }

    if (!user) {
        return response.status(404).json({ message: "No user found" });
    }
    return response.status(202).json({ user });
}

export const registerUser = async (request, response) => {
    const { name, email, password } = request.body;

    try {
        let userExist = await User.findOne({ email: email });

        if (userExist) {
            return response.status(400).json({ message: "User Already Exists! Login Instead" });
        }
        const user = new User({
            name,
            email,
            password,
        })

        await user.save();
        response.status(201).json({ user });
    } catch (err) {
        return console.log(err);
    }
}


export const loginUser = async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.status(400).json({ message: " Please filled the feild properly" })
    }

    try {
        let userExist = await User.findOne({ email: email });

        if (!userExist) {
            return response.status(404).json({ message: "Couldn't find user" });
        }
        const isPasswordCoorect = bcrypt.compare(password, userExist.password);
        if (!isPasswordCoorect) {
            return response.status(400).json({ message: "Incorrect password" })
        }
        return response.status(200).json({ message: "Login Successful", user: userExist })

    } catch (err) {
        console.log(err);
    }
}

export const getUserProfile = async (request, response) => {
    const user = await User.findById(request.params.id);
    if (user) {
        response.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        response.status(404);
        throw new Error("User Not Found");
    }
}

export const updateUserProfile = async (request,response)=>{

    const user = await  User.findById(request.params.id)
    if(user){
        user.name = request.body.name || user.name
        user.email = request.body.email || user.email
        if(request.body.password){
            user.password =request.body.password
        }
        const updateUser = await user.save();
        response.status(200).json({message: "User is updated", user})
    }else{
        response.status(404);
        throw new Error("User Not Found");
    }
}