import { PositionBadge } from "..";
import { useQuery } from "react-query";
import { dataFetch, getTopThree, showNotification } from "../../utils/helpers";
import { Center, Loader, Box, Stack, Text } from "@mantine/core";
import { Queries } from "../../utils/constants";
import { Link } from "react-router-dom";

const Top = () => {
	// Data Fetching
	const { isError, isSuccess, isFetching, data } = useQuery({
		queryKey: Queries.getLandingLeaderboardGET,
		queryFn: async () => {
			const res = await dataFetch({
					url: "/api/leaderboard/1",
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
		select: (data) => {
			return getTopThree(data.leaderboard);
		},
		keepPreviousData: true,
	});

	return (
		<Box className=" h-[75%]">
			<Stack className="w-full h-full gap-10 pb-8 pt-12 bg-black text-center">
				<Center className="h-[15%]">
					<h1 className="font-heading text-white text-7xl font-semibold leaderboardText">
						THE{" "}
						<span className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FF6B00] to-[#FFE454]">
							CONQUERORS
						</span>
					</h1>
				</Center>
				<Center>
					<Link to="/leaderboard">
						<Text className="font-heading transition-all leaderboardView text-new-white hover:tracking-wide">
							Click here to see the full leaderboard
						</Text>
					</Link>
				</Center>
				<Box className="d-flex flex pt-10 flex-1 items-center flex-col justify-end w-full">
					{isError && <p>Error Occured</p>}
					{/* Ranks are shuffled in order to get the desired layout */}
					{isFetching ? (
						<Center className="w-full h-full">
							<Loader color="violet" />
						</Center>
					) : (
						<>
							{isSuccess && data.length > 0 ? (
								<Box className="grid h-full grid-cols-3 justify-between w-[50%]">
									{[2, 1, 3].map((rank) => {
										if (!data[rank - 1]) return <></>;
										return (
											<PositionBadge
												username={data[rank - 1]?.username}
												rank={data[rank - 1]?.rank}
												avatarUrl={data[rank - 1]?.avatarUrl}
												isCurrentUser={false}
												key={data[rank - 1]?.userId}
											/>
										);
									})}
								</Box>
							) : (
								<Center className="w-full h-full">
									<p className="text-white">Unable to find players</p>
								</Center>
							)}
						</>
					)}
				</Box>
			</Stack>
		</Box>
	);
};

export default Top;
