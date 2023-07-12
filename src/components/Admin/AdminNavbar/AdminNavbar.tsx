import { useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/user";

const navbarEntities = ["Update Constants"];

const AdminNavbar = (props: AdminNavbarType) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<>
			<nav className="h-[100px] navbar-gradient bg-opacity-45 grid grid-rows-1 grid-cols-2 items-center py-5 px-10 w-full font-heading">
				<div className="flex flex-row gap-3 items-center">
					{navbarEntities.map(function (ele: string, idx: number) {
						return (
							<>
								<div
									className="p-[5px] text-white text-xl hover:cursor-pointer"
									onClick={() => {
										props.setPanel(ele);
									}}
								>
									{ele}
								</div>
								{idx != navbarEntities.length - 1 && (
									<div className="text-white text-xl">|</div>
								)}
							</>
						);
					})}
				</div>

				<div className="flex flex-row justify-self-end items-center gap-3">
					<div className="text-white font-medium justify-self-center text-xl">
						<span className="text-white font-bold">Admin Panel</span>
					</div>
					<IconLogout
						color="white"
						width={50}
						height={50}
						onClick={() => {
							navigate("/");
							dispatch(logout());
						}}
						className="hover:opacity-50 hover:cursor-pointer transition"
					/>
				</div>
			</nav>
		</>
	);
};

export default AdminNavbar;
