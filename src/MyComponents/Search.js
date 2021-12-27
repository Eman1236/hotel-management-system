import React, { useState } from 'react'
import { Col, Form, InputGroup, Button, Row, Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";



const Search = () => {

    if(localStorage.getItem('r') !== "Receptionist")
    {
        window.location.href = "/";
    }

    var r = [];

    const [rooms, setRooms] = useState(r);
    const [type, setType] = useState("All");
    const [showData, setShowData] = useState(false);

    const handleClick = () => {
        const reqoptions = {
            method: "POST",
            headers: { "Content-Type": "application/JSON",
            "Authorization" : 'Bearer ' + localStorage.getItem('t') },
            body: JSON.stringify({
                type: type
            })
        }
        const url = "http://localhost:3001/hotel/searchRoom";
        fetch(url, reqoptions)
            .then((response) => response.json())
            .then((json) => {
                setShowData(true);
                setRooms(json["Rooms"])
                console.log(json["Rooms"])
            })
            .catch((error) => console.log(error));
    };

    const history = useNavigate();


    return (
        <div>
            <div id="search">
                <div style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: "url('https://image-tc.galaxy.tf/wijpeg-enpyonezcpd1jarp7khc4ql10/file.jpg')", backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: '83vh',
                }}>
                    <div style={{ bottom: "20px", right: "20px", backgroundColor: "rgb(245,245,220)", color: "black", paddingLeft: "20px", paddingRight: "20px", width: "70%" }}>
                        <Form >
                            <Row className="align-items-center">
                                <Col sm={5} className="my-1" style={{ paddingLeft: "10%" }}>


                                    <Form.Label htmlFor="inlineFormInputGroupUsername" >
                                        <h2>To</h2>
                                    </Form.Label>

                                    <InputGroup>
                                        <Form.Control type="date" name="dateTo" placeholder="To" />
                                    </InputGroup>
                                </Col>

                                <Col sm={3} className="my-1">
                                    <Form.Label htmlFor="inlineFormInputGroupUsername" >
                                        <h2>From</h2>
                                    </Form.Label>
                                    <InputGroup>
                                        <Form.Control type="date" name="dateFrom" placeholder="From" />
                                    </InputGroup>
                                </Col>

                                <Col sm={3} >
                                    <Form.Group controlId="formGridState">

                                        <Form.Label><h2>Room Type</h2></Form.Label>
                                        <Form.Select defaultValue="All" value={type} onChange={e => setType(e.target.value)} name="roomType">
                                            <option>All</option>
                                            <option>Single Deluxe</option>
                                            <option>Double Deluxe</option>
                                            <option>Single Executive</option>
                                            <option>Double Executive</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>



                                <Col xs="left" className="my-1" style={{ paddingLeft: "400px", paddingTop: "20px" }}>
                                    <Button onClick={handleClick}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div style={{ position: 'relative' }}>
                </div>
            </div>
            <div>
                {showData ?
                    <div>
                        <h1 className="text-center" style={{ paddingTop: "50px", paddingBottom: "50px" }}> Rooms </h1>
                        <Row xs={1} md={2} className="g-4">
                            {
                                rooms.map((room) =>

                                    <Card style={{ width: '18rem' }}>
                                        {room.type === "Single Deluxe" || room.type === "Double Deluxe" ?
                                            <Card.Img variant="top" src="https://image-tc.galaxy.tf/wijpeg-6vo7vkmv252p2twje8umdj8yg/standard.jpg?" />
                                            :
                                            <Card.Img variant="top" src="https://image-tc.galaxy.tf/wijpeg-al53h5tg08dekte98h46pryxz/standard.jpg?" />
                                        }
                                        <Card.Body>
                                            <Card.Title >{room.roomNo}</Card.Title>
                                            <Card.Text>
                                                <b>{room.type}</b>
                                            </Card.Text>

                                            <Button variant="primary" onClick={() => { var path = "/checkin?roomNo=" + room.roomNo; history(path); }} >Check In</Button>

                                        </Card.Body>
                                    </Card>
                                )
                            }
                        </Row>
                        <div style={{ paddingTop: "50px" }}></div>
                    </div>
                    : ""}
            </div>
        </div>
    )
}
export default Search;

