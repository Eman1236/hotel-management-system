const Room = class {
    constructor(roomNo,type,floor,booked) {
      this.roomNo = roomNo;
      this.type = type;
      this.floor = floor;
      this.booked = booked
    }
    


    print = () => {
        console.log(this.roomNo,this.floor,this.type);
    }
  };


  module.exports = Room;