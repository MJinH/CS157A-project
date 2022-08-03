import React, { useContext, useEffect,useState } from 'react'
import { Topbar } from '../components/Topbar'
import { AuthContext } from '../authContext/AuthContext'
import axios from 'axios'
import { EnrolledList } from '../components/EnrolledList'

export const Cart = () => {
    const value = useContext(AuthContext)
    const [userName,setUserName] = useState()
    const [major,setMajor] = useState()
    const [currentPosts,setCurrentPosts] = useState([])
    const [cartNumber,setCartNumber] = useState(0)


    useEffect(()=>{
        const getUser = async () =>{
            try {
                const userInfo = await axios.get("/user/" + value.state.user.username)
                const getEnrolled = await axios.get("/getEnrolled/" + value.state.user.username)
                setUserName(userInfo.data[0].username)
                setMajor(userInfo.data[0].major)
                setCurrentPosts(getEnrolled.data)
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
                name={userName}
                major={major}
                cartNumber={cartNumber}
            />
            <div className="enrolled-center">
                {currentPosts?.map((course) => (
                        <EnrolledList
                            userName={userName} 
                            name={course.course_name}
                            section={course.course_section}
                        /> 
                    ))}
            </div>
        </>
    )
}
