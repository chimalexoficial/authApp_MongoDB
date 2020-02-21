const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let configCredentials = require('../config/config.js'); //importacion de config
let usersJSON = require('../db/users.json');
const fs = require('fs');


passport.use(new GoogleStrategy({
    clientID: configCredentials.clientID,
    clientSecret: configCredentials.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/redirect'
}, function (accessToken, refreshToken, profile, done) {
    let id = new Date().getTime();
    let googleId = profile.id;
    let email = profile._json.email;
    let imageUrl = profile._json.picture;
    console.log('working');
    console.log(profile);
    console.log('EMPIEZAN LAS PRUEBAS');
    /*console.log(id);
    console.log(googleId);
    console.log(email);
    console.log(imageUrl);*/
    if (usersJSON.users.length == 0) {
        usersJSON.users.push({ "id": id, "googleId": googleId, "email": email, "imageUrl": imageUrl })
        fs.writeFileSync('./db/users.json', JSON.stringify(usersJSON));
        console.log('El tamano de del JSON es 0, se ha insertado un elemento');
    } else {
        for (let i = 0; i < usersJSON.users.length; i++) {
            if (usersJSON.users[i].googleId == profile.id) {
                console.log('Error al insertar. Ya existe el mismo id');
            } else {
                usersJSON.users.push({ "id": id, "googleId": googleId, "email": email, "imageUrl": imageUrl })
                fs.writeFileSync('./db/users.json', JSON.stringify(usersJSON));
            }

        }
    }


}))