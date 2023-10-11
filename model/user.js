const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    password: String,
})

// save encrypted password
userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
});

module.exports = mongoose.model('user', userSchema)