import React,{useEffect,useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import {useNavigate } from "react-router-dom"
export const CourseList = ({userName,name,section,prerequisite}) => {

    const navigate = useNavigate()
    const [isEnrolled,setIsEnrolled] = useState()


    useEffect(() => {
        // if a new course is added to cart, navigate to '/:username/cart'
        if(isEnrolled) {
            navigate(`/${userName}/cart`)
        }
    },[isEnrolled])

    const handleEnrollClick = async () => {
        try {
            let isEnrolled = false
            // fetch the courses that are in cart
            const enrolled = await axios.get("/getEnrolled/" + userName)
            enrolled.data.map((e) => {
                if(e.course_name === name || e.course_section === section) {
                    isEnrolled = true;
                }
            })
            // Add the course into enrolled DB if it's not in the enrolled DB.
            if(!isEnrolled) {
                const newEnrolled = {
                    userName:userName,
                    name:name,
                    section:section
                }
                const enroll = await axios.post("/enrolled",newEnrolled)
                setIsEnrolled(enroll.data)
            }
        } catch(err){
                console.log(err)
        }
    }

    const handleLikeClick = async () => {
        try{
            let isLiked = false
            const liked = await axios.get("/getLiked/" + userName)
            liked.data.map((e) => {
                if(e.course_name === name || e.course_section === section) {
                    isLiked = true
                }
            })
            // Add the course into liked DB if it's not in the liked DB
            if(!isLiked) {
                const newLiked = {
                    userName:userName,
                    name:name,
                    section:section
                }
                await axios.post("/liked",newLiked)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="course-list">
            <div className="course-info">
                <span><strong>Course Section</strong></span>
                <span>{section}</span>
            </div>
            <div className="course-info">
                <span><strong>Course Name</strong></span>
                <span>{name}</span>
            </div>
            <div className="course-info">
                <span><strong>Course Prerequisite</strong></span>
                <span>{prerequisite}</span>
            </div>
            <button className="course-button-1" onClick={handleLikeClick}>
                <FavoriteIcon className="course-icon"/>
            </button>
            <button className="course-button-2" onClick={handleEnrollClick}>
                <ShoppingCartIcon className="course-icon"/>
            </button>
        </div>  
    )
}
