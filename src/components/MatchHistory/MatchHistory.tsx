import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataFetch, getUser } from "../../utils/helpers";
import { useQuery } from "react-query";
import { queries } from "../../utils/constants";
import { Center, Loader } from "@mantine/core";
import Battles from "./Battles";
import { matchHistoryData } from "./types";

const MatchHistory = (): JSX.Element => {
	const [matchHistoryData, setMatchHistory] = useState<matchHistoryData>({
		matchHistory: [],
	});

	const user = getUser();

	const navigate = useNavigate();

	if (!user) {
		navigate("/login");
	}

	const { isLoading, isError, isSuccess } = useQuery({
		queryKey: queries.getMatchHistoryGET,
		queryFn: async () =>
			dataFetch({
				user: user,
				url: "/api/match/history",
			}),
		onSuccess: async (res) => {
			if (res && res.status === 200) {
				const data = await res.json();
				if (data.message != null) {
					setMatchHistory({
						matchHistory: data.message,
					});
				}
			}
		},
	});

	const matchesWon = matchHistoryData.matchHistory.filter((ele) => {
		if (ele.trophyChange > 0) {
			return true;
		}
		return false;
	}).length;

	const matchesDrawn = matchHistoryData.matchHistory.filter((ele) => {
		if (ele.trophyChange == 0) {
			return true;
		}
		return false;
	}).length;

	const matchesLost = matchHistoryData.matchHistory.filter((ele) => {
		if (ele.trophyChange < 0) {
			return true;
		}
		return false;
	}).length;

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
				<div className="relative h-screen w-full basis-[80%] flex flex-row bg-[rgba(0,0,0,0.424)] items-center justify-center font-heading">
					<div className=" relative bg-[rgba(0,0,0,0.4)] w-[68.5vw] h-[85%] flex flex-col items-center rounded-[32px] ">
						{/*Upper Portion*/}
						<div className=" relative flex flex-row items-center justify-evenly h-[20%] w-[100%]">
							<div className="text-white flex flex-col">
								<div className="text-center text-5xl font-bold mb-2">
									{matchHistoryData.matchHistory.length}
								</div>
								<div className="text-3xl">Total Matches</div>
							</div>
							<div className="text-white flex flex-col">
								<div className="text-center text-5xl font-bold mb-2">
									{matchesWon}
								</div>
								<div className="text-3xl">Matches Won</div>
							</div>
							<div className="text-white flex flex-col">
								<div className="text-center text-5xl font-bold mb-2">
									{matchesDrawn}
								</div>
								<div className="text-3xl">Matches Drawn</div>
							</div>
							<div className="text-white flex flex-col">
								<div className="text-center text-5xl font-bold mb-2">
									{matchesLost}
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
							<Battles matchHistoryData={matchHistoryData} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MatchHistory;
