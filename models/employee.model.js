const mongoose = require("mongoose")


const employeSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        department: String,
        salary: Number
},{
    versionKey:false
})

const employeModel = mongoose.model("Employee",employeSchema)

module.exports={
   employeModel
}