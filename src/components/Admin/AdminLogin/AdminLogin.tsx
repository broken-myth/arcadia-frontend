import { useState } from "react";
import { useMutation } from "react-query";
import { mutations } from "../../../utils/constants";
import { Button, TextInput } from "@mantine/core";
import { showNotification } from "../../../utils/helpers";
import { BACKEND_URL } from "../../../../config";
import { useDispatch } from "react-redux";
import { storeUserToken } from "../../../actions/user";

const AdminLogin = (props: AdminLoginType) => {
	const [username, setUsername] = useState<string | null>(null);
	const [password, setPassword] = useState<string | null>(null);

	const dispatch = useDispatch();

	const { mutate } = useMutation({
		mutationKey: mutations.adminLoginPOST,
		mutationFn: async () => {
			return fetch(BACKEND_URL + "/api/admin/login", {
				method: "POST",
				body: JSON.stringify({
					username: username,
					password: password,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}).then((response) => response.json());
		},
		onSuccess: async (res) => {
			if (res.status_code === 200) {
				showNotification("Success", "Login complete", "success");
				dispatch(
					storeUserToken({
						userToken: res.message,
					})
				);
				props.setLoggedIn(true);
			} else {
				showNotification("Oops", res.message, "error");
			}
		},
	});

	return (
		<div className="h-[100vh] w-[100vw] bg-signup-bg bg-no-repeat bg-cover bg-center bg-fixed flex items-center justify-center ">
			<div className="w-2/5 bg-grey backdrop-blur-md rounded-xl relative">
				<h2 className="mt-16 mb-10 text-center text-white font-heading text-6xl font-extrabold">
					Admin Login
				</h2>
				<div className="z-10 mb-5 mt-5 mx-[9.5vw]  flex flex-col">
					<TextInput
						type="text"
						size="md"
						placeholder="Username"
						name="username"
						required
						withAsterisk
						label={
							<label className="mb-2 font-heading text-white font-bold">
								Enter Username
							</label>
						}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className="z-10 mb-5 mt-5 mx-[9.5vw] flex flex-col">
					<TextInput
						type="text"
						size="md"
						placeholder="Password"
						name="Password"
						label={
							<label className="mb-2 font-heading text-white font-bold">
								Enter Password
							</label>
						}
						required
						withAsterisk
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="pb-10 w-full flex flex-row justify-center items-center">
					<Button
						onClick={() => {
							mutate();
						}}
					>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AdminLogin;
