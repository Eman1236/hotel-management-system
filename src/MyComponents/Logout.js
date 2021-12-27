import React from "react";

const Logout = (props) => {
    if(localStorage.getItem('t'))
    {
        localStorage.clear();
        window.location.href = "/";
    }
    return(
      <div>
        <p>Logged Out</p>
      </div>
    )
  }

export default Logout;