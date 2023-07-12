import { Box, Button, Center, Group, Image, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useQuery } from "react-query";
import { queries } from "../../utils/constants";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { MatchDetails, OverlayState } from "../FreeRoamOverlay/types";
import PlayerCircle from "../PlayerCircle/PlayerCircle";
import {
	Events,
	eventEmitter,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
} from "free-roam";
import { MatchmakingState } from "./types.d";
import { useState } from "react";

const Matchmaking = ({
	setOverlay,
}: {
	setOverlay: React.Dispatch<React.SetStateAction<OverlayState>>;
}) => {
	const user = getUser();
	const [matchMaking, setMatchMakingState] = useState<MatchmakingState>(
		MatchmakingState.SEARCHING
	);
	const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);

	const { isLoading, isError } = useQuery({
		queryKey: queries.startMatchGET,
		queryFn: () => {
			setMatchMakingState(MatchmakingState.SEARCHING);
			return dataFetch({
				url: "/api/match/start",
				user,
			});
		},
		onSuccess: async (res) => {
			const data = await res.json();
			if (res.ok) {
				setMatchMakingState(MatchmakingState.MATCH_FOUND);
				setMatchDetails(data.message);
			} else {
				showNotification("Error", data.message, "error");
				setOverlay(OverlayState.NONE);
				eventEmitter.emit(Events.RESUME_GAME);
			}
		},
	});

	if (matchMaking === MatchmakingState.SEARCHING || isLoading) {
		return (
			<Box className="w-full h-full rounded-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute z-10 overflow-hidden backdrop-blur-md bg-kinda-black">
				<Box className="h-full w-[90%] mx-auto grid grid-cols-3 animate-fadeIn">
					<PlayerCircle
						username={user.username}
						trophies={user.trophies}
						avatarUrl={user.characterURL}
						xp={user.xp}
						mt={40}
					/>
					<Box className="h-[100%] flex flex-col items-center justify-center">
						<Image
							src={"/assets/images/sword-fight.webp"}
							className="w-52"
						/>
					</Box>
					<Center className="h-[100%] border-yellow-100 flex flex-col items-center justify-start">
						<Box className="flex flex-col items-center justify-center h-full gap-4">
							<Text className="font-heading text-white flex gap-5 items-center justify-items-center text-2xl font-bold tracking-wider">
								<span className="text-white font-extrabold">
									<IconSearch size={50} />
								</span>
								Looking for your match...
							</Text>
						</Box>
					</Center>
				</Box>
			</Box>
		);
	}

	if (matchMaking === MatchmakingState.MATCH_FOUND && matchDetails) {
		return (
			<Box className="w-full h-full rounded-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute z-10 overflow-hidden backdrop-blur-md bg-kinda-black pt-10 flex flex-col items-center justify-center">
				<>
					<Text className="text-white text-5xl text-center font-bold font-heading mb-20 animate-fadeIn">
						Match Found!
					</Text>
					<Text className="text-white text-2xl text-center font-bold font-heading mb-20 animate-fadeIn">
						Your Minicons are fighting!
					</Text>
					<Box className="w-[90%] mx-auto grid grid-cols-3 animate-fadeIn">
						<PlayerCircle
							username={user.username}
							trophies={user.trophies}
							avatarUrl={user.characterURL}
							xp={user.xp || 0}
						/>
						<Center className="h-[100%] border-red-100 flex flex-col items-center justify-start">
							<Image
								src={"/assets/images/sword-fight.webp"}
								className="w-52 mt-10"
							/>
						</Center>
						{matchDetails && (
							<PlayerCircle
								username={matchDetails.opponent.username}
								trophies={matchDetails.opponent.trophies}
								avatarUrl={matchDetails.opponent.characterURL}
								xp={matchDetails.opponent.xp}
							/>
						)}
					</Box>
					<Group>
						<Button
							className="w-[200px]"
							onClick={() => {
								setOverlay(OverlayState.NONE);
								eventEmitter.emit(Events.MATCH_ENDED);
								showNotification(
									"Note",
									"Feature yet to be made :)",
									"info"
								);
							}}
						>
							View Battle
						</Button>
						<Button
							className="w-[200px]"
							onClick={() => {
								setOverlay(OverlayState.NONE);
								eventEmitter.emit(Events.MATCH_ENDED);
							}}
						>
							Return to free roam
						</Button>
					</Group>
				</>
			</Box>
		);
	}

	if (isError) {
		return (
			<Center className="w-full h-full rounded-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute z-10 overflow-hidden backdrop-blur-md bg-kinda-black">
				<h1>
					An error occured while trying to find a match. Please try again
				</h1>
				<Button
					className="w-[200px]"
					onClick={() => {
						setOverlay(OverlayState.NONE);
						eventEmitter.emit(Events.MATCH_ENDED);
					}}
				>
					Return to free roam
				</Button>
			</Center>
		);
	}

	return null;
};

export default Matchmaking;
