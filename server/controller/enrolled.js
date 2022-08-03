const db = require('../config/db');

const enrolled = async(req,res) => {
    try{
        const newEnrolled = {
            name: req.body.name,
            section: req.body.section,
            userName:req.body.userName
        }
        await db.query("INSERT INTO enrolled (course_name,course_section,username) values(?,?,?)",[newEnrolled.name,newEnrolled.section,newEnrolled.userName])
        res.status(200).json({newEnrolled})
    }catch(err) {
        res.status(500).json(err)
    }
}


const getEnrolled = async(req,res) => {
    try{
        const query = `SELECT * FROM enrolled WHERE username="${req.params["name"]}"`
        await db.query(query,(err,data)=> {
            if(!err) res.status(200).json(data)
            else {
                console.log(err)
            }
        })
    } catch(err) {
    
    }
}

const removeEnrolled = async(req,res) => {
    try {
        await db.query("DELETE FROM enrolled WHERE enrolled.course_name=? and enrolled.username=?",[req.body.name,req.body.userName])
    } catch(err) {
        console.log(err)
    }
}




module.exports = {
    enrolled,
    getEnrolled,
    removeEnrolled
}