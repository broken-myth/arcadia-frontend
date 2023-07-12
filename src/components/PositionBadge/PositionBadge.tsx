import React from "react";
import { PositionBadgeProps } from "./types";
import { Image } from "@mantine/core";

const PositionBadge: React.FC<PositionBadgeProps> = ({
	username,
	rank,
	avatarUrl,
	isCurrentUser,
}) => {
	return (
		<div
			className={`grid place-content-center place-items-center ${
				rank === 1
					? "place-self-center md:place-self-start md:justify-self-center"
					: rank == 2
						? "place-self-end md:place-self-center justify-self-start"
						: "place-self-end md:place-self-center justify-self-end"
			}`}
		>
			<div
				className={`hex rotate-90 ${
					isCurrentUser ? "leaderboard-bg-gradient" : "bg-white"
				}`}
			>
				<div className="hex-background relative">
					<div>
						<Image
							src={`/assets/images/characters/avatars/${avatarUrl}`}
							alt="Rank Badge"
						/>
					</div>
				</div>
			</div>
			<Image
				src={`/assets/images/rank-badges/${rank}.svg`}
				alt="Rank Badge"
				className="-translate-y-2 w-10 md:w-14"
			/>
			<p
				className={`${
					rank === 1
						? "gold-gradient-text"
						: rank === 2
							? "silver-gradient-text"
							: "bronze-gradient-text"
				} font-bold text-sm md:text-lg`}
			>
				{username}
			</p>
		</div>
	);
};

export default PositionBadge;
