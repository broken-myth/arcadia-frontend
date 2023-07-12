import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataFetch, getUser } from "../../utils/helpers";
import { useMutation } from "react-query";
import { mutations } from "../../utils/constants";
import { Button, Select, TextInput } from "@mantine/core";
import { showNotification } from "../../utils/helpers";
const validate = ({
	username,
	contact,
	college,
}: {
	username: string | null;
	contact: string | null;
	college: string | null;
}) => {
	if (username == null || contact == null || college == null) {
		return "Please fill all the fields";
	}

	if (username.length < 3)
		return "Username must be at least 3 characters long";

	if (username.length > 20)
		return "Username must be at most 20 characters long";

	if (contact.length !== 10) return "Contact number must be 10 digits long";

	if (college.length < 3)
		return "College name must be at least 3 characters long";

	if (college.length > 100)
		return "College name must be at most 100 characters long";

	return null;
};

const Signup = () => {
	const [username, setUsername] = useState<string | null>(null);
	const [contact, setContact] = useState<string | null>(null);
	const [college, setCollege] = useState<string | null>(null);
	const navigate = useNavigate();
	const user = getUser();

	const { mutate } = useMutation({
		mutationKey: mutations.signupPOST,
		mutationFn: () => {
			const err = validate({ username, contact, college });
			if (err !== null) {
				showNotification("Oops", err, "error");
				throw new Error(err);
			}
			return dataFetch({
				url: "/api/user/signup/complete",
				method: "POST",
				user: user,
				body: {
					username,
					contact,
					college,
				},
			});
		},
		onSuccess: async (res) => {
			if (res.status === 200) {
				showNotification("Success", "Signup complete", "success");
				navigate("/game");
			} else {
				showNotification("Oops", "Something went wrong", "error");
				showNotification(
					"Contact Details",
					"Make sure the phone number isn't already registered",
					"info"
				);
			}
		},
	});

	if (!user.userToken) {
		navigate("/login");
	}

	return (
		<div className="h-[100vh] w-[100vw] bg-signup-bg bg-no-repeat bg-cover bg-center bg-fixed flex items-center justify-center ">
			<div className="w-2/5 bg-grey backdrop-blur-md rounded-xl relative">
				<h2 className="mt-16 mb-10 text-center text-white font-heading text-6xl font-extrabold">
					Almost there...
				</h2>
				<p className="mx-[9.5vw] mb-8 text-white font-heading">
					Before we begin, we require some additional information about you
				</p>
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
						type="tel"
						size="md"
						placeholder="Phone Number"
						name="Phone Number"
						label={
							<label className="mb-2 font-heading text-white font-bold">
								Enter Phone Number
							</label>
						}
						required
						withAsterisk
						onChange={(e) => setContact(e.target.value)}
					/>
				</div>

				<div className="z-10 mb-5 mt-5 mx-[9.5vw] flex flex-col">
					<Select
						size="md"
						placeholder="College Name"
						required
						withAsterisk
						label={
							<label className="mb-2 font-heading text-white font-bold">
								Select College
							</label>
						}
						data={[
							{ value: "college1", label: "college1" },
							{ value: "college2", label: "college2" },
							{ value: "college3 ", label: "college3" },
							{ value: "college4", label: "college4" },
						]}
						value={college}
						onChange={(e) => setCollege(e)}
					/>
				</div>
				<div className="pb-10 w-full flex flex-row justify-center items-center">
					<Button
						onClick={() => {
							mutate();
						}}
					>
						Continue
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Signup;
