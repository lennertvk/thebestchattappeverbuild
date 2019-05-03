/*Configuratie van het passwoord, hoe gebruiker mag aanloggen en registreren */
//module van passport opladne
const passport =require('passport');

const User = require('../models/User');

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
//ingeplugde queries gebruiken om te registreren en in te loggen
//beveiligen van routes
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());