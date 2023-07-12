import { useState } from "react";
import { TextInput } from "@mantine/core";
import { IconEdit, IconCircleCheck } from "@tabler/icons";
import { useMutation } from "react-query";
import { dataFetch } from "../../utils/helpers";
import { showNotification } from "../../utils/helpers";
import { updateProfileSuccess } from "../../actions/user";
import { useDispatch } from "react-redux";
import { UserDetailsBoxProps } from "./types";
import { mutations } from "../../utils/constants";

interface MutationParams {
	intendedUpdate: string;
	newValue: string;
}
const UserDetailsBox = (props: UserDetailsBoxProps): JSX.Element => {
	const [editOn, setEditOn] = useState(false);
	const [value, setValue] = useState<string>(props.value);
	const dispatch = useDispatch();

	const { mutate } = useMutation({
		mutationKey: mutations.updateProfilePOST + props.field,
		mutationFn: async ({ intendedUpdate, newValue }: MutationParams) => {
			let err = null;
			if (intendedUpdate == "name" && newValue.length > 60) {
				err = "Name must be at most 60 characters long";
			} else if (intendedUpdate == "name" && newValue.length == 0) {
				err = "Name cannot be empty";
			} else if (intendedUpdate == "college" && newValue.length < 3) {
				err = "College name must be at least 3 characters long";
			} else if (intendedUpdate == "college" && newValue.length > 100) {
				err = "College name must be at most 100 characters long";
			} else if (intendedUpdate == "contact" && newValue.length !== 10) {
				err = "Contact number must be 10 digits long";
			}

			if (err !== null) {
				showNotification("Oops", err, "error");
				throw new Error(err);
			}

			return dataFetch({
				user: props.user,
				url: "/api/user/profile",
				method: "POST",
				body: {
					intendedUpdate: intendedUpdate,
					newValue: newValue,
				},
			});
		},
		onSuccess: async (res) => {
			if (res.ok) {
				showNotification("Success", "Profile updated", "success");
				setEditOn(false);
				const data = await res.json();
				dispatch(updateProfileSuccess(data.message));
			} else {
				showNotification("Oops", "Something went wrong", "error");
			}
		},
	});
	const toggleEdit = () => {
		setEditOn(!editOn);
	};

	return (
		<div className="flex flex-col justify-between mt-[25px]">
			{/*Label part*/}
			<div className="flex items-center">
				<span className="font-body not-italic font-semibold text-[20px] leading-[24px] text-white">
					{props.field}
				</span>
				{props.editable && !editOn && (
					<IconEdit
						onClick={toggleEdit}
						className="ml-[8px] h-[24px] w-[24px] text-[#FFFFFF]"
					></IconEdit>
				)}
			</div>
			{/*Edit Box*/}
			<div className="flex items-end">
				{props.editable && editOn ? (
					<>
						<TextInput
							value={value}
							classNames={{
								input: "pt-[4px] pl-[6px] pb-[4px] pr-[4px] font-body not-italic font-normal text-[20px] leading-[24px] text-new-black rounded-[6.3px] backdrop-blur-[0.5px]",
							}}
							className="w-[470px] box-border bg-new-white border-[0.25px] border-solid border-[rgba(255,255,255,0.403)] mt-[10px] rounded-[6.3px]"
							variant="unstyled"
							defaultValue={props.value}
							placeholder={props.field}
							onChange={(e) => setValue(e.currentTarget.value)}
						/>
						<IconCircleCheck
							onClick={() =>
								mutate({
									intendedUpdate: props.field.toLowerCase(),
									newValue: value,
								})
							}
							className="h-[45px] ml-2 transition-all origin-center hover:scale-110 w-[45px] mb-[-3px]
                        text-[rgb(156,168,156)] hover:text-[rgb(177,193,177)] hover:cursor-pointer"
						></IconCircleCheck>
					</>
				) : (
					<span className="font-body not-italic font-normal text-[20px] leading-[24px] text-white mt-[5px]">
						{props.value}
					</span>
				)}
			</div>
		</div>
	);
};

export default UserDetailsBox;
