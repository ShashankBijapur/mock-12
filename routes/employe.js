const express  = require("express");
const employeeRoute = express.Router();
const {employeModel} = require("../models/employee.model")
const jwt = require("jsonwebtoken")

employeeRoute.get("/",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"mock-12")
    try {
        if(decoded){
            const post = await employeModel.find({"userID":decoded.user._id})
            res.status(200).send(post)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

employeeRoute.post("/", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mock-12");

        if (decoded) {
            const userId = decoded.User._id;
            const bookData = req.body;
            if (bookData.user === userId) {
                const post = new employeModel(bookData);
                await post.save();
                res.status(200).send("New Employee added into your account");
            } else {
                res.status(401).send("Unauthorized user");
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

employeeRoute.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mock-12");
        const userId = decoded.user._id;

        const post = await employeModel.findOne({ _id: id, user: userId });
        if (post) {
            const updatedPost = await employeModel.findByIdAndUpdate(
                { _id: id },
                payload,
                { new: true }
            );
            res.status(200).send(updatedPost);
        } else {
            res.status(401).send("Unauthorized user");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

employeeRoute.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mock-12");
        const userId = decoded.user._id;

        const post = await employeModel.findOne({ _id: id, user: userId });
        if (post) {
            await employeModel.findByIdAndDelete({ _id: id });
            res.status(200).send("Employee deleted Successfully");
        } else {
            res.status(401).send("Unauthorized user");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports={
    employeeRoute
}