const express = require("express")
const router = express.Router()


const {
    register,
    login
} = require("../controller/auth.js")


const {
    getUser
} = require("../controller/user.js")

const {
    department
} = require("../controller/department.js")

const {
    getCourses
} = require("../controller/course.js")

const {
    getInstructors
} = require("../controller/instructor.js")

const {
    enrolled, getEnrolled,removeEnrolled
} = require("../controller/enrolled.js")


const {
    liked,getLiked
} = require("../controller/liked.js")


const {
    getReviews,reviews
} = require("../controller/review.js")

const {
    getComments,comments,removeComments
} = require("../controller/comments.js")


const {
    getPhoto,photo, getAllPhoto
} = require("../controller/photo.js")

const {
    getFriend, friend
} = require("../controller/friends.js")

router.route('/auth/register').post(register)
router.route('/auth/login').post(login)
router.route('/department').post(department)
router.route("/user/:name").get(getUser)
router.route("/course").get(getCourses)
router.route("/instructor").get(getInstructors)
router.route("/enrolled").post(enrolled)
router.route("/getEnrolled/:name").get(getEnrolled)
router.route("/removeEnrolled").post(removeEnrolled)
router.route("/liked").post(liked)
router.route("/getLiked/:name").get(getLiked)
router.route("/getReviews/:name").get(getReviews)
router.route("/reviews").post(reviews)
router.route("/comments").post(comments)
router.route("/getComments").get(getComments)
router.route("/removeComments").post(removeComments)
router.route("/photo").post(photo)
router.route("/getPhoto/:name").get(getPhoto)
router.route("/getFriend/:name").get(getFriend)
router.route("/getAllPhoto/:name").get(getAllPhoto)
router.route("/friend").post(friend)

module.exports = router