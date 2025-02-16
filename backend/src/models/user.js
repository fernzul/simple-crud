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
        validate: {
            validator: function(v){
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password. Password must be at least 8 characters long and contain at least one number.`
        }
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br)$/.test(v);
            },
            message: props => `${props.value} is not a valid email. It should contain '@' and end with '.com' or '.com.br'.`
        }
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is Required'],
        validate: {
            validator: function(v){
            return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number. It should be in the format (XX) XXXX-XXXX.`
        }
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

const User = mongoose.model('User', userSchema);

export default User;