const db = require('../config/db');



const getInstructors = async(req,res) => {
    const query = `SELECT instructor.name as name, course.course_section as section FROM course,instructor WHERE course.course_id=instructor.course_id GROUP BY instructor.name`

    await db.query(query,(err,data) => {
        if(!err) res.status(200).json(data)
        else {
            res.status(500).json(err)
        }
    })
}


module.exports = {
    getInstructors
}