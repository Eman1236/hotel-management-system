import React, { useState } from "react";
import { Col, Form, Table, Button, Row, InputGroup } from "react-bootstrap";
import Items from "./Items.json"

const OrderFood = () => {

    if(localStorage.getItem('r') !== "Guest")
    {
        window.location.href = "/";
    }

    const [q1, setq1] = useState(0);
    const [q2, setq2] = useState(0);
    const [q3, setq3] = useState(0);
    const [q4, setq4] = useState(0);
    const [q5, setq5] = useState(0);
    const [q6, setq6] = useState(0);
    const [q7, setq7] = useState(0);
    const [q8, setq8] = useState(0);
    const [q9, setq9] = useState(0);
    const [q10, setq10] = useState(0);
    const [roomId,setRoomId] = useState(0);
    const [orderObj, setOrderObj] = useState({
        orderId: 0,
        orderPlaced: "Null"
    });
    const [showData,setShowData] = useState(false);

    const handleChange = (name, value) => {
        if (name === "Chicken Karahi") {
            setq1(value);
        }
        else if (name === "Chicken Wings") {
            setq2(value);
        }
        else if (name === "Chicken Biryani") {
            setq3(value);
        }
        else if (name === "Naan Basket") {
            setq4(value);
        }
        else if (name === "BBQ Platter") {
            setq5(value);
        }
        else if (name === "Chicken Corn Soup") {
            setq6(value);
        }
        else if (name === "French Fries") {
            setq7(value);
        }
        else if (name === "Pasta") {
            setq8(value);
        }
        else if (name === "Ice Cream per Scoop") {
            setq9(value);
        }
        else if (name === "Cold Drink 1.5 Ltr") {
            setq10(value);
        }
    }

    const getValue = (name) => {
        if (name === "Chicken Karahi") {
            return q1;
        }
        else if (name === "Chicken Wings") {
            return q2;
        }
        else if (name === "Chicken Biryani") {
            return q3;
        }
        else if (name === "Naan Basket") {
            return q4;
        }
        else if (name === "BBQ Platter") {
            return q5;
        }
        else if (name === "Chicken Corn Soup") {
            return q6;
        }
        else if (name === "French Fries") {
            return q7;
        }
        else if (name === "Pasta") {
            return q8;
        }
        else if (name === "Ice Cream per Scoop") {
            return q9;
        }
        else if (name === "Cold Drink 1.5 Ltr") {
            return q10;
        }
    }

    const handleClick = () => {
        let i = [
            {"Item":Items.items[0].name,"quantity":parseInt(q1)},
            {"Item":Items.items[1].name,"quantity":parseInt(q2)},
            {"Item":Items.items[2].name,"quantity":parseInt(q3)},
            {"Item":Items.items[3].name,"quantity":parseInt(q4)},
            {"Item":Items.items[4].name,"quantity":parseInt(q5)},
            {"Item":Items.items[5].name,"quantity":parseInt(q6)},
            {"Item":Items.items[6].name,"quantity":parseInt(q7)},
            {"Item":Items.items[7].name,"quantity":parseInt(q8)},
            {"Item":Items.items[8].name,"quantity":parseInt(q9)},
            {"Item":Items.items[9].name,"quantity":parseInt(q10)}

        ]
        
        const reqoptions = {
            method : "POST",
            headers : {"Content-Type" : "application/JSON",
            "Authorization" : 'Bearer ' + localStorage.getItem('t')},
            body : JSON.stringify({
                roomId: parseInt(roomId),
                items: i
            })
        }
        console.log(reqoptions.body);
        const url = "https://sda-backend-hotel.herokuapp.com/hotel/orderFood";
        fetch(url,reqoptions)
        .then((response) => response.json())
        .then((json) => {
            setShowData(true);
            console.log(json);
            setOrderObj(json["Order_Credentials:"]);
        })
        .catch((error) => console.log(error));
    }

    return (
        <div>
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
                    </Row>
                </Form>
            </div>
            <h1 style={{ textAlign: "center" }}>Order Food</h1>
            <div style={{ position: "relative", paddingLeft: "25%", paddingRight: "25%" }}>
                <Form>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>Item Name</th>
                                <th style={{ textAlign: "center" }}>Price</th>
                                <th style={{ textAlign: "center" }}>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                Items.items.map((item) =>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>Rs.{item.price}</td>
                                        <td style={{ textAlign: "center" }}>

                                            <input type="number" value={getValue(item.name)} onChange={e => handleChange(item.name, e.target.value)} style={{ width: "20%" }} />

                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <div style={{ paddingLeft: "40%", paddingBottom: "20px" }}>
                        <Button onClick={handleClick}> Place Order </Button>
                    </div>
                </Form>
            </div>
            <div style={{ paddingBottom: "20px" }}>
                {showData?<div style={{ backgroundColor: "rgb(179,255,179)", color: "black", width: "100%", textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}>
                    <h2>
                        Your Order has been placed.
                    </h2>
                    <h4>
                        Order#{orderObj.orderId}
                        <br/>
                        Time Placed:{orderObj.orderPlaced}
                    </h4>
                </div>:""}
            </div>
        </div>
    )
}
export default OrderFood;