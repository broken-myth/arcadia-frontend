import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { useQuery } from "react-query";
import { Queries } from "../../utils/constants";
import { Center, Loader } from "@mantine/core";
import Battles from "./Battles";
import { MatchHistoryType } from "./types";

const MatchHistory = (): JSX.Element => {
	const [matchHistory, setMatchHistory] = useState<MatchHistoryType[] | null>(
		null
	);

	const user = getUser();

	const navigate = useNavigate();

	if (!user) {
		navigate("/login");
	}

	const { isLoading, isError, isSuccess } = useQuery({
		queryKey: Queries.getMatchHistoryGET,
		queryFn: async () =>
			dataFetch({
				user: user,
				url: "/api/match/history",
			}),
		onSuccess: async (res) => {
			const data = await res.json();
			if (res && res.status === 200) {
				setMatchHistory(data);
			} else {
				showNotification("Error", data.message, "error");
			}
		},
	});

	return (
		<>
			{isLoading && (
				<Center className="h-full w-full bg-[rgba(0,0,0,0.424)]">
					<Loader color="violet" />
				</Center>
			)}
			{isError && (
				<Center className="h-full w-full bg-[rgba(0,0,0,0.424)]">
					<h1 className="text-4xl font-heading font-bold text-gray-100">
						Something went wrong
					</h1>
				</Center>
			)}
			{matchHistory == null && (
				<Center className="h-full w-full bg-[rgba(0,0,0,0.424)]">
					<h1 className="text-4xl font-heading font-bold text-gray-100">
						No Matches
					</h1>
				</Center>
			)}
			{matchHistory !== null && isSuccess && (
				<div className="relative h-screen w-full basis-[80%] flex flex-row bg-[rgba(0,0,0,0.424)] items-center justify-center font-heading">
					<div className=" relative bg-[rgba(0,0,0,0.4)] w-[68.5vw] h-[85%] flex flex-col items-center rounded-[32px] ">
						{/*Upper Portion*/}
						<div className=" relative flex flex-row items-center justify-evenly h-[20%] w-[100%]">
							<div className="text-white flex flex-col">
								<div className="text-center text-5xl font-bold mb-2">
									{matchHistory.length}
								</div>
								<div className="text-3xl">Total Matches</div>
							</div>
							<div className="text-white flex flex-col">
								<div className="text-center text-5xl font-bold mb-2">
									{
										matchHistory.filter((ele) => ele.trophyChange > 0)
											.length
									}
								</div>
								<div className="text-3xl">Matches Won</div>
							</div>
							<div className="text-white flex flex-col">
								<div className="text-center text-5xl font-bold mb-2">
									{
										matchHistory.filter(
											(ele) => ele.trophyChange == 0
										).length
									}
								</div>
								<div className="text-3xl">Matches Drawn</div>
							</div>
							<div className="text-white flex flex-col">
								<div className="text-center text-5xl font-bold mb-2">
									{
										matchHistory.filter((ele) => ele.trophyChange < 0)
											.length
									}
								</div>
								<div className="text-3xl">Matches Lost</div>
							</div>
						</div>
						{/*Lower Portion */}
						<div
							className="relative w-full flex flex-row items-center 
								h-[80%] border-solid border-t
								border-[rgba(255,255,255,0.4)]"
						>
							<Battles matchHistoryData={matchHistory} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MatchHistory;
