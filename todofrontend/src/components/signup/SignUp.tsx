import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

interface SignUpProps {
	updateLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ updateLogin }) => {
	const [form, setForm] = useState<{ name?: string; email?: string; password?: string }>({});

	const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${BASE_URL}/sign-up`, form);

			if (response.status === 200) {
				// Store the data in localStorage
				localStorage.setItem("data", JSON.stringify(response.data));
				console.log("Data stored in localStorage:", response.data);
				updateLogin();
			} else {
				console.error("Request failed with status:", response.status);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div>
			<div className='max-w-md relative flex flex-col p-4 rounded-md text-black bg-white'>
				<div className='text-2xl font-bold mb-2 text-[#1e0e4b] text-center'>
					Create an Account to <span className='text-[#bc00dd]'>ToDo App</span>
				</div>
				<div className='text-sm font-normal mb-4 text-center text-[#1e0e4b]'>Sign Up for free</div>
				<form className='flex flex-col gap-3' onSubmit={handleSubmit}>
					<div className='block relative'>
						<label
							htmlFor='name'
							className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2'>
							Name
						</label>
						<input
							onChange={handleForm}
							type='text'
							id='name'
							name='name'
							className='rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0'
						/>
					</div>
					<div className='block relative'>
						<label
							htmlFor='email'
							className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2'>
							Email
						</label>
						<input
							onChange={handleForm}
							type='text'
							id='email'
							name='email'
							className='rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0'
						/>
					</div>
					<div className='block relative'>
						<label
							htmlFor='password'
							className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2'>
							Password
						</label>
						<input
							onChange={handleForm}
							type='password'
							id='password'
							name='password'
							className='rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0'
						/>
					</div>
					<button
						type='submit'
						className='bg-[#bc00dd] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal'>
						Submit
					</button>
				</form>
				<div className='text-sm text-center mt-[1.6rem]'>
					Already have an account ?{" "}
					<a className='text-sm text-[#bc00dd]' href='#'>
						Please, Sign In!
					</a>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
