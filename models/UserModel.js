const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const userSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
})
userSchema.plugin(mongoosePaginate)
const User = mongoose.model('user', userSchema);
module.exports = User;