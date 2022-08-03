import React, { useContext, useEffect,useState } from 'react'
import { Topbar } from '../components/Topbar'
import { AuthContext } from '../authContext/AuthContext'
import axios from 'axios'
import { Photo } from '../components/Photo'

export const Profile = () => {

    const value = useContext(AuthContext)
    // fetch the user name
    const [userName,setUserName] = useState(value.state.user.username)
    const [major,setMajor] = useState()
    const [cartNumber,setCartNumber] = useState(0)

    useEffect(()=>{
        const getUser = async () =>{
            try {
                const userInfo = await axios.get("/user/" + value.state.user.username)
                const getEnrolled = await axios.get("/getEnrolled/" + value.state.user.username)
                // setUserName(value.state.user.username)
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
                name={userName}
                major={major}
                cartNumber={cartNumber}
            />
            <Photo
                name={userName}
            />
        </>
    )
}
