const db = require('../config/db');

const getReviews = async(req,res) => {
    try{
        const query = `SELECT review,instructor_name FROM reviews WHERE instructor_name="${req.params["name"]}"`
        await db.query(query,(err,data)=> {
            if(!err) res.status(200).json(data)
            else {
                console.log(err)
            }
        })
    } catch(err) {
    
    }
}

const reviews = async(req,res) => {
    try {
        const newReview = {
            instructor_name:req.body.instructor_name,
            review:req.body.review
        }
        await db.query("INSERT INTO reviews (instructor_name,review) values (?,?)",[newReview.instructor_name,newReview.review])
        res.status(200).json(newReview)
    } catch(err) {
        console.log(err)
    }
}


module.exports = {
    getReviews,
    reviews
}