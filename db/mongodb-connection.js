


 db.on('error', console.error.bind(console, 'connection error:'));

 db.once('open', function () {
     console.log("Connection Successful!");

     // define Schema
     var userSchema = mongoose.Schema({
         id: Number,
         googleId: String,
         email: String,
         imageUrl: String
     });

     // compile schema to model
     var user = mongoose.model('user', userSchema, 'users');

     // documents array
     let usersArray = usersJSON.users;

     // save multiple documents to the collection referenced by Book Model
     user.collection.insert(usersArray, function (err, docs) {
         if (err){ 
             return console.error(err);
         } else {
           console.log("Multiple documents inserted to Collection");
         }
       });
 });
