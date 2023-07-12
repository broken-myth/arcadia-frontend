import { useEffect, useState } from "react";
import { getUser } from "../../utils/helpers";
import {
	AdminLogin,
	AdminNavbar,
	UpdateConstant,
	AdminDashboard,
} from "../../components";

const Admin = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [panel, setPanel] = useState<string>("");
	const admin = getUser();

	useEffect(() => {
		if (!admin) {
			setLoggedIn(false);
		} else {
			setLoggedIn(true);
		}
	}, []);

	return (
		<>
			<main className="w-[100vw] min-h-full h-[100%] bg-signup-bg bg-no-repeat bg-cover bg-center bg-fixed ">
				<>
					{!loggedIn ? (
						<AdminLogin setLoggedIn={setLoggedIn} />
					) : (
						<>
							<AdminNavbar setPanel={setPanel} />
							{(() => {
								switch (panel) {
									case "Update Constants":
										return <UpdateConstant />;
									default:
										return (
											<AdminDashboard setLoggedIn={setLoggedIn} />
										);
								}
							})()}
						</>
					)}
				</>
			</main>
		</>
	);
};

export default Admin;
