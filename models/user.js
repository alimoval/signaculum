const bcrypt = require('bcrypt');
const mongojs = require('mongojs');
const db = mongojs('mongodb://alik:alik@ds161346.mlab.com:61346/signaculum');

const User = module.exports;

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            db.users.save(newUser, callback);
        });
    });
};

module.exports.getUserById = function (id, callback) {
    db.users.findOne({ _id: mongojs.ObjectId(id) }, callback);
};

module.exports.getUserByEmail = function (email, callback) {
    let query = { email: email };
    db.users.findOne(query, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}