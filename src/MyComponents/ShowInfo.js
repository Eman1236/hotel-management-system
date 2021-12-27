import React from "react";
import { Table } from "react-bootstrap";

const ShowInfo = (props) => {

    
    return (

        <div>
            {props.flag ?
                <div style={{ position: "relative", paddingLeft: "25%", paddingRight: "25%" }}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th colSpan="2" style={{ textAlign: "center" }}> <h2>Guest Information </h2></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Name</b></td>
                                <td>{props.guestData.name}</td>
                            </tr>
                            <tr>
                                <td><b>CNIC</b></td>
                                <td>{props.guestData.cnic}</td>
                            </tr>
                            <tr>
                                <td><b>Phone Number</b></td>
                                <td>{props.guestData.phone_no}</td>
                            </tr>
                            <tr>
                                <td><b>CheckIn</b></td>
                                <td>{props.guestData.createdAt}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                : ""}
        </div>
    )
}

export default ShowInfo;