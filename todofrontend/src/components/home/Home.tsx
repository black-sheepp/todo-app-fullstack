import React from "react";
import SignIn from "../signin/SignIn";

interface HomeProps {
	updateLogin: () => void;
}

const Home: React.FC<HomeProps> = ({ updateLogin }) => {
	return (
		<div className='w-full py-10 flex flex-col justify-center'>
			<h1 className='text-4xl font-semibold p-4 text-[#bc00dd] text-center'>Welcome to ToDo App</h1>
			<p className='text-xl text-center px-32 mx-32'>
				Embrace the power of productivity with our Todo App! Organize your life, one task at a time. Stay
				focused, stay motivated, and watch your dreams turn into achievements. Let's make every day a step
				closer to your goals. Start now and seize your day with purpose!
			</p>
			<p className='text-2xl text-[#bc00dd] text-center mt-10'>Please Login</p>
			<div className='mt-4 flex self-center'>
				<SignIn updateLogin={updateLogin} />
			</div>
		</div>
	);
};

export default Home;
