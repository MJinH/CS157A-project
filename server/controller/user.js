const db = require('../config/db');



const getUser = async(req,res) => {
    const query = `SELECT username,major FROM user WHERE username="${req.params["name"]}"`
    await db.query(query,(err,data) => {
        if(!err) res.status(200).json(data)
        else {
            res.status(500).json(err)
        }
    })
}


module.exports = {
    getUser
}