const io = require('socket.io')();
const passportJwtSocketIo = require('passport-jwt.socketio')
const ExtractJwt = require('passport-jwt').ExtractJwt;
const model = require('../model/index');

// set the passport-jwt options
const options = {
	jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
	secretOrKey: process.env.TOKEN_SECRET
}

const onlineUsers = new Set()
// set the authorization middleware
io.use(passportJwtSocketIo.authorize(options, async function(jwt_payload, done) {

    try{
        const user = await model.users.findOne({where : {id :jwt_payload.id}});

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }
    catch(error){
        return done(error, false);
    }

}))

io.on("connection", async function (socket) {
	socket.join(`personal-${socket.handshake.user.id}`);
    console.log("user connected",socket.handshake.user.id)
    onlineUsers.add(socket.handshake.user.id);
    console.log("Online users" ,onlineUsers);
    socket.emit("connection",socket.handshake.user.id)

    socket.on('disconnect', function () {
        onlineUsers.delete(socket.handshake.user.id);
        console.log("Online users" ,onlineUsers);
        console.log("user disconnected",socket.handshake.user.id);
        // socket.emit('disconnected')
    });
});



module.exports = {io,onlineUsers};