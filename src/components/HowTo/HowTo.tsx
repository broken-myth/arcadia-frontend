import { Box, Center, Group, Stack, Text } from "@mantine/core";
import { IconSquareRoundedArrowLeft } from "@tabler/icons-react";
import { eventEmitter, Events } from "free-roam";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const tutorialSteps = [
	{
		title: "Roam the map",
		videoURL: "/assets/videos/temp.mp4",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		title: "Suit yourself",
		videoURL: "/assets/videos/temp.mp4",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
	{
		title: "Conquer the world",
		videoURL: "/assets/videos/temp.mp4",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
	},
];

const HowTo = () => {
	useEffect(() => {
		eventEmitter.emit(Events.PAUSE_GAME);

		return () => {
			eventEmitter.emit(Events.RESUME_GAME);
		};
	}, []);

	return (
		<Stack className="w-full h-full gap-0 justify-between absolute z-50 backdrop-blur-md bg-kinda-black py-[2.5%]">
			<Text className="text-new-white text-center font-heading h-[7.5%] leading-none font-bold text-[48px] text-shadow animate-fadeIn">
				HOW TO PLAY?
			</Text>
			<Center className="h-[7.55%]">
				<Link
					className="text-new-white transition-all hover:opacity-50 hover:cursor-pointer hover:tracking-wider font-heading flex flex-row items-center"
					to="/game"
				>
					<IconSquareRoundedArrowLeft
						color="#F5F5F5"
						className="mr-2"
						stroke={1}
						size={30}
					/>
					<span>Back to game</span>
				</Link>
			</Center>
			<Group className="gap-0 h-[85%] px-[2.5%] pt-[2.5%]">
				{tutorialSteps.map((step, index, tutorialSteps) => (
					<>
						<Stack className="w-[30%] h-full" key={index}>
							<Text className="text-new-white text-left font-heading font-bold text-[36px] text-shadow animate-fadeIn">
								{step.title}
							</Text>
							<Box className="w-full">
								<video
									className="w-full"
									src={step.videoURL}
									controls={false}
									autoPlay={true}
									muted={true}
									loop={true}
								/>
							</Box>
							<Text className="text-new-white text-left text-[18px] animate-fadeIn">
								{step.description}
							</Text>
						</Stack>
						{index !== tutorialSteps.length - 1 && (
							<Center className="w-[5%] h-full">
								<Box className="w-[2px] h-full bg-gradient-to-b from-transparent via-new-white to-transparent" />
							</Center>
						)}
					</>
				))}
			</Group>
		</Stack>
	);
};

export default HowTo;
