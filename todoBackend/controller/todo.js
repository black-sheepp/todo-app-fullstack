const Todo = require("../models/todo");
const User = require("../models/user");

module.exports.createToDo = async function (req, res) {
	const { id } = req.params;
	const { todoname, deadline, level } = req.body;

	try {
		const user = await User.findById(id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const newTodo = await Todo.create({
			todoname: todoname,
			deadline: deadline,
			level: level,
			user: user._id,
		});

		res.status(201).json({ message: "Todo created successfully", todo: newTodo });
	} catch (error) {
		console.error("Error creating todo:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports.getTodosByUserId = async function (req, res) {
	const { id } = req.params;

	try {
		const todos = await Todo.find({ user: id });
		res.status(200).json({ todos });
	} catch (error) {
		console.error("Error fetching todos:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};


module.exports.deleteToDo = async function(req,res){
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.markAsDone = async function(req,res){
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, {
            task: true,
        }, { new: true }); 

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo Marked successfully", todo });
    } catch (error) {
        console.error("Error marking todo as done:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
