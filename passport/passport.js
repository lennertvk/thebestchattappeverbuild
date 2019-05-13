/*Configuratie van het passwoord, hoe gebruiker mag aanloggen en registreren */
//module van passport opladne
const passport =require('passport');
const User = require('../models/User');

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
//ingeplugde queries gebruiken om te registreren en in te loggen
//beveiligen van routes
//lokale strategie
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//online strategie (webtoken)
let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
//key uit headers halen
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'MyVerySecretWord';

// we krijgen token binne en gaan de user zoeken op basis van het meegegeven id
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.uid}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;