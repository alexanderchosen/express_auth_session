const moogoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserModel = new moogoose.Schema({
    username: String,
    password: String
})

// the passport local mongoose will hlep us to hash the password, validate the password, retrieving from Db and updating password
// Automatically handles hashing and salting of passwords
// and adds the following properties to the user object:
//   - password
//   - salt
//   - hash
UserModel.plugin(passportLocalMongoose) // this defines a passport local for the users model 

module.exports = moogoose.model('users', UserModel)