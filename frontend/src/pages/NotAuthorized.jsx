import React from "react";
import "./NotAuthorized.css"; 
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="errorPage">
      <div className="pageNotFound">
        <img
          src="./images/errorkey.png"
          className="img-key"
          alt="Key Icon"
        />
        <h1 className="textXl">
          <span>4</span>
          <span>0</span>
          <span className="broken">3</span>
        </h1>
        <h4 className="textMd">Access Denied!</h4>
        <h4 className="btm">
          You don’t have access to this area of the application. Speak to your
          administrator to unblock this feature. You can go back to{" "}
          <span onClick={()=>{ 
            navigate(-1);
          }}>previous page</span>
        </h4>
      </div>
    </div>
  );
};

export default NotAuthorized;
