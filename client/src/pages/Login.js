import axios from 'axios';
import { useContext,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../authContext/AuthContext';
import React from 'react'

export const Login = () => {
    const userName = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)
    
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // add a new user into user DB
            const user = await axios.post("/auth/login",
            {userName:userName.current.value,password:password.current.value})
            const newUser = {
                department:user.data[0].major,
                userId:user.data[0].userId,
                uesrName:user.data[0].username,

            }
            // add a new user information into department DB
            await axios.post("/department",newUser)
            dispatch({type:"LOGIN",userInfo:user.data[0]})
            navigate(`/${user.data[0].username}`)
        } catch(err){
            dispatch({type:"ERROR",error:err})
        }
    }


    const handleRegisterClick = () => {
        navigate("/register")
    }

    return (
        <div className='login-container'>
            <div className="login-wrapper">
                <form className="login-form" onSubmit={handleClick}>
                    <input 
                        placeholder='User Name'
                        type="text" 
                        className="login-input"
                        required
                        minLength="5"
                        maxLength="20"
                        ref={userName}
                    />
                    <input 
                        placeholder='Password'
                        type="password" 
                        className="login-input" 
                        required
                        minLength="6"
                        maxLength="20"
                        ref={password}
                    />
                    <button className="login-button" type="submit">Log In</button>
                </form>
                <button className="register-button" onClick={handleRegisterClick}>Register</button>
            </div>
        </div>
    )
}
