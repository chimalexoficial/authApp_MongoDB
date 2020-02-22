const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let configCredentials = require('../config/config.js'); //importacion de config
let usersJSON = require('../db/users.json');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-nsxs1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
let usersData = fs.readFileSync('./db/users.json');
let users = JSON.parse(usersData);
let db = mongoose.connection;

passport.use(new GoogleStrategy({
    clientID: configCredentials.clientID,
    clientSecret: configCredentials.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/redirect'
}, function (accessToken, refreshToken, profile, done) {
    let name = profile._json.name;
    let id = new Date().getTime();
    let googleId = profile.id;
    let email = profile._json.email;
    let imageUrl = profile._json.picture;
    let user = {
        "name": name,
        "id": id,
        "googleId": googleId,
        "email": email,
        "imageUrl": imageUrl
    }
    console.log('working');
    console.log(profile);
    console.log('EMPIEZAN LAS PRUEBAS');
    /*console.log(id);
    console.log(googleId);
    console.log(email);
    console.log(imageUrl);*/

    /*
    if (usersJSON.users.length == 0) { //if there is not a user in JSON file, create one
        usersJSON.users.push({ "id": id, "googleId": googleId, "email": email, "imageUrl": imageUrl })
        fs.writeFileSync('./db/users.json', JSON.stringify(usersJSON));
        console.log('El tamano de del JSON es 0, se ha insertado un elemento');
        //done(null, newUser)
    } else {
        for (let i = 0; i < usersJSON.users.length; i++) {
            if (usersJSON.users[i].googleId == profile.id) { //if id's inserting is equal
                console.log('Error al insertar. Ya existe el mismo id');//err
                done(null, findUser)
            } else {
                usersJSON.users.push({ "id": id, "googleId": googleId, "email": email, "imageUrl": imageUrl })
                fs.writeFileSync('./db/users.json', JSON.stringify(usersJSON));
                //done(null, newUser)
            }

        }
    } */


    let userSchema = new mongoose.Schema({
        name: String,
        id: Number,
        googleId: String,
        email: String,
        imageUrl: String
    })


    let User = mongoose.model('User', userSchema);

    module.exports = User;


    let flag = usersJSON.users.find((findUser) => findUser.googleId == user.googleId);
    if (flag) {
        console.log('Ya existe el usuario');
        //db.users.insertMany(users);
        done(null, flag);
    } else {
        let newUser = new User(user)
        //usersJSON.users.push({ "id": id, "googleId": googleId, "email": email, "imageUrl": imageUrl })
        newUser.save(function (err) {
            if (err) return handleError(err);
            console.log('Cargado a mongo');
        })
        usersJSON.users.push({
            "name": name,
            "id": user.id,
            "googleId": user.googleId,
            "email": user.email,
            "imageUrl": user.imageUrl
        })
        fs.writeFileSync('./db/users.json', JSON.stringify(usersJSON));
        done(null, user);
        console.log('Usuario insertado');
    }
}))


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    let findUser = usersJSON.users.find(usr => usr.id == id);
    done(null, findUser);
})