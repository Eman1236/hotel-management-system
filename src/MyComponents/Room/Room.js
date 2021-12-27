// import React from "react";
import "./Room.module.css";
// import Styles from "./Room.module.css";


const Room = () => {
    return(
        <div>
            
            <h1 className="text-center" style={{paddingTop:"100px",paddingBottom:"50px"}}>
                ACCOMMODATION
            </h1>

            <div style={{display: "flex" , flexDirection : "column" ,alignItems : "center",paddingLeft:"200px" ,  paddingRight:"200px", textAlign:"center"}}>
                <div style={{textJustify:"auto"}}>            
                    <p>
                        A rich, vibrant showcase of classic Pakistani design and décor, the 336 rooms and 51 suites at Islamabad Serena Hotel inspire and soothe simultaneously.
                    </p>
                </div>
            <p>
                Within each room, elaborate Islamic aesthetics are perfectly balanced with contemporary comfort. Custom-made furniture, arabesque marble patterns, ornate woodwork and splendid hand-woven carpets of the finest silk and wool thread infuse the space with a measure of local richness, whilst deluxe bedding and linens, Penhaligon's bath amenities and complimentary high-speed Wi-Fi indulge your desire for modern amenities.
            </p>
            <p>
                Nestled among 14 acres of gardens, exotic plantings and outdoor terraces, all of our accommodation In Islamabad overlooks captivating views of the hotel‘s landscaped gardens, the Margalla Hills and the Rawal Lake. Throughout your stay, our staff will provide the finest level of service and care, ensuring all your wishes and needs are met effortlessly – creating unique, personal and memorable experiences that will last a lifetime.
            </p>
            </div>

            <div style ={{paddingRight:"200px",paddingLeft:"200px",paddingTop : "50px" , display: "flex" ,flexDirection: "row"}}>
                <img style={{width: "500px",height: "300px" }} alt="" src="https://image-tc.galaxy.tf/wijpeg-6vo7vkmv252p2twje8umdj8yg/standard.jpg?">
                </img>
                <div style={{display: "flex" ,flexDirection: "column" , alignItems: "center" , marginLeft : "50px"}}>
                    <h1>
                        Deluxe Room
                    </h1>
                    <p>
                        Step into an oasis of tranquillity and calm in the Deluxe Room, with views over the hotel’s beautifully landscaped gardens and beyond to the city. It offers the choice of a comfortable.
                    </p>

                    <button style={{backgroundColor: "rgb(248, 164, 8)" ,width: "250px",height: "50px",borderRadius: "5px",marginTop: "10px"}}>
                            Rs.10,000 per day
                    </button>
                </div>
            </div>

       
            <div style ={{ paddingRight:"200px",paddingLeft:"200px",paddingTop : "50px" ,display: "flex" ,flexDirection: "row",paddingBottom:"100px"}}>
                <div style={{marginTop : "50px",marginRight: "50px",display: "flex",flexDirection: "column",alignItems: "center"}}>
                    <h1>
                        Executive Room
                    </h1>
                    <p>
                        Check-In into the Executive Room with beautiful garden views and avail top-of-the-line amenities.You’ll enjoy
                    </p>
                    <button style={{backgroundColor: "rgb(248, 164, 8)" ,width: "250px",height: "50px",borderRadius: "5px",marginTop: "10px"}}>
                            Rs.15,000 per day
                    </button>
                </div>
                <img style={{marginTop: "50px",width: "500px",height: "300px"}} alt="" src="https://image-tc.galaxy.tf/wijpeg-al53h5tg08dekte98h46pryxz/standard.jpg?">

                    </img>
                
            </div>
        </div>
    )
}

export default Room;