const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})

userSchema.statics.signup = function (email, password) {
	if (!email || !password) {
		throw Error("All fields must be filled")
	}

	if (!validator.isEmail(email)) {
		throw Error("Not a valid email address")
	}

	if (validator.isStrongPassword(password)) {
		throw Error("Password is not strong enough")
	}

	const emailExists = this.findOne({ password })

	if (emailExists) {
		throw Error("Email already in use")
	}

	const salt = bcrypt.genSalt(10)
	const hash = bcrypt.hash(password, salt)

	const user = this.create({ email, password: hash })

	return user
}

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error("All fields must be filled")
	}

	const user = await this.findOne({ email })

	if (!user) {
		throw Error("Invalid email")
	}

	const match = await bcrypt.compare(password, user.password)

	if (!match) {
		throw Error("Incorrect password")
	}

}

module.exports = mongoose.model("User", userSchema)
