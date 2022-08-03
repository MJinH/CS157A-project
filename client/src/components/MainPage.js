import React, { useContext, useEffect,useState } from 'react'
import { Topbar } from './Topbar'
import { AuthContext } from '../authContext/AuthContext'
import axios from 'axios'
import { Search } from './Search'
import { Course } from './Course'
import { Instructor } from './Instructor'

export const MainPage = () => {
    const [searchText,setSearchText] = useState('')
    const value = useContext(AuthContext)
    const [userName,setUserName] = useState()
    const [major,setMajor] = useState()
    // set the default list to display to courses
    const [currentList,setCurrentList] = useState("Courses")
    // default cart number is 0 because no course is added by default
    const [cartNumber,setCartNumber] = useState(0)


    useEffect(()=>{
        const getUser = async () =>{
            try {
                // fetch the user information from the user DB
                const userInfo = await axios.get("/user/" + value.state.user.username)
                // fetch the courses information that are in the cart from the enrolled DB
                const getEnrolled = await axios.get("/getEnrolled/" + value.state.user.username)
                setUserName(userInfo.data[0].username)
                setMajor(userInfo.data[0].major)
                setCartNumber(getEnrolled.data.length)
            } catch(err) {
                console.log(err)
            }
        }
        getUser()
    },[])

    return (
        <>
            <Topbar
                cartNumber={cartNumber}
                name={userName}
                major={major}
            />
            <Search
                setSearchText={setSearchText}
                currentList={currentList}
                setCurrentList={setCurrentList}
            />
           {
            currentList === 'Courses' ?  
                <Course
                searchText={searchText}
                userName={userName}
                />
                :
                <Instructor
                searchText={searchText}
                userName={userName}
                />
           } 
        </>
    )
}
