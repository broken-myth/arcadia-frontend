import React from "react";
import { IconCategory2, IconLogout, IconHelp } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { getUser } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/user";

const Navbar: React.FC = () => {
	const user = getUser();

	if (!user) {
		return null;
	}

	const dispatch = useDispatch();

	return (
		<nav className="navbar-gradient bg-opacity-5 grid grid-rows-1 grid-cols-3 items-center py-5 px-10 absolute top-0 left-0 w-full font-heading">
			<div className="flex flex-row gap-3 items-center">
				<img
					src={`/assets/images/characters/avatars/${user.characterURL}`}
					alt="User Profile Picture"
					className="rounded-full w-14 h-14 border-4 border-solid justify-self-center"
				/>
				<p className="text-white justify-self-start text-lg font-bold">
					{user.username}
				</p>
			</div>
			<p className="text-white font-medium justify-self-center text-xl">
				{user.xp}
				<span className="text-white font-bold">XP</span>
			</p>
			<div className="flex flex-row justify-self-end gap-3">
				<Link to="profile">
					<IconCategory2
						color="white"
						width={50}
						height={50}
						className="hover:opacity-50 hover:cursor-pointer transition"
					/>
				</Link>
				<Link to="howto">
					<IconHelp
						color="white"
						width={50}
						height={50}
						className="hover:opacity-50 hover:cursor-pointer transition"
					/>
				</Link>
				<IconLogout
					color="white"
					width={50}
					height={50}
					onClick={() => dispatch(logout())}
					className="hover:opacity-50 hover:cursor-pointer transition"
				/>
			</div>
		</nav>
	);
};

export default Navbar;
