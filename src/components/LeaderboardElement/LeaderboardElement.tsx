import { IconTrophy } from "@tabler/icons";
import React from "react";
import { LeaderboardElementProps } from "./types";
import cardinalToOrdinal from "../../utils/cardinalToOrdinal";
import { Image } from "@mantine/core";

const LeaderboardElement: React.FC<LeaderboardElementProps> = ({
	username,
	trophies,
	xp,
	rank,
	isCurrentUser,
	avatarUrl,
}) => {
	return (
		<div
			className={`${
				isCurrentUser ? "leaderboard-bg-gradient" : "bg-[#51515157]"
			} mb-5 grid grid-row-1 grid-cols-8 gap-2 place-content-center items-center p-3 rounded-2xl font-heading`}
		>
			<div className="rounded-full col-span-1 w-7 h-7 md:w-10 md:h-10 border-2 md:border-4 border-solid">
				<Image
					src={`/assets/images/characters/avatars/${avatarUrl}`}
					alt="User Profile"
					radius={"xl"}
				/>
			</div>
			<p className="text-white col-span-2 text-md md:text-lg">{username}</p>
			<p className="text-white font-bold flex flex-row items-center justify-self-center col-span-2 gap-1 text-sm md:text-lg">
				{trophies}
				<span>
					<IconTrophy color="white" className="w-5 md:w-7" />
				</span>
			</p>
			<p className="text-white font-medium justify-self-start md:justify-self-end col-span-2 text-sm md:text-lg">
				{xp}
				<span className="text-white font-bold">XP</span>
			</p>
			<p className="text-white justify-self-end font-bold col-span-1 text-xs md:text-lg">
				{cardinalToOrdinal(rank)}
			</p>
		</div>
	);
};

export default LeaderboardElement;
