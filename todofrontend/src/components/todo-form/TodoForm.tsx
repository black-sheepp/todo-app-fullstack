import React, { useState, ChangeEvent, useEffect } from "react";
import { format } from "date-fns";
import Styles from "@/components/todo-form/TodoForm.module.css";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

interface FormData {
	todoname: string;
	deadline: Date | null;
	level: "low" | "medium" | "high";
}

interface Todo {
	_id: string;
	todoname: string;
	task: boolean;
	deadline: string;
}

const TodoForm: React.FC<{ setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; id: string }> = ({
	setTodos,
	id,
}) => {
	const [formData, setFormData] = useState<FormData>({
		todoname: "",
		deadline: null,
		level: "medium",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleDateSelect = (newDate: Date) => {
		setFormData((prevData) => ({
			...prevData,
			deadline: newDate,
		}));
	};

	const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
		const level = e.target.value as "low" | "medium" | "high";
		setFormData((prevData) => ({
			...prevData,
			level,
		}));
	};

	const updateLocalStorage = async (_id: String) => {
		const response = await axios.get(`${BASE_URL}/${_id}/getTodos`);
		const todoList = response.data;
		localStorage.setItem("todos", JSON.stringify(todoList));
		setTodos(todoList); // Update the todos state immediately
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const dataString = localStorage.getItem("data");
			if (dataString) {
				const data = JSON.parse(dataString);
				const response = await axios.post<Todo>(`${BASE_URL}/${data._id}/createTodo`, formData);
				updateLocalStorage(data._id);
	
				setFormData({
					todoname: "",
					deadline: null,
					level: "medium",
				});
			} else {
				console.error("No data found in localStorage");
			}
		} catch (error) {
			console.error("An error occurred while creating a todo:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataString = localStorage.getItem("data");
				if (dataString) {
					const data = JSON.parse(dataString);
					const response = await axios.get<Todo[]>(`${BASE_URL}/${data._id}/getTodos`);
					const todoList = response.data;
					localStorage.setItem("todos", JSON.stringify(todoList));
					setTodos(todoList); // Update the todos immediately
				} else {
					console.error("No data found in localStorage");
				}
			} catch (error) {
				console.error("An error occurred while fetching and saving todos:", error);
			}
		};
		fetchData();
	}, [setTodos]);
	

	return (
		<form className='flex flex-col justify-center' onSubmit={handleSubmit}>
			<input
				name='todoname'
				type='text'
				placeholder='Create a New ToDo..'
				className={Styles.input}
				value={formData.todoname}
				onChange={handleInputChange}
				required
			/>
			<div className='m-0'>
				<div className='flex flex-col justify-between'>
					<div>
						<label className='mr-2'>
							<input
								type='radio'
								name='level'
								value='low'
								checked={formData.level === "low"}
								onChange={handleRadioChange}
								className='mr-1'
							/>
							Low
						</label>
						<label className='mr-2'>
							<input
								type='radio'
								name='level'
								value='medium'
								checked={formData.level === "medium"}
								onChange={handleRadioChange}
								className='mr-1'
							/>
							Medium
						</label>
						<label className='mr-2'>
							<input
								type='radio'
								name='level'
								value='high'
								checked={formData.level === "high"}
								onChange={handleRadioChange}
								className='mr-1'
							/>
							High
						</label>
					</div>

					<div className='my-2 flex justify-between'>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[280px] justify-start text-left font-normal",
										!formData.deadline && "text-muted-foreground"
									)}>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{formData.deadline ? (
										format(formData.deadline, "PPP")
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={formData.deadline}
									onSelect={handleDateSelect}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<button
							type='submit'
							className='bg-[#bc00dd] text-white px-4 py-2 rounded-lg w-min self-center'>
							Create
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default TodoForm;
