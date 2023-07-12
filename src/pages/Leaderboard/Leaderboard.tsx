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
import { Player } from "./types";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import { queries } from "../../utils/constants";

const Leaderboard = () => {
	// States
	const [leaderboard, setLeaderboard] = useState<Player[]>([]);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [isAuth, setIsAuth] = useState<boolean>(false);

	const user = getUser();

	// Functions
	const nextPage = () => {
		setPage((prevState) => Math.min(prevState + 1, totalPages));
	};
	const previousPage = () => {
		setPage((prevState) => Math.max(prevState - 1, 0));
	};

	// Data Fetching
	const { isError, isSuccess, isLoading } = useQuery({
		queryKey: [queries.getLeaderBoardGET, page],
		queryFn: async () =>
			dataFetch({
				url: `/api/leaderboard?page=${page}`,
				user,
			}),
		keepPreviousData: true,
		onSuccess: async (res) => {
			if (res && res.status === 200) {
				const data = await res.json();
				if (!Array.isArray(data.message.leaderboard)) {
					showNotification(
						"Oops",
						"Some Error occured, Try Again",
						"error"
					);
				} else {
					setLeaderboard(data.message.leaderboard);
					setIsAuth(user ? true : false);
					setTotalPages(data.message.pages);
				}
			} else {
				showNotification("Oops", "Some Error occurred, Try Again", "error");
			}
		},
	});

	const topThree: Player[] = getTopThree(leaderboard);

	return (
		<>
			{!isSuccess && (
				<Center className="h-full w-full">
					{isError && <p>Error Occured</p>}
					{isLoading && <Loader color="violet" />}
				</Center>
			)}
			{isSuccess && (
				<main className="w-full min-h-screen bg-new-black pt-10 md:pt-20 pb-14 px-5 md:px-10">
					<h1 className="font-display uppercase text-white text-center tracking-[0.34em] text-[1.15rem] md:text-5xl">
						Leaderboard
					</h1>
					<div className="d-flex md:mt-20 flex-col items-center w-full md:w-[650px] mx-auto">
						{/* Ranks are shuffled in order to get the desired layout */}
						{topThree.length > 0 && (
							<section className="grid grid-cols-3 justify-between w-full mb-10 h-[35vh] md:mb-0 md:h-[50vh]">
								{[2, 1, 3].map((rank) => {
									return (
										<PositionBadge
											username={topThree[rank - 1]?.username}
											rank={topThree[rank - 1]?.rank}
											avatarUrl={topThree[rank - 1]?.avatar_url}
											isCurrentUser={
												leaderboard[0].rank ===
													topThree[rank - 1]?.rank && isAuth
											}
											key={topThree[rank - 1]?.user_id}
										/>
									);
								})}
							</section>
						)}
						<section>
							{isAuth &&
								leaderboard[0]?.rank !== 1 &&
								leaderboard[0]?.rank !== 2 &&
								leaderboard[0]?.rank !== 3 &&
								page === 1 && (
									<LeaderboardElement
										username={leaderboard[0]?.username}
										rank={leaderboard[0]?.rank}
										xp={leaderboard[0]?.xp}
										trophies={leaderboard[0]?.trophies}
										isCurrentUser={true}
										avatarUrl={leaderboard[0]?.avatar_url}
									/>
								)}
							{leaderboard?.map((user, idx) => {
								if (
									user.rank !== 1 &&
									user.rank !== 2 &&
									user.rank !== 3 &&
									((page === 1 &&
										user.rank !== leaderboard[0]?.rank) ||
										page > 1)
								) {
									return (
										<LeaderboardElement
											username={user.username}
											rank={user.rank}
											xp={user.xp}
											trophies={user.trophies}
											isCurrentUser={false}
											avatarUrl={user.avatar_url}
											key={idx}
										/>
									);
								}
							})}
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
							{page} of {totalPages}
						</p>
						<button onClick={nextPage} disabled={page === totalPages}>
							<IconArrowRight className="text-violet" />
						</button>
					</div>
				</main>
			)}
		</>
	);
};

export default Leaderboard;
