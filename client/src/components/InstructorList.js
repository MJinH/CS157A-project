import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios';
import { Reviews } from './Reviews';
import {useNavigate } from "react-router-dom"
import { Comment } from './Comment';

export const InstructorList = ({userName,name,section}) => {

    const [clicked,isClicked] = useState(false)
    const [reviews,setReviews] = useState()
    const [addComment,setaddComment] = useState()
    const [comment,setComment] = useState()
    const [removeComment,setremoveComment] = useState()
    const newComment = useRef()
    const navigate = useNavigate()
    
    
    useEffect(() => {
        const getReviews = async () => {
            try{
                const review = await axios("/getReviews/" + name)
                setReviews(review.data)
                const comment = await axios("/getComments")
                setComment(comment.data)
            } catch(err) {
                console.log(err)
            }
        }
        getReviews()
    },[])

    useEffect(() => {
        if(clicked) {
            document.getElementById(`reviews-${name}`).style.display = "inline"
        } else {
            document.getElementById(`reviews-${name}`).style.display = "none"
        }
    },[clicked])

    useEffect(() => {
        // navigate to '/:username' if a new comment is added
        if(addComment) {
            navigate(`/${userName}`)
            window.location.reload()
        }
    },[addComment])

    useEffect(() => {
        // naviage to '/:username' if a comment is removed
        if(removeComment) {
            navigate(`/${userName}`)
            window.location.reload()
        }
    },[removeComment])
    
    const handleClick = () => {
        isClicked(!clicked)
    }

    const handleAddClick = async () => {
        try {
            if(newComment.current.value){
                // add a new comment into comment DB
                const addComment = await axios.post("/comments",{instructor_name:name,comment:newComment.current.value,userName:userName})
                setaddComment(addComment.data)
            }
        } catch(err) {
            console.log(err) 
        }
    }


    const handleRemoveClick = async (comment) => {
        try {
            const removedComment = await axios.post("/removeComments",{instructor_name:name,comment:comment,userName:userName})
            setremoveComment(removedComment.data)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="instructor-list" onClick={handleClick}>
                <div className="course-info">
                    <span><strong>Instructor Name</strong></span>
                    <span>{name}</span>
                </div>
                <div className="instructor-info">
                    <span><strong>Course Section</strong></span>
                    <span>{section}</span>
                </div>
            </div> 
            <div id={`reviews-${name}`} className="reviews">
                <span className="review-title">Reviews</span>
                {
                    reviews?.map((r) => (
                        r.instructor_name === name ?
                        <>
                            <div className="review">
                                <Reviews
                                    review={r.review}
                                />
                            </div>
                        </> :
                        <></>
                    ))
                }
                {
                    comment?.map((c) => (
                        c.instructor_name === name 
                        ? c.username === userName ?
                        <>
                            <div className="comment">
                                <Comment
                                    comment={c.comment}
                                />
                                <button onClick={() => handleRemoveClick(c.comment)}>Remove</button>
                            </div>
                        </>
                        :
                        <div className="comment">
                                <Comment
                                    comment={c.comment}
                                />
                        </div>
                        :<></>
                    ))
                }
                <div className="add-review" onClick={handleAddClick}>
                    <input min='1' max='500' placeholder='Add your comment...' ref={newComment}></input>
                    <button>Add</button>
                </div>
            </div> 
        </>
    )
}
