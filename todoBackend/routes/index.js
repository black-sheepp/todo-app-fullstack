const router = require("express").Router();

const userController = require("../controller/user");
const todoController = require("../controller/todo");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.get("/logout", userController.logout);

router.post("/:id/createTodo", todoController.createToDo);
router.get("/:id/getTodos",todoController.getTodosByUserId);
router.delete("/:id/delete", todoController.deleteToDo);
router.post("/:id/markasdone",todoController.markAsDone);

module.exports = router;
