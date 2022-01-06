import React, {useState} from "react";
import {Col,Form, InputGroup,Button, Row} from 'react-bootstrap'
import ShowInfo from "./ShowInfo";


const Checkout = () => {

    if(localStorage.getItem('r') !== "Receptionist")
    {
        window.location.href = "/";
    }

    var g ={
        name:'',
        cnic:'',
        phone_no:'',
        checkedIn:''
    }

    const [checkOutObj,setCheckOutObj] = useState({
        Message:'',
        Bill:''
    })
    const [guest, setguest] = useState(g);
    const [roomId, setRoomId] = useState('');
    const [showData, setShowData] = useState(false);
    const userHandleClick = () => {
        const reqoptions = {
            method : "POST",
            headers : {"Content-Type" : "application/JSON",
            "Authorization" : 'Bearer ' + localStorage.getItem('t')},
            body : JSON.stringify({
                roomId: roomId
            })
        }
        const url = "https://sda-backend-hotel.herokuapp.com/hotel/getUser";
        fetch(url,reqoptions)
        .then((response) => response.json())
        .then((json) => {
            setShowData(true);
            setguest(json["User"]);
        })
        .catch((error) => console.log(error));
    }

    const checkOutHandleClick = () => {
        const reqoptions = {
            method : "POST",
            headers : {"Content-Type" : "application/JSON",
            "Authorization" : 'Bearer ' + localStorage.getItem('t')},
            body : JSON.stringify({
                roomId: roomId
            })
        }
        const url = "https://sda-backend-hotel.herokuapp.com/hotel/checkOut";
        fetch(url,reqoptions)
        .then((response) => response.json())
        .then((json) => {
            setShowData(true);
            setCheckOutObj(json["CheckOut"]);
        })
        .catch((error) => console.log(error));
    }

    return(
        <div>
            <div id="checkout-heading" style={{textAlign:"center",paddingTop:"20px"}}>
                <h1>Checkout</h1>
            </div>

            <div id=" form-search" style={{ position:"relative",paddingLeft:"30%",paddingTop:"50px",paddingBottom:"30px"}}>
                <Form>
                    <Row >
                        <Col sm={2}>
                            <Form.Label><h5>Room No</h5></Form.Label>
                        </Col>

                        <Col sm={2}>
                            <InputGroup>
                                <Form.Control type="text" value={roomId} onChange={e => setRoomId(e.target.value)} name="rNo" placeholder="Room No" />
                            </InputGroup>
                        </Col>

                        <Col>
                            <Button onClick = {userHandleClick}> Search </Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <ShowInfo flag = {showData} guestData={guest} />

            { showData?
                <div style={{ position:"relative",paddingLeft:"45%",paddingTop:"10px",paddingBottom:"10px"}}>
                    <Button onClick = {checkOutHandleClick}>Checkout</Button>
                </div>
            :"" }

            <br/>
            {checkOutObj.Message === "Checked-Out"?
            <div style={{backgroundColor: "rgb(179,255,179)",color: "black",width:"100%",textAlign:"center",paddingTop:"10px",paddingBottom:"10px"}}>
                <h2>Total Payable Amount : Rs.{checkOutObj.Bill}</h2>
            </div>:""}

            
            <br/>
            <br/>
            <br/>
        </div>
    )
}


export default Checkout;