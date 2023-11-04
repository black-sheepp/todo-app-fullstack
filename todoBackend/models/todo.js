const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	todoname: {
		type: String,
		required: true,
	},
	deadline: {
		type: String,
		default: "",
	},
	level: {
		type: String,
		enum: ["low", "medium", "high"],
		default: "medium",
	},
	task: {
		type: Boolean,
		default: false,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
