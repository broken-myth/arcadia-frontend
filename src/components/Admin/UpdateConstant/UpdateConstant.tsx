import { useState } from "react";
import EditConstantsBox from "./EditConstantsBox";
import { Mutations, Queries } from "../../../utils/constants";
import { useMutation, useQuery } from "react-query";
import { dataFetch, getUser, showNotification } from "../../../utils/helpers";
import { Center, Loader, Button } from "@mantine/core";
import { ConstantsType } from "./types";

const UpdateConstants = () => {
	const [constants, setConstants] = useState<ConstantsType[]>([]);
	const admin = getUser();

	const { isLoading, isError, isSuccess } = useQuery({
		queryKey: Queries.getConstantsGET,
		queryFn: async () =>
			dataFetch({
				user: admin,
				url: "/api/admin/constants",
			}),
		onSuccess: async (res) => {
			const data = await res.json();
			if (res && res.status == 200) {
				setConstants(data);
			} else {
				showNotification("Oops", data.message, "error");
			}
		},
	});

	const { mutate } = useMutation({
		mutationKey: Mutations.updateRedisPATCH,
		mutationFn: async () =>
			dataFetch({
				user: admin,
				url: "/api/admin/updateRedis",
				method: "PATCH",
				body: {},
			}),
		onSuccess: async (res) => {
			if (res.status == 200) {
				showNotification("Success", "Redis Updated", "success");
			} else {
				showNotification("Oops", "Some Error occured, Try Agan", "error");
			}
		},
	});

	return (
		<>
			{isLoading && (
				<Center className="h-full w-full">
					<Loader color="violet" />
				</Center>
			)}
			{isError && (
				<Center className="h-full w-full">
					<h1 className="text-4xl font-bold text-gray-800">
						Something went wrong
					</h1>
				</Center>
			)}
			{isSuccess && (
				<div className="flex items-center justify-center ">
					<div className="text-new-white w-[100%] ">
						<div className="w-4/5 bg-grey backdrop-blur-md rounded-xl relative m-auto p-[30px] ">
							<h1 className="text-3xl text-center">Update Constants</h1>
							<div className="grid grid-cols-2">
								{constants.map(function (
									ele: ConstantsType,
									idx: number
								) {
									return (
										<EditConstantsBox
											key={idx}
											editable={true}
											field={ele.name}
											value={ele.value}
											constants={constants}
											setConstants={setConstants}
											idx={idx}
											admin={admin}
										/>
									);
								})}
							</div>
							<Button
								className="mt-10 m-auto"
								onClick={() => {
									mutate();
								}}
							>
								Update Redis
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UpdateConstants;
