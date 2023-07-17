import { useState } from "react";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { useQuery } from "react-query";
import { Center, Loader } from "@mantine/core";
import { Queries } from "../../utils/constants";

const EachBattle = (props: { battleID: number }) => {
	const [matchDetailsData, setMatchDetails] = useState({
		matchID: 0,
		opponentID: 0,
		opponentUsername: "",
		matchType: "",
		trophyChange: 0,
	});
	const user = getUser();

	const { isLoading, isError, isSuccess } = useQuery({
		queryKey: [Queries.getMatchDetailsGET, props.battleID],
		queryFn: async () =>
			dataFetch({
				user: user,
				url: "/api/match/" + props.battleID,
			}),
		onSuccess: async (res) => {
			const data = await res.json();
			if (res && res.status === 200) {
				setMatchDetails(data);
			} else {
				showNotification("Error", data.message, "error");
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
				<div className=" h-full basis-4/6">
					<div className="flex flex-col justify-evenly items-center h-[55%] w-full">
						<div className="flex flex-row justify-evenly w-full my-auto h-[60%]">
							<div className="flex flex-col text-center">
								<img
									src="/assets/images/userImg.webp"
									className={`object-scale-down h-48 border-[10px] border-solid rounded-[50%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
										matchDetailsData.trophyChange > 0
											? "border-violet"
											: "border-white"
									} `}
									alt=""
								/>
								<div className="font-bold text-xl text-white mt-5">
									{user.username}
								</div>
							</div>

							<img
								src="/assets/images/battle.webp"
								alt=""
								className="object-scale-down h-16 mt-16"
							/>

							<div className="flex flex-col text-center">
								<img
									src="/assets/images/dummyImg.webp"
									className={`object-scale-down h-48 border-[10px] border-solid rounded-[50%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
										matchDetailsData.trophyChange < 0
											? "border-violet"
											: "border-white"
									} `}
									alt=""
								/>
								<div className="font-bold text-xl text-white mt-5">
									{matchDetailsData.opponentUsername}
								</div>
							</div>
						</div>
					</div>
					<div className="h-[45%] flex justify-center">
						<div className="flex flex-col mt-16">
							<div className="text-white text-3xl ml-10">
								Trophies{" "}
								<b
									className={`ml-24 ${
										matchDetailsData.trophyChange < 0
											? "text-red-500"
											: "text-white"
									} `}
								>
									{matchDetailsData.trophyChange <= 0 ? "" : "+"}
									{matchDetailsData.trophyChange}
								</b>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EachBattle;
