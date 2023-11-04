import React from "react";
import Logo from "../logo/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../theme/mode-toggle";
import Styles from "@/components/logo/Logo.module.css";

interface NavbarProps {
	login: boolean;
	signUp: () => void;
	handleLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ login, signUp, handleLogout }) => {
	return (
		<div className='flex items-center py-4 h-16 justify-between w-full md:px-28'>
			<div className='flex items-center'>
				<Logo />
				<div className='pt-2'>
					<p className={Styles.gradient_text}>ToDo App</p>
				</div>
			</div>
			<div className='flex items-center'>
				{login ? (
					<>
						<Button variant='destructive' className='mx-2 bg-red-600' onClick={handleLogout}>
							Logout
						</Button>
					</>
				) : (
					<Button variant='outline' className='mx-2' onClick={signUp}>
						Sign Up
					</Button>
				)}

				<ModeToggle />
			</div>
		</div>
	);
};

export default Navbar;
