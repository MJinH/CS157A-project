const db = require('../config/db');

const liked = async(req,res) => {
    try{
        const newLiked = {
            name: req.body.name,
            section: req.body.section,
            userName:req.body.userName
        }
        await db.query("INSERT INTO liked (username,course_name,course_section) values(?,?,?)",[newLiked.name,newLiked.section,newLiked.userName])
        res.status(200).json({newLiked})
    }catch(err) {
        res.status(500).json(err)
    }
}


const getLiked = async(req,res) => {
    try{
        const query = `SELECT * FROM liked WHERE username="${req.params["name"]}"`
        await db.query(query,(err,data)=> {
            if(!err) res.status(200).json(data)
            else {
                console.log(err)
            }
        })
    } catch(err) {
    
    }
}


module.exports = {
    liked,
    getLiked
}