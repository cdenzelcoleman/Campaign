const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    // character???
    // campains???
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 12);
        next();
    });

userSchema.methods.comparePassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);

