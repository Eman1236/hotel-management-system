import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Checkin = (props) => {

    if(localStorage.getItem('r') !== "Receptionist")
    {
        window.location.href = "/";
    }
    
    const queryParams = new URLSearchParams(window.location.search);
    var roomNo = parseInt(queryParams.get('roomNo'))
    var cid = {
        roomId: roomNo,
        name: '',
        cnic:'',
        email:'',
        phone_no:''
    }
    const [checkInDetails, setCheckInDetails] = useState(cid);
    const [showData, setShowData] = useState(false);
    var rc = {
        "Credentials": {
            "bookingId": 0,
            "checkedIn": "",
            "email": "",
            "password": ""
        },
        "Message": ""
    }
    const [ReturnCredentials,setReturnCredentials] = useState(rc);

    const handleClick = () => {
        const reqoptions = {
            method : "POST",
            headers : {"Content-Type" : "application/JSON",
                       "Authorization" : 'Bearer ' + localStorage.getItem('t')
        },
            body : JSON.stringify(checkInDetails)
        }
        const url = "http://localhost:3001/hotel/checkIn";
        fetch(url,reqoptions)
        .then((response) => response.json())
        .then((json) => {
            //setisLoadingData(false);
            setShowData(true);
            setReturnCredentials(json["CheckIn_Details"]);
        })
        .catch((error) => console.log(error));
    }

    return (
        <div>
            <div >

                <div style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                    <h2 className="form-group text-center"><br />Guest Information</h2>
                    <br />

                    <div className="form-group input-group text-center" style={{ width: "50%", left: "350px" }}>
                        <div className="input-group-prepend text-center" style={{ width: "20%" }}>
                            <span className="input-group-text text-center">
                                {"Name"}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            id="name"
                            name="name"
                            className="form-control text-center"
                            placeholder="Name"
                            type="text"
                            value={checkInDetails.name}
                            onChange={e => setCheckInDetails({  ...checkInDetails,name : e.target.value})}

                        //onChange={handleChange}
                        />
                    </div>
                    <br />

                    <div className="form-group input-group text-center" style={{ width: "50%", left: "350px" }}>
                        <div className="input-group-prepend text-center" style={{ width: "20%" }}>
                            <span className="input-group-text text-center">
                                {"Cnic"}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            id="cnic"
                            name="cnic"
                            className="form-control text-center"
                            placeholder="Cnic No"
                            type="text"
                            value={checkInDetails.cnic}
                            onChange={e => setCheckInDetails({  ...checkInDetails,cnic : e.target.value})}

                        //onChange={handleChange}
                        />
                    </div>
                    <br />

                    <div className="form-group input-group text-center" style={{ width: "50%", left: "350px" }}>
                        <div className="input-group-prepend text-center" style={{ width: "20%" }}>
                            <span className="input-group-text text-center">
                                {"Phone No"}
                                <i className="fa fa-envelope" />{" "}
                            </span>
                        </div>
                        <input
                            id="phNo"
                            name="phNo"
                            className="form-control text-center"
                            placeholder="Phone No"
                            type="number"
                            value={checkInDetails.phone_no}
                            onChange={e => setCheckInDetails({  ...checkInDetails,phone_no : e.target.value})}

                        //onChange={handleChange}
                        />
                    </div>
                    <br />

                    <div className="form-group input-group" style={{ width: "50%", left: "350px" }}>
                        <div className="input-group-prepend" style={{ width: "20%" }} >
                            <span className="input-group-text text-center">
                                {"Email"}
                                <i className="fa fa-lock" />{" "}
                            </span>
                        </div>
                        <input
                            id="email"
                            name="email"
                            className="form-control text-center"
                            placeholder="Email"
                            type="email"
                            value={checkInDetails.email}
                            onChange={e => setCheckInDetails({  ...checkInDetails,email : e.target.value})}
                        />
                    </div>

                    <br />
                    <br />

                    <div className=" form-group text-center" >
                        <button onClick = {handleClick}  className="btn btn-primary login-btn btn-block center">
                            Check In
                        </button>
                    </div>
                </div>
            </div>
            {showData? <div style={{ paddingBottom: "20px" }}>
                <div style={{ backgroundColor: "rgb(179,255,179)", color: "black", width: "100%", textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}>
                    <h2>
                        Message:{ReturnCredentials.Message}
                    </h2>
                    {ReturnCredentials.Message === "CheckIn Successfull" ? <h5>
                        Booking Id: {ReturnCredentials.Credentials.bookingId}
                        <br />
                        Email: {ReturnCredentials.Credentials.email}
                        <br />
                        Password: {ReturnCredentials.Credentials.password}
                        <br />
                        Date: {ReturnCredentials.Credentials.checkedIn}
                    </h5>:""}
                </div>
            </div>:""}
        </div>
    )
}

export default Checkin;
