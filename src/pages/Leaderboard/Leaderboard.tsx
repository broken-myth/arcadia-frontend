/* eslint-disable indent */
import { useState } from "react";
import { LeaderboardElement, PositionBadge } from "../../components";
import { useQuery } from "react-query";
import {
	dataFetch,
	getTopThree,
	getUser,
	showNotification,
} from "../../utils/helpers";
import { Center, Loader } from "@mantine/core";
import {
	IconArrowLeft,
	IconArrowRight,
	IconSquareRoundedArrowLeft,
} from "@tabler/icons-react";
import { Queries } from "../../utils/constants";
import { Link } from "react-router-dom";
import { Player } from "./types";

const Leaderboard = () => {
	// States
	const [page, setPage] = useState<number>(1);

	const user = getUser();

	// Functions
	const nextPage = () => {
		if (data && data.pages) {
			setPage((prevState) => Math.min(prevState + 1, data.pages));
		}
	};
	const previousPage = () => {
		setPage((prevState) => Math.max(prevState - 1, 0));
	};

	// Data Fetching
	const { isError, isFetching, data } = useQuery({
		queryKey: [Queries.getLeaderBoardGET, page],
		queryFn: async () => {
			const res = await dataFetch({
					url: `/api/leaderboard/${page}`,
					user,
				}),
				data = await res.json();

			if (res && res.status === 200) {
				if (!Array.isArray(data.leaderboard)) {
					showNotification("Oops", data.message, "error");
				} else {
					return data;
				}
			} else {
				showNotification("Oops", data.message, "error");
			}
		},
		keepPreviousData: true,
		cacheTime: 1000 * 60 * 1,
		staleTime: 1000 * 60 * 1,
	});

	if (!data || !data.leaderboard) {
		return (
			<Center className="h-full w-full">
				{isError && <p>Error Occured</p>}
				{isFetching && <Loader color="violet" />}
			</Center>
		);
	}

	const topThree = getTopThree(data.leaderboard);

	return (
		<main className="w-full min-h-screen bg-new-black pt-10 md:pt-20 pb-14 px-5 md:px-10">
			<h1 className="font-display uppercase text-white text-center tracking-[0.34em] text-[1.15rem] md:text-5xl">
				Leaderboard
			</h1>
			<Center>
				<Link
					className="text-new-white mt-5 transition-all hover:opacity-50 hover:cursor-pointer hover:tracking-wider font-heading flex flex-row items-center"
					to="/"
				>
					<IconSquareRoundedArrowLeft
						color="#F5F5F5"
						className="mr-2"
						stroke={1}
						size={30}
					/>
					<span>Back to Home</span>
				</Link>
			</Center>
			{data && data.leaderboard != null ? (
				<>
					<div className="d-flex md:mt-20 flex-col items-center w-full md:w-[650px] mx-auto">
						{/* Ranks are shuffled in order to get the desired layout */}
						{topThree.length > 0 && (
							<section className="grid grid-cols-3 justify-between w-full mb-10 h-[35vh] md:mb-0 md:h-[50vh]">
								{[2, 1, 3].map((rank) => {
									if (!topThree[rank - 1]) return <></>;

									return (
										<PositionBadge
											username={topThree[rank - 1]?.username}
											rank={topThree[rank - 1]?.rank}
											avatarUrl={topThree[rank - 1]?.avatarUrl}
											isCurrentUser={
												data &&
												data.leaderboard[0].rank ===
													topThree[rank - 1]?.rank &&
												!!user
											}
											key={topThree[rank - 1]?.username}
										/>
									);
								})}
							</section>
						)}
						<section>
							{isFetching ? (
								<Center className="h-full w-full">
									<Loader color="violet" />
								</Center>
							) : (
								<>
									{!!user &&
										data &&
										data.leaderboard[0]?.rank !== 1 &&
										data.leaderboard[0]?.rank !== 2 &&
										data.leaderboard[0]?.rank !== 3 &&
										page === 1 && (
											<LeaderboardElement
												username={data.leaderboard[0]?.username}
												rank={data.leaderboard[0]?.rank}
												xp={data.leaderboard[0]?.xp}
												trophies={data.leaderboard[0]?.trophies}
												isCurrentUser={true}
												avatarUrl={data.leaderboard[0]?.avatarUrl}
											/>
										)}
									{data &&
										data.leaderboard &&
										data.leaderboard?.map(
											(user: Player, idx: number) => {
												if (
													user.rank !== 1 &&
													user.rank !== 2 &&
													user.rank !== 3 &&
													((page === 1 &&
														user.rank !==
															data.leaderboard[0]?.rank) ||
														page > 1)
												) {
													return (
														<LeaderboardElement
															username={user.username || ""}
															rank={user.rank || 0}
															xp={user.xp || 0}
															trophies={user.trophies || 0}
															isCurrentUser={false}
															avatarUrl={user.avatarUrl || ""}
															key={idx}
														/>
													);
												}
											}
										)}
								</>
							)}
						</section>
					</div>
					<div className="flex gap-2 items-center justify-center mt-10 ">
						<button
							onClick={previousPage}
							disabled={page === 1}
							className="text-violet"
						>
							<IconArrowLeft />
						</button>
						<p className="text-white">
							{page} of {data.pages}
						</p>
						<button onClick={nextPage} disabled={page === data.pages}>
							<IconArrowRight className="text-violet" />
						</button>
					</div>
				</>
			) : (
				<Center className="h-full w-full pt-5">
					<p className="text-white">No Leaderboard Found</p>
				</Center>
			)}
		</main>
	);
};

export default Leaderboard;
