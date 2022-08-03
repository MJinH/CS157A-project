const db = require('../config/db');



const getCourses = async(req,res) => {
    const query = `SELECT * FROM course`

    await db.query(query,(err,data) => {
        if(!err) res.status(200).json(data)
        else {
            res.status(500).json(err)
        }
    })
}


module.exports = {
    getCourses
}