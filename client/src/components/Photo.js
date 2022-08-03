import React,{useState,useEffect} from 'react'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import axios from "axios"
import {useNavigate } from "react-router-dom"

export const Photo = ({name}) => {


    const [file, setFile] = useState()
    const [images,setImages] = useState()
    const [isChanged,setIsChanged] = useState()
    const [friends,setFriends] = useState()
    const [allPhotos,setAllPhotos] = useState()
    const navigate = useNavigate()

    const PF = process.env.REACT_APP_ASSETS_FOLDER
    // default img for every users
    const defaultImg = "default.png"

    useEffect(() => {
        const getImges = async () => {
            try{
                const img = await axios.get("/getPhoto/" + name)
                const friend = await axios.get("/getFriend/" + name)
                const allPhoto = await axios.get("/getAllPhoto/" + name)
                setImages(img.data)
                setFriends(friend.data)
                setAllPhotos(allPhoto.data)
            } catch(err) {
                console.log(err)
            }
        }
        getImges()
    },[])

    useEffect(() => {
        // is a user's photo is updated, navigate to '/:username'
        if(isChanged) {
            navigate(`/${name}`)
            window.location.reload()
        }
    },[isChanged])


    const handleSubmit = async (e) => {
        if(file) {
            // photo uploaded by a user
            const imgData = {
                username:name,
                postImg:file.name
            }
            const fileData = new FormData()
            const fileName = file.name
            fileData.append("name", fileName)
            fileData.append("file", file)
            try {
                // store the photo into /public/images folder
                await axios.post("/upload", fileData)
                // add the photo information into photo DB
                const photo = await axios.post("/photo",imgData)
                setIsChanged(photo.data)
            } catch (err) {
                console.log(err)
            }
            setFile(null)
        }
    }

    const handleClick = async (friendName) => {
        try{
            // friend object
            const newFriend = {
                username:name,
                friendName:friendName
            }
            // add the friend information into friend DB
            await axios.post("/friend",newFriend)
            document.getElementById(`/friend-${friendName}`).style.visibility = 'hidden'
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="photo-container">
                <div className="photo-wrapper">
                    <>
                        <div className="image">
                            {
                                images && images.length >= 1 ? images.map(image => (
                                <div className="post">
                                    <div className="postCenter">
                                        <img className="postImg" src={PF + image.postImg} alt="" crossOrigin='anonymous'/>
                                    </div>
                                </div>
                                )) :
                                <>
                                    <div className="post">
                                        <div className="postCenter">
                                            <img className="postImg" src={PF + defaultImg} alt="" crossOrigin='anonymous'/>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="photo">
                            <form action="" className="sharePhoto" onSubmit={handleSubmit}>
                                <label htmlFor="file" className="shareOption">
                                <PhotoLibraryIcon className="mediaIcon"/>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                </label>
                                <button className="share-button">Upload</button>
                            </form>
                        </div>
                        <p className="bar"></p>
                        <div className="friendList">
                            <span>People You May Know</span>
                                {
                                    friends?.map((f) => (
                                        <>
                                        <div className="friend">
                                            <p className="friend-name">{f.username}</p>
                                            <img className="freindImg" src={PF + defaultImg} alt="" crossOrigin='anonymous'/>
                                            <button className="friend-add" id={`friend-${f.username}`} onClick={()=>handleClick(f.username)}>Add</button>
                                        </div>
                                        </>
                                    ))

                                }
                                {
                                    allPhotos?.map((a) => (
                                        <>
                                        <div className="friend">
                                            <p className="friend-name">{a.name}</p>
                                            <img className="freindImg" src={PF + a.postImg} alt="" crossOrigin='anonymous'/>
                                            <button className="friend-add" id={`friend-${a.name}`} onClick={()=>handleClick(a.name)}>Add</button>
                                        </div>
                                        </>
                                    ))

                                }
                        </div>
                    </>
                </div>
            </div>
        </>
    )
}
