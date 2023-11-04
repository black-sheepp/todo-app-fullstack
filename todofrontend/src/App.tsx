import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "./components/navbar/Navbar";
import TodoForm from "./components/todo-form/TodoForm";
import ToDoList from "./components/todo-list/ToDoList";
import SignUp from "./components/signup/SignUp";
import Home from "./components/home/Home";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

interface Todo {
	_id: string;
	todoname: string;
	task: boolean;
	deadline: string;
}

function App() {
	const [login, setLogin] = useState(false);
	const [signUp, setSignUp] = useState(false);
	const [id, setId] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	const signUpHandler = async () => {
		setSignUp(true);
		const response = await axios.get<Todo[]>(`${BASE_URL}/${id}/getTodos`);
		const todoList = response.data;
		localStorage.setItem("todos", JSON.stringify(todoList));
		setTodos(todoList);
	};

	const updateLogin = async () => {
		setLogin(true);
		setSignUp(false);
		const data = localStorage.getItem("data");
		const jsondata = JSON.parse(data);
		const id = jsondata._id;
		setId(id);
		const response = await axios.get<Todo[]>(`${BASE_URL}/${id}/getTodos`);
		const todoList = response.data;
		localStorage.setItem("todos", JSON.stringify(todoList));
		setTodos(todoList);
	};

	const handleLogout = async () => {
		await localStorage.setItem("data", "");
		setLogin(false);
		localStorage.setItem("todos", JSON.stringify([]));
		setTodos([]);
	};

	useEffect(() => {
		const dataString = localStorage.getItem("data");
		if (dataString) {
			try {
				const data = JSON.parse(dataString);
				setId(data._id);
				updateLogin(); // Call updateLogin to set the todos immediately
			} catch (error) {
				console.error("Error parsing data:", error);
			}
		} else {
			console.error("No data found in localStorage");
			setLogin(false);
		}
	}, [login]);

	useEffect(() => {
		const storedTodosString = localStorage.getItem("todos");
		if (storedTodosString) {
			try {
				const storedTodos = JSON.parse(storedTodosString);
				setTodos(storedTodos);
			} catch (error) {
				console.error("Error parsing todos from localStorage:", error);
			}
		}
	}, []);

	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<Navbar login={login} signUp={signUpHandler} handleLogout={handleLogout} />
			{signUp ? (
				<div className='flex justify-center p-20'>
					<SignUp updateLogin={updateLogin} />
				</div>
			) : login ? (
				<>
					<div className='flex justify-center pt-12'>
						<div className='mx-2'>
							<TodoForm setTodos={setTodos} id={id} />
						</div>
					</div>
					<div className='mt-10 flex justify-center'>
						<ToDoList todos={todos} setTodos={setTodos} />
					</div>
				</>
			) : (
				<Home updateLogin={updateLogin}/>
			)}
		</ThemeProvider>
	);
}

export default App;
