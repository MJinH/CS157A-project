import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { Pagination } from './Pagination';
import { InstructorList } from './InstructorList';


export const Instructor = ({searchText,userName}) => {

    const [currentPage,setCurrentPage] = useState(1)
    const [postsPerPage] = useState(9)
    const [indexOfFirstPost,setIndexOfFirstPost] = useState(0)
    const [indexOfLastPost,setIndexOfLastPost] = useState(currentPage * postsPerPage)
    const [totalPage,setTotalPage] = useState(0)
    const [currentPosts,setCurrentPosts] = useState([])

    useEffect(() => {
        const getCourses = async() => {
            try{
                // fetch instructor lists
                const instructors = await axios.get("/instructor")
                if(!searchText) {
                    setTotalPage(instructors.data.length)
                    setCurrentPosts(instructors.data.slice(indexOfFirstPost,indexOfLastPost))
                } else {
                    const newInstructors = instructors.data.filter((instructor) =>
                    instructor.name.toLowerCase().includes(searchText)
                    )
                    setTotalPage(currentPosts.length)
                    setCurrentPosts(newInstructors.slice(indexOfFirstPost,indexOfLastPost))
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
                {currentPosts?.map((instructor) => (
                        <InstructorList
                            userName={userName} 
                            name={instructor.name}
                            section={instructor.section}
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
