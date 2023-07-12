import { useState } from "react";
import { TextInput } from "@mantine/core";
import { IconEdit, IconCircleCheck } from "@tabler/icons";
import { useMutation } from "react-query";
import { mutations } from "../../../utils/constants";
import { dataFetch, showNotification } from "../../../utils/helpers";
import { EditConstantsBoxType } from "./types";

const EditConstantsBox = (props: EditConstantsBoxType): JSX.Element => {
	const [editOn, setEditOn] = useState(false);
	const [value, setValue] = useState<string>(props.value);

	const toggleEdit = () => {
		setEditOn(!editOn);
	};

	const { mutate } = useMutation({
		mutationKey: mutations.updateConstantsPOST,
		mutationFn: async () =>
			dataFetch({
				user: props.admin,
				url: "/api/admin/updateConstants",
				method: "POST",
				body: {
					name: props.field,
					newValue: Number(value),
				},
			}),
		onSuccess: async (res) => {
			const data = await res.json();
			if (res.status === 200) {
				setEditOn(false);
				showNotification("Success", "Constant Updated", "success");
				const newConstants = [...props.constants];
				newConstants[props.idx].value = value;
				props.setConstants(newConstants);
			} else {
				showNotification("Oops", data.message, "error");
			}
		},
	});

	return (
		<div className="flex flex-col justify-between mt-[25px] hover:bg-[rgba(240,240,240,0.3)] rounded-[6.3px] p-[5px]">
			{/*Label part*/}
			<div className="flex items-center">
				<span className="font-body not-italic font-semibold text-[20px] leading-[24px]">
					{"-> " + props.field}
				</span>
				{props.editable && !editOn && (
					<IconEdit
						onClick={toggleEdit}
						className="ml-[8px] h-[24px] w-[24px] hover:cursor-pointer hover:scale-110"
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
							onClick={() => {
								mutate();
							}}
							className="h-[45px] ml-2 transition-all origin-center hover:scale-110 w-[45px] mb-[-3px]
                        text-[rgb(156,168,156)] hover:text-[rgb(177,193,177)] hover:cursor-pointer"
						></IconCircleCheck>
					</>
				) : (
					<span className="font-body not-italic font-normal text-[20px] leading-[24px] mt-[5px] ml-[20px]">
						{props.value}
					</span>
				)}
			</div>
		</div>
	);
};

export default EditConstantsBox;
