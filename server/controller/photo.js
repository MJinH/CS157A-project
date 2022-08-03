const db = require('../config/db');


const getAllPhoto = async (req,res) => {
    try{
        const query = `SELECT name,postImg FROM photo WHERE name!="${req.params["name"]}" and name not in (select friendName from friend)`
        await db.query(query,(err,data)=> {
            if(!err) res.status(200).json(data)
            else {
                console.log(err)
            }
        })
    } catch(err) {
        console.log(Err)
    }
}


const getPhoto = async(req,res) => {
    try{
        const query = `SELECT name,postImg FROM photo WHERE name="${req.params["name"]}"`
        await db.query(query,(err,data)=> {
            if(!err) res.status(200).json(data)
            else {
                console.log(err)
            }
        })
    } catch(err) {
        console.log(err)
    }
}

const photo = async(req,res) => {
    try {
        const newPhoto = {
            name:req.body.username,
            postImg:req.body.postImg
        }
        console.log(newPhoto)
        await db.query(`DELETE FROM photo WHERE name="${newPhoto.name}"`)
        await db.query("INSERT INTO photo (name,postImg) values (?,?)",[newPhoto.name,newPhoto.postImg])
        res.status(200).json(newPhoto)
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    photo,
    getPhoto,
    getAllPhoto
}