import React,{useEffect,useState} from 'react'
import { AuthContext } from '../authContext/AuthContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { Link } from "react-router-dom";

export const Topbar = ({cartNumber,name,major}) => {


  return (
    <div className="topbar-container">
        <div className="topbar-left">
            <Link to={`/${name}`} className="topbar-link">
              <span className="memoLogo"><strong>Welcome: </strong><small className="userInfo">{name}</small></span>
              <span className="memoLogo"><strong>Major:</strong> <small className="userInfo">{major}</small></span>
            </Link>
        </div>
        <div className="topbar-right">
          <div className="Icons">
            <div className="enroll-cart">
              <Link to={`/${name}/cart`}>
                <ShoppingCartIcon className="Icon"/>
                {cartNumber === 0 ?  <></> : <span className="cart-number">{cartNumber}</span>}
              </Link>
            </div>
            <SettingsIcon
            className="Icon"/>
            <Link to={`/${name}/profile`}>
              <AccountCircleIcon
              className="Icon"/>
            </Link>
          </div>
        </div>
    </div>
  )
}
