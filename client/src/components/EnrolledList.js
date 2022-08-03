import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import { Link } from "react-router-dom";
export const EnrolledList = ({userName,name,section}) => {

    
    const handleClick = async () => {
        try{
            const enroll = {
                name:name,
                userName:userName
            }
            // remove the course from the cart
            await axios.post("/removeEnrolled",enroll)
        }catch(err){
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
            <Link to={`/${userName}`} className="topbar-link">
            <button className="remove-button" onClick={handleClick}>
                <RemoveCircleOutlineIcon className="course-icon"/>
            </button>
            </Link>
        </div>  
    )
}
