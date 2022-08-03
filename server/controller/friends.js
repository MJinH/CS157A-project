const db = require('../config/db');

const getFriend = async(req,res) => {
    try{
        const query = `SELECT username FROM user WHERE username!="${req.params["name"]}" and username not in (select name from photo) and username not in (select friendName from friend WHERE username="${req.params["name"]}")`
        await db.query(query,(err,data)=> {
            if(!err) res.status(200).json(data)
            else {
                console.log(err)
            }
        })
    } catch(err) {
    
    }
}

const friend = async(req,res) => {
    try {
        const newFriend = {
            username:req.body.username,
            friendName:req.body.friendName
        }
        await db.query("INSERT INTO friend (username,friendName) values (?,?)",[newFriend.username,newFriend.friendName])
        res.status(200).json(newFriend)
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    getFriend,
    friend
}