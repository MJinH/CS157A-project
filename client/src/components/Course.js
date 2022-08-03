import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { Pagination } from './Pagination';
import { CourseList } from './CourseList';
export const Course = ({searchText,userName}) => {


    const [currentPage,setCurrentPage] = useState(1)
    // set the default data number for per page to 9
    const [postsPerPage] = useState(9)
    const [indexOfFirstPost,setIndexOfFirstPost] = useState(0)
    const [indexOfLastPost,setIndexOfLastPost] = useState(currentPage * postsPerPage)
    const [totalPage,setTotalPage] = useState(0)
    const [currentPosts,setCurrentPosts] = useState([])



    useEffect(() => {
        const getCourses = async() => {
            try{
                // fetch the course lists from the course database
                const courses = await axios.get("/course")
                if(!searchText) {
                    setTotalPage(courses.data.length)
                    setCurrentPosts(courses.data.slice(indexOfFirstPost,indexOfLastPost))
                } else {
                    // if searched by a user, display data that only includes the text in the input bar using filter funciton
                    const newCourses = courses.data.filter((course) =>
                    course.course_name.toLowerCase().includes(searchText)
                    )
                    setTotalPage(currentPosts.length)
                    setCurrentPosts(newCourses.slice(indexOfFirstPost,indexOfLastPost))
                }
            } catch(err) {
                console.log(err)
            }

        }
        getCourses()
    },[indexOfFirstPost,searchText])

    useEffect(() => {
        setIndexOfFirstPost(indexOfLastPost - postsPerPage)
    },[indexOfLastPost])

    useEffect(() => {
        setIndexOfLastPost(currentPage * postsPerPage)
    },[currentPage])



    return (
        <>
            <div className="items-center">
                {currentPosts?.map((course) => (
                        <CourseList 
                            userName={userName}
                            name={course.course_name}
                            section={course.course_section}
                            prerequisite={course.prerequisite}
                        /> 
                    ))}
            </div>
            <div className="items-bottom d-flex align-items-center justify-content-center">
                <Pagination
                    postPerPage={postsPerPage}
                    totalPage={totalPage}
                    setCurrentPage={setCurrentPage}
                    userName={userName}
                />
            </div>
        </>
    )
}
