const mongoose = require('mongoose')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        
    },
    profileImage:{
        type:String,
        default:""
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
        required:true,
    },
    passwordResetToken:{
        type:String
    },
    passwordResetExpires:{
        type:Date
    }

},{timestamps:true})

userSchema.methods.createPasswordResetToken =function() {
        // generate a random token
        const resetToken = crypto.randomBytes(32).toString('hex')
        // hash it
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        // set expires
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes
        // return that token which was not hashed for the user
        return resetToken
}

module.exports = mongoose.model('User',userSchema)