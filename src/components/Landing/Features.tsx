import { Box, Button, Center, Group, Stack, Text } from "@mantine/core";

const getOpacity = (idx: number, isLeft: boolean) => {
	switch (idx) {
		case 4:
			return isLeft ? "opacity-20" : "opacity-100";
		case 3:
			return isLeft ? "opacity-40" : "opacity-80";
		case 2:
			return "opacity-60";
		case 1:
			return isLeft ? "opacity-80" : "opacity-40";
		case 0:
			return isLeft ? "opacity-100" : "opacity-20";
		default:
			return "opacity-100";
	}
};

const getLetterSpacing = (word: string) => {
	const numOfLetters = word.length;

	switch (numOfLetters) {
		case 4:
			return "tracking-[5rem] indent-[5rem]";
		case 5:
			return "tracking-[3rem] ";
		case 6:
			return "tracking-[1rem] ";
		case 7:
			return "tracking-[0.2rem] ";
		default:
			return "tracking-[1rem] ";
	}
};

const getBGColor = (color: string) => {
	switch (color) {
		case "blue":
			return "bg-[#52C4F5]";
		case "violet":
			return "bg-[#5030DB]";
		case "purple":
			return "bg-[#9747FF]";
		default:
			return "bg-blue-900";
	}
};

const getAnimation = (idx: number) => {
	switch (idx) {
		case 0:
			return "title1";
		case 1:
			return "title2";
		case 2:
			return "title3";
		case 3:
			return "title4";
		case 4:
			return "title5";
		default:
			return "title1";
	}
};

const Features = ({
	idx,
	title,
	color,
	imageURL,
	isLeft,
	description,
	tagLine,
	scrollDetails,
	visitedSet,
}: {
	visitedSet: Set<number>;
	idx: number;
	title: string;
	color: string;
	imageURL: string;
	isLeft: boolean;
	description: string;
	tagLine: string;
	scrollDetails: { from: number; to: number };
}) => {
	if (!visitedSet.has(idx) && scrollDetails.to !== idx) {
		return <section className="h-full w-full bg-black sections"></section>;
	}

	if (!visitedSet.has(idx)) {
		visitedSet.add(idx);
	}

	return (
		<Center className="h-full w-full bg-black sections">
			<Box className="grid w-[75%] h-[70%] grid-cols-10 grid-rows-[repeat(8,1fr)] gap-0">
				<Box
					className={
						"row-start-1 row-end-[9] z-0 rounded-3xl p-5 " +
						(isLeft
							? "col-start-1 col-end-6"
							: "col-start-6 col-end-[11]") +
						" " +
						getBGColor(color)
					}
				>
					<Group spacing={0} className="w-full h-full">
						{[...Array(5)].map((_, i) => (
							<Center
								key={i + title}
								className={
									"w-[20%] h-full text-center origin-center font-bold font-heading text-4xl "
								}
							>
								<Text
									className={
										"text-white text-center origin-center z-10 font-black font-heading text-[6vw] " +
										getOpacity(i, isLeft) +
										" " +
										getLetterSpacing(title) +
										" " +
										getAnimation(i)
									}
								>
									{title}
								</Text>
							</Center>
						))}
					</Group>
				</Box>
				<Box
					className={
						"row-start-2 row-end-[8] z-20 rounded-3xl descriptionContainer glass-grad " +
						(isLeft
							? "col-start-5 col-end-[11]"
							: "col-start-1 col-end-7")
					}
				></Box>
				<Box
					className={
						"row-start-2 row-end-[8] z-30 rounded-3xl" +
						" " +
						(isLeft
							? "col-start-6 col-end-[11]"
							: "col-start-1 col-end-6")
					}
				>
					<Stack
						className={
							"h-full feature-details justify-center " +
							(isLeft ? "pl-[10%] pr-[5%]" : "pl-[5%] pr-[10%]")
						}
					>
						<Text className="text-white text-2xl font-heading" size="xl">
							<span className="font-bold">
								{tagLine.split(" ")[0] + " "}
							</span>
							{tagLine.split(" ").slice(1).join(" ")}
						</Text>
						<Text
							className="text-white text-lg font-light font-heading"
							size="lg"
						>
							{description}
						</Text>
						<Button
							variant="outline"
							color={color}
							className="font-bold font-heading mt-5"
						>
							Explore
						</Button>
					</Stack>
				</Box>
				<Box
					className={
						"row-start-3 row-end-[7] z-50 transparent rounded-3xl " +
						(isLeft ? "col-start-3 col-end-6" : "col-start-6 col-end-9")
					}
				>
					<video autoPlay loop muted>
						<source src={imageURL} type="video/mp4" />
					</video>
				</Box>
			</Box>
		</Center>
	);
};

export default Features;
