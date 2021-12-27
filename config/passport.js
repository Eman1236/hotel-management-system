var passport = require("passport");
const model = require("../model/index.js") ;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {

    try{
        const user = await model.User.findOne({where : {id :jwt_payload.id}});

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

}));

module.exports = passport;