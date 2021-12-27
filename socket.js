const io = require("socket.io-client")
const socket = io("http://172.16.36.68:3000", {
	reconnectionDelayMax: 10000,
	query: {
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6InphaW4gdWwgYWJpZGVlbiIsImVtYWlsIjoiemFpbkBnbWFpbC5jb20iLCJnZW5kZXIiOiJtYWxlIiwiY3JlYXRlZEF0IjoiMjAyMS0wOC0yNVQwNTo0MTowOC4wMDBaIiwiaWF0IjoxNjI5ODcwMTAyLCJleHAiOjE2MzA0NzQ5MDJ9.jeAbkmvK7RDsONewt46XODcXNnDusFi8elapttnDpy8"
	},
	// secure: true,
	reconnection: true,
	//   rejectUnauthorized: false,
	//   transports: ['websocket']
});

socket.on("connection",() => {
    console.log("id",socket.id)

    socket.on('disconnected', function() {

    });

})

socket.on("disconnect",() => {
    console.log("disconnected user")
})

socket.on("post_created",(data) => {

    console.log("post created",data)
})

