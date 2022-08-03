import React, { useContext, useEffect,useState } from 'react'
import { Dropdown } from './Dropdown'

export const Search = ({setSearchText,currentList,setCurrentList}) => {
    
    const [listOptions] = useState(["Courses","Instructors"])

    return (
        <div className="items-top d-flex align-items-center justify-content-center">
            <div className="items-wrapper d-flex align-items-center">
            <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="dropdwon-list">{currentList}</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {listOptions.map(option => (
                            <Dropdown 
                                option={option} 
                                setCurrentList={setCurrentList} 
                            />
                        ))}
                    </ul>
                </div>
                <div className="search">
                    <input type="text" className="search-item" 
                    placeholder='Search here...'
                    onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())} />
                </div>
            </div>
        </div>
    )
}
