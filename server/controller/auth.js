const db = require('../config/db');

const register = async(req,res) => {
    try{
        const newUser = {
            userName: req.body.userName,
            password: req.body.password,
            major: req.body.major
        }
        await db.query("INSERT INTO user (username,password,major) values(?,?,?)",[newUser.userName,newUser.password,newUser.major])
        res.status(200).json({newUser})
    }catch(err) {
        res.status(500).json(err)
    }
}



const login = async(req,res) => {
    
    const query = `SELECT * FROM user WHERE username="${req.body.userName}" AND password="${req.body.password}"`
    await db.query(query,(err,data) => {
        if(!err) res.status(200).json(data)
        else {
            console.log(data)
            res.status(500).json(err)
        }
    })
}


module.exports = {
    register,
    login
}