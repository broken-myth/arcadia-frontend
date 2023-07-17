import { Stack } from "@mantine/core";
import Footer from "./Footer";
import TopThree from "./TopThree";

const Bottom = ({
	scrollDetails,
	visitedSet,
}: {
	visitedSet: Set<number>;
	scrollDetails: { from: number; to: number };
}) => {
	if (!visitedSet.has(5) && scrollDetails.to !== 5) {
		return <section className="h-full w-full bg-black sections"></section>;
	}

	if (!visitedSet.has(5)) {
		visitedSet.add(5);
	}

	return (
		<Stack className="h-full gap-0">
			<TopThree />
			<Footer />
		</Stack>
	);
};

export default Bottom;
