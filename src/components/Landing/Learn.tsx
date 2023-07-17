import { Box, Center, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const Learn = ({
	visitedSet,
	scrollDetails,
}: {
	visitedSet: Set<number>;
	scrollDetails: { from: number; to: number };
}) => {
	if (!visitedSet.has(1) && scrollDetails.to !== 1) {
		return <section className="h-full w-full bg-black sections"></section>;
	}

	if (!visitedSet.has(1)) {
		visitedSet.add(1);
	}

	return (
		<section className="h-full w-full sections">
			<Center className="h-full grid grid-cols-1 grid-rows-1 w-full flex-col bg-black text-white">
				<Center className=" row-span-full col-span-full">
					<img
						src="/assets/images/grad-rect.webp"
						alt="Gradient Rectangle"
						className="h-[95%] z-40 absolute w-[unset] box1"
					/>
					<img
						src="/assets/images/rect.webp"
						alt="Gradient Rectangle"
						className="h-[69%] opacity-100 z-30 absolute w-[unset] box2"
					/>
					<img
						src="/assets/images/rect.webp"
						alt="Gradient Rectangle"
						className="h-[69%] opacity-70 z-20 absolute w-[unset] box3"
					/>
					<img
						src="/assets/images/rect.webp"
						alt="Gradient Rectangle"
						className="h-[69%] opacity-50 z-10 absolute w-[unset] box4"
					/>
				</Center>
				<Center className="row-span-full col-span-full flex-col pr-[10%]">
					<Text className="text-[9.5vw] z-[70] pr-[32%] font-heading font-black big-text-shadow leading-[0.75] find">
						FIND
					</Text>
					<Text className="text-[9.5vw] z-[60] font-heading font-black big-text-shadow leading-[0.75] find">
						CREATE
					</Text>
					<Text className="text-[9.5vw] z-50 pl-[40%] font-heading font-black big-text-shadow leading-[0.75] find">
						CONQUER
					</Text>
					<Box className="self-end pr-[4%] z-[80]">
						<Link to="/learn">
							<Text className="text-xl transition-all underline learn cursor-pointer hover:tracking-wider learn">
								Learn how to play
							</Text>
						</Link>
					</Box>
				</Center>
			</Center>
		</section>
	);
};

export default Learn;
