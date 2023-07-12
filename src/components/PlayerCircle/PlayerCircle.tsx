import { Box, Center, Image, Text } from "@mantine/core";
import { PlayerCircleProps } from "./types";

const PlayerCircle = ({
	username,
	avatarUrl,
	trophies,
	xp,
	mt,
}: PlayerCircleProps) => {
	return (
		<Center className="h-[100%] border-yellow-100 flex flex-col items-center justify-content-start">
			<Box className={`flex flex-col gap-10 items-start mt-${mt}`}>
				<img
					src={`/assets/images/characters/avatars/${avatarUrl}`}
					className="w-48 rounded-full border-[10px] border-solid border-white"
				/>
				<Box className="flex flex-col w-full items-center gap-2">
					<Text className="font-heading text-white font-bold text-2xl text-center">
						{username}
					</Text>
					<Text className="font-heading font-light text-white text-2xl">
						{xp}
						<span className="font-extrabold">XP</span>
					</Text>
					<Box className="flex gap-2 items-center">
						<Text className="font-heading font-bold text-white text-2xl">
							{trophies}
						</Text>
						<Image src={"/assets/images/Trophy.webp"} className="w-7" />
					</Box>
				</Box>
			</Box>
		</Center>
	);
};

export default PlayerCircle;
