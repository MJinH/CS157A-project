const db = require('../config/db');

const getComments = async(req,res) => {
    try{
        const query = `SELECT * FROM comments`
        await db.query(query,(err,data)=> {
            if(!err) res.status(200).json(data)
            else {
                console.log(err)
            }
        })
    } catch(err) {
    
    }
}

const comments = async(req,res) => {
    try {
        const newComments = {
            instructor_name:req.body.instructor_name,
            comment:req.body.comment,
            username:req.body.userName
        }
        await db.query("INSERT INTO comments (comment,instructor_name,username) values (?,?,?)",[newComments.comment,newComments.instructor_name,newComments.username])
        res.status(200).json(newComments)
    } catch(err) {
        console.log(err)
    }
}


const removeComments = async(req,res) => {
    try {
        const newComments = {
            instructor_name:req.body.instructor_name,
            comment:req.body.comment,
            username:req.body.userName
        }
        await db.query("DELETE FROM comments WHERE comment=? and instructor_name=? and username=?",[newComments.comment,newComments.instructor_name,newComments.username])
        res.status(200).json(newComments)
    } catch(err) {
        console.log(Err)
    }
}

module.exports = {
    getComments,
    comments,
    removeComments
}