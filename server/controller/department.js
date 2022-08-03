const db = require('../config/db');

const department = async(req,res) => {
    try{
        const newUser = {
            department: req.body.department,
            userId: req.body.userId,
        }
        await db.query("INSERT INTO department (department,userId) values(?,?)",[newUser.department,newUser.userId])
        res.status(200).json({newUser})
    }catch(err) {
        res.status(500).json(err)
    }
}



module.exports = {
    department
}