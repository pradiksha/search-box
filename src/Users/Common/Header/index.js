import React from 'react'
import LeftLogo from "../Images/fullThrottleLogo.png"
import RightLogo from "../Images/sideLogo.png"
import "./header.css"

export default function Header() {
    return (
        <div className="header_container ml-3 mr-3">
          <div className="d-flex">
            <img src={LeftLogo} alt="Full Throttle Logo" height="100"></img>
            <img src={RightLogo} className="float-right" alt="Full Throttle Logo" height="200"></img>
          </div>
        </div>
    )
}
