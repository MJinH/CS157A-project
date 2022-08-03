import React from 'react'
import axios from "axios"
// import uuid from "react-uuid"
import {useRef} from "react"
import {useNavigate } from "react-router-dom"


export const Register = () => {

    const userName = useRef()
    const major = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const navigate = useNavigate()


    const handleClick = async(e) => {
        e.preventDefault()
        if(password.current.value !== confirmPassword.current.value) {
            confirmPassword.current.setCustomValidity("Password doest not match")
        } else {
            const newUser = {
                userName: userName.current.value,
                password: password.current.value,
                major: major.current.value
            }
            try{
                await axios.post("/auth/register",newUser)
                navigate("/")
            } catch(err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="register-container">
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
                        placeholder='Major'
                        className="login-input" 
                        required
                        maxLength="30"
                        ref={major}    
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
                    <input 
                        placeholder='Confirm Password'
                        type="password" 
                        className="login-input" 
                        required
                        minLength="6"
                        maxLength="20"
                        ref={confirmPassword}
                    />
                    <button className="register-button" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}
