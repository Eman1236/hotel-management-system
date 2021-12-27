const Model = require("../model/index")
const Room = require('./Room')
const Handler = require('./databaseHandler')
const roomPrices = require('./Rooms.json')

function timer(ms)
{
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
}


const Booking = class {

    constructor(){
        this.rooms = []
        this.db = new Handler()
        this.db.initialize().then((allRooms) => {
            for(const Robj of allRooms)
            {
                let r = Robj.dataValues
                //console.log("Value of r:",r);
                if(r.booking)
                {
                    this.rooms.push(new Room(r.id,r.type,r.floor,r.booking.dataValues))
                }
                else
                {
                    this.rooms.push(new Room(r.id,r.type,r.floor,"null"))
                }
            }      
            //this.rooms[0].print()     
        })
    };

    getFreeRooms(type){

        let temp = []
        if(type != "All")
        {
            for(const r of this.rooms){
                if(r.booked == "null" && r.type == type)
                {
                    temp.push(r);
                }
            }
        }
        else{
            for(const r of this.rooms){
                if(r.booked == "null")
                {
                    temp.push(r);
                }
            }
        }
        return temp;
    };

    getRoom(roomId)
    {
        for (const room of this.rooms) 
        {
            if(room.roomNo == roomId)
            {
                return room;
            }
        }
        return false;
    };

    printRooms(){
        for(const r of this.rooms)
        {
            r.print()
        }
        
    };

    generatePassword(name,roomId){
        return name + roomId;
    }

    getAllRooms(){
        return this.rooms;
    };

    checkIn = async(roomId,name,cnic,email,phone_no,to) => {
        let r = this.getRoom(roomId);
        
        if(r.booked == "null")
        {
            var pass = this.generatePassword(name,roomId);
            var guestId = await this.db.saveGuestDetails(name,cnic,email,phone_no,pass);
            var booking = await this.db.saveBookingDetails(to,roomId,guestId);
            console.log("Booking:",booking);
            if(booking)
            {
                r.booked = booking;
                const bookingDetails = {
                    bookingId: booking.id,
                    checkedIn: booking.createdAt,
                    approxCheckoUt: booking.to,
                    email: email,
                    password: pass
                }
                return {"Credentials":bookingDetails,"Message":"CheckIn Successfull"};
            }
            else
                return {Message: "failed"};
        }

        else{
            return {Message:"Room already Booked!!!"}
        }
       
    };

    getBookingDetails(roomId){
        for(const room of this.rooms){
            //console.log(room)
            if(room.roomNo == roomId && room.booked != "null"){
                return room;
            }
        }
        return false;
    }

    getBookingPrice(days,type){
        for(const room of roomPrices.Rooms){
            if(room.type == type){
                return (room.price*days);
            }
        }
    }

    checkOut = async(roomId) => {
        let bookingDetails = this.getBookingDetails(roomId);
        if(bookingDetails){
            let userId = bookingDetails.booked.userId;
            const diffTime = Math.abs(new Date() - bookingDetails.booked.createdAt);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            let total_bill = 0
            total_bill += this.getBookingPrice(diffDays,bookingDetails.type);
            const foodOrders = await this.db.getFoodOrders(roomId);
            if(foodOrders){
                for (const order of foodOrders) {
                    total_bill += order.total_bill;
                }
            }
            //console.log("Total Bill for room:",total_bill);
            const checkOut = await this.db.checkOut(roomId,userId);
            if(checkOut){
                bookingDetails.booked = "null";
                return {"Message":"Checked-Out","Bill":total_bill};
            }
            else{
                return {"Message":"Some Error Occured"}
            }

        }
        else{
            return {"Message":"Room not Booked"}
        }
    }

    getUserDetail = async(roomId) => {
        let bookingDetails = this.getBookingDetails(roomId);
        if(bookingDetails){
            let userId = bookingDetails.booked.userId;
            const user = await this.db.getUserDetail(userId);
            if(user)
                return user;
            else
                return false;
        }
        else{
            return {"Message":"Room not Booked"}
        }
    }

};


module.exports = Booking;
