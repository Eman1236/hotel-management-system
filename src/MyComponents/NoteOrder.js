import React,{useState} from "react";
import {Table,Button } from "react-bootstrap";

const NoteOrder =() => {

    if(localStorage.getItem('r') !== "Chef")
    {
        window.location.href = "/";
    }

    var orders = [
        {
            "orderId" : 0,
            "roomId": 0,
            "createdAt": '',
            "OrderItems" : [] 
        }
    ];


    const [orderObj, setOrderObj] = useState(orders);

    const handleClick = () => {
        const reqoptions = {
            method : "GET",
            headers : {"Content-Type" : "application/JSON",
            "Authorization" : 'Bearer ' + localStorage.getItem('t')},
        }
        //console.log(reqoptions.body);
        const url = "http://localhost:3001/hotel/showOrders";
        fetch(url,reqoptions)
        .then((response) => response.json())
        .then((json) => {
            setOrderObj(json["Orders"]);
        })
        .catch((error) => console.log(error));
    }

    const [status,setStatus] = useState({
        "Message": ''
    })
    const confirmHandleClick = (id) => {
        const reqoptions = {
            method : "POST",
            headers : {"Content-Type" : "application/JSON",
            "Authorization" : 'Bearer ' + localStorage.getItem('t')},
            body : JSON.stringify({
                orderId: id
            })
        }
        const url = "http://localhost:3001/hotel/confirmOrder";
        fetch(url,reqoptions)
        .then((response) => response.json())
        .then((json) => {
            setStatus(json["Status"]);
            if(status.Message === "Order Confirmed Successfully"){
                let o = {}
                for (const order of orderObj) {
                    if(order.orderId === id){
                        o = order;
                        break;
                }
                    
                }
                var index = orderObj.indexOf(o);
                orderObj.splice(index, 1);
            }
        })
        .catch((error) => console.log(error));
    }

    const [delStatus,setDelStatus] = useState({
    })
    const deleteHandleClick = (id) => {
        const reqoptions = {
            method : "POST",
            headers : {"Content-Type" : "application/JSON",
            "Authorization" : 'Bearer ' + localStorage.getItem('t')},
            body : JSON.stringify({
                orderId: id
            })
        }
        const url = "http://localhost:3001/hotel/deleteOrder";
        fetch(url,reqoptions)
        .then((response) => response.json())
        .then((json) => {
            setDelStatus(json["Status"]);
            if(delStatus.Message === "Successful"){
                let o = {}
                for (const order of orderObj) {
                    if(order.orderId === id){
                        o = order;
                        break;
                }
                    
                }
                var index = orderObj.indexOf(o);
                setOrderObj(orderObj.splice(index, 1));

            }
        })
        .catch((error) => console.log(error));
    }

    return(
        <div>
            <div style={{paddingBottom:"20px"}}>
                <div style={{backgroundColor: "rgb(179,255,179)",color: "black",width:"100%",textAlign:"center",paddingTop:"20px",paddingBottom:"20px"}}>
                    <h2>Orders Queue  <Button onClick={handleClick} >Refresh</Button></h2>
                    
                </div>
            </div>
            {
                orderObj.map((order) =>
                    <div style={{paddingLeft:"25%",paddingRight:"25%",paddingTop:"10px",paddingBottom:"20px"}}>
                        <h3 style={{textAlign:"center"}}>
                            Order# {order.id}
                            <br/>
                            Room# {order.roomId}
                            <br/>
                            Time Placed: {order.createdAt}
                        </h3>
                        <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th style={{textAlign:"center"}}>Item Name</th>
                                <th style={{textAlign:"center"}}>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.OrderItems.map((item) =>
                                    <tr>
                                        <td>{item.Item}</td>
                                        <td>{item.quantity}</td>
                                    </tr>  
                                )
                            } 
                        </tbody>
                        </Table>
                        <div style={{textAlign:"center"}}>
                            <Button onClick={e => confirmHandleClick(order.id)}>Confirm Order</Button>&nbsp;
                            <Button onClick={e => deleteHandleClick(order.id)}>Delete Order</Button>
                        </div>
                        
                    </div>
                )
            }

        </div>
    )

}

export default NoteOrder;