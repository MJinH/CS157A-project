import React from 'react'

export const Dropdown = ({option,setCurrentList}) => {
  return (
    <li><a className="dropdown-item" onClick={() => setCurrentList(option)}>{option}</a></li>
  )
}
