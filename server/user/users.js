import { compare, hash } from "bcrypt"
import mongoose, { Schema } from "mongoose"

await mongoose.connect('mongodb://localhost:27017/c12Authentication')

const UserSchema = new Schema({
    userName: String,
    passwordHash: { type: String, select: false},
})

const User = mongoose.model("user", UserSchema)

export async function getAllUsers(){
    return await User.find()
}

export async function getUserById(id){
    return await User.findById(id) 
}

export async function deleteUser(id){
    await User.findByIdAndDelete(id)     
}

export async function createUser(newUserData) {
    return await User.create(newUserData)
}

export async function setPassword(userId, password) {
    let user = await User.findById(userId).select('+passwordHash') 
    user.passwordHash = await hash(password, 3)
    await user.save()
    return await User.findById(user._id)
}

export async function checkPasswordAndReturnUserOrDie(userName, password){
    let user = await User.findOne({userName}).select('+passwordHash')
    if (!user) throw new Error('User not found "' + userName +'"') 
    const match = await compare(password, user.passwordHash)
    if (!match) throw new Error('Password match failed')
    return await User.findById(user._id)
}   


export async function disconnectDatabase() {
    await mongoose.disconnect()
}
