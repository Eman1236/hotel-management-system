import React from "react";

const About = () => {
    return (
        <div>
            <div style={{paddingLeft:"15%",paddingRight:"15%"}}>
                <h1 style={{fontSize: "xx-large",textAlign: "center",fontStyle: "italic",marginTop:"70px"}}>
                    ISLAMABAD HOTEL AND CONTACT
                </h1>

                <p1 style={{color: "orange",display: "flex",flexDirection: "column",alignItems: "center"}}>
                    A CENTRAL LOCATION IN ISLAMABAD
                </p1>

                <p2 style={{alignItems: "center",justifyContent: "center",marginTop: "50px"}}>
                    Islamabad Hotel offers you a central location in Islamabad, being only 45 minutes, and 35 km away from Islamabad International Airport. Nestled in the capital of Pakistan and situated in the Pothohar Plateau in the north of the country, the area serves as the crossroads of Punjab and Khyber Pakhtunkhwa, with the Margalla Pass serving as the gateway that links them. Ranked as a Gamma world city in 2008, Islamabad and much of Pakistan still remains undiscovered by international travellers.
                </p2>

                <p3>
                    You’ll find the Pakistani people to be warm and welcoming, greeting you with genuine friendliness. For any questions about Islamabad Serena Hotel, please don’t hesitate to get in touch with us. We invite you to complete the following information in order for our team to be able to respond to you in a timely manner.
                </p3>

            </div>

            <div style={{paddingRight:"20%",paddingLeft:"20%"}}>
                    <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
                        <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>Contact Us</h3></div>
                        <div className="card-body">
                        <form action="/"  encType="multipart/form-data" autoComplete="off">
                            <div className="form-group">
                                <label className="mb-0">Your name<span className="text-danger">*</span></label>
                                <input name="name" type="text" className="form-control" placeholder="Name" />
                            </div>

                            <div className="form-group">
                                <label className="mb-0">Your email<span className="text-danger">*</span></label>
                                <input name="email" type="email" className="form-control" placeholder="Email"  />
                                
                            </div>
                            <div className="form-group">
                                <label className="mb-0">Your contact number (Optional)</label>
                                <input name="contact" type="text" className="form-control" placeholder="Contact" />
                            </div>

                            <div className="form-group">
                                <label className="mb-0">Message<span className="text-danger">*</span></label>
                                <textarea name="message" type="text" className="form-control" placeholder="Message" />
                            </div>
                            <p className="text-center mb-0"><input type="submit" className="btn btn-primary btn-lg w-100 text-uppercase" value="Submit Now" /></p>
                        </form>
                        
                        </div>
                    </div>
            </div>


        </div>

    )
}

export default About;