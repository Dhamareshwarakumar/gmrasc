var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;


// Import Models
const Admin = require('../models/Admin');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;


module.exports = passport => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        if (jwt_payload.role === 0) {
            // User is Super Admin
            Admin.findOne({ username: jwt_payload.username })
                .then(admin => {
                    if (admin) {
                        const user = {
                            id: admin._id,
                            username: admin.username,
                            role: admin.role
                        };
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => done(err, false));
        } else if (jwt_payload.role === 1) {
            // User id Admin
            Admin.findOne({ username: jwt_payload.username })
                .then(admin => {
                    if (admin) {
                        const user = {
                            id: admin._id,
                            username: admin.username,
                            role: admin.role
                        };
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch(err => done(err, false));
        } else if (jwt_payload.role === 2) {
            // User is a Member
        } else if (jwt_payload.role === 3) {
            // User is a Guest
        } else {
            // User is not recognized
            return done(null, false);
        }
    }));
}