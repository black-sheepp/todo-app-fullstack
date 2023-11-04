const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Create a Mongoose schema for a user
const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter a name"],
		},
		email: {
			type: String,
			required: [true, "Please enter an email address"],
			unique: true,
			trim: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Please enter a valid email address",
			],
		},
		password: {
			type: String,
			required: [true, "Please enter a valid password"],
			minLength: [6, "Please enter a valid password with at least 6 characters"],
		},
		todo: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Todo", // Reference to the TodoSchema
			},
		],
	},
	{
		timestamps: true,
	}
);

// Encrypt the password before saving it to the database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next(); // If the password hasn't changed, move to the next middleware
	}
	// Hash the password using bcrypt
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(this.password, salt);
	this.password = hashPassword; // Set the hashed password
	next(); // Move to the next middleware
});

// Create a Mongoose model from the schema and export it
const User = mongoose.model("User", userSchema);
module.exports = User;
