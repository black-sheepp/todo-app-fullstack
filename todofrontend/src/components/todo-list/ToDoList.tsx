import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080";
interface Todo {
	level: string;
	_id: string;
	todoname: string;
	task: boolean;
	deadline: string;
}

interface ToDoListProps {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, setTodos }) => {
	const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	const updateLocalStorage = async () => {
		const dataString = localStorage.getItem("data");
		if (dataString) {
			const data = JSON.parse(dataString);
			// console.log("-----data : ", data);
			const response = await axios.get(`${BASE_URL}/${data._id}/getTodos`);
			const todoList = response.data;
			localStorage.setItem("todos", JSON.stringify(todoList));
			setTodos(todoList);
		} else {
			console.error("No data found in localStorage");
		}
	};

	const handleTodoDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const _id = e.currentTarget.value;
		try {
			await axios.delete(`${BASE_URL}/${_id}/delete`);
			updateLocalStorage();
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};

	const handleTodoDone = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const _id = e.currentTarget.value;
		try {
			await axios.post(`${BASE_URL}/${_id}/markasdone`, true);
			updateLocalStorage();
		} catch (error) {
			console.error("Error marking todo as done:", error);
		}
	};

	const fetchData = () => {
		const storedDataString = localStorage.getItem("todos");

		if (storedDataString) {
			try {
				const storedParsedData = JSON.parse(storedDataString);
				const active = storedParsedData.todos.filter((todo: Todo) => !todo.task);
				const completed = storedParsedData.todos.filter((todo: Todo) => todo.task);
				setActiveTodos(active);
				setCompletedTodos(completed);
			} catch (error) {
				console.error("Error parsing data from localStorage:", error);
			}
		} else {
			console.log("Data does not exist in localStorage.");
		}
	};

	useEffect(() => {
		fetchData();
	}, [todos]);

	return (
		<div className='flex flex-col justify-center w-full px-2 md:px-28 lg:grid grid-cols-2 gap-12'>
			<div className='w-full'>
				<h1 className='text-2xl font-semibold text-green-500 text-center'>Active Task</h1>
				<ul>
					{activeTodos.length > 0 &&
						activeTodos.map((item) => (
							<li key={item._id}>
								<div className='w-auto bg-yellow-100 rounded-xl px-6 py-2 m-1 text-xl dark:bg-gray-900'>
									<p>{item.todoname}</p>
									<div className='flex justify-between'>
										<div className='flex text-black'>
											<button
												className='bg-red-600 mt-2 mr-2 px-2 py-1 rounded-lg text-sm text-white h-8'
												onClick={handleTodoDelete}
												value={item._id}>
												Delete
											</button>
											<button
												className='bg-green-500 mt-2 px-2 py-1 rounded-lg text-sm h-8'
												onClick={handleTodoDone}
												value={item._id}>
												Done
											</button>
										</div>
										<div>
											<button className='mt-2 px-2 py-1 rounded-lg text-sm cursor-text h-8 text-[#bc00dd]'>
												{item.level}
											</button>
											<button className='mt-2 px-2 py-1 rounded-lg text-sm cursor-text text-red-500 h-8'>
												{item.deadline}
											</button>
										</div>
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>
			<div className='w-full'>
				<h1 className='text-2xl font-semibold text-red-500 text-center'>Task Completed</h1>
				<ul>
					{completedTodos.length > 0 &&
						completedTodos.map((item) => (
							<li key={item._id}>
								<div className='w-full bg-red-100 rounded-xl px-6 py-2 m-1 text-xl dark:bg-blue-950 text-green-500'>
									<p>{item.todoname}</p>
									<div className='flex justify-between'>
										<div className='flex text-black'>
											<button
												className='bg-red-600 mt-2 mr-2 px-2 py-1 rounded-lg text-sm text-white h-8'
												onClick={handleTodoDelete}
												value={item._id}>
												Delete
											</button>
										</div>
										<div>
											<button className='mt-2 px-2 py-1 rounded-lg text-sm cursor-text h-8 text-[#bc00dd]'>
												{item.level}
											</button>
											<button className='mt-2 px-2 py-1 rounded-lg text-sm cursor-text text-red-500 h-8'>
												{item.deadline}
											</button>
										</div>
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default ToDoList;
