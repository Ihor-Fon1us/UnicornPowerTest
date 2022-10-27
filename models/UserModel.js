const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^(?:\+38)?(0\d{9})$/.test(v) || /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number or email!`
        },
    },
    password: {
        type: String,
        required: true,
    },
    id_type: {
        type: String
    }
}, { timestamps: true });

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);