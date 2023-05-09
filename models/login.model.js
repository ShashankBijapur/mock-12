const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
},{
    versionKey:false
})

const UserModel = mongoose.model("User",userSchema)

module.exports={
    UserModel
}