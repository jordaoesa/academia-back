const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, trim: true, required: true},
  type: {type: String, enum: ['ADMIN', 'USER'], required: true},
  token: {type: String, trim: true, unique: true, required: true},
  token_expiration_date: {type: Date, required: true, default: Date.now()},

  contact: {type: String, trim: true},
  address: {
    country: {type: String, trim: true},
    state: {type: String, trim: true},
    city: {type: String, trim: true},
    street: {type: String, trim: true},
    zipcode: {type: String, trim: true},
  },

  created_at: {type: Date, default: Date.now, required: true},
});

// methods ======================
userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = () => mongoose.model('User', userSchema);
