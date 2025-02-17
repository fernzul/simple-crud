import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is Required.']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is Required.']
    },
    userName: {
        type: String,
        required: [true, 'Username is Required.'],
        unique: true,
        trim: true
    },
    password : {
        type: String,
        required: [true, 'Password is Required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is Required'],
    }
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if(!this.isModified('passoword')) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {  return bcrypt.compare(candidatePassword, this.password); };

const user = mongoose.model('User', userSchema);

export default user;