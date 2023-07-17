import { Box, Button, Center, Image, Text, Flex } from "@mantine/core";
import { UnlockedMinicon } from "../../type";

const MiniconUnlocked = ({
	minicon,
	onClose,
}: {
	minicon: UnlockedMinicon;
	onClose: () => void;
}) => {
	return (
		<Box className="w-full h-full grid absolute z-10 grid-cols-6 grid-rows-6 overflow-hidden backdrop-blur-md bg-kinda-black">
			<Center className="col-start-1 row-start-1 col-end-7 row-end-7">
				<Image
					alt="Rewards Light"
					classNames={{
						root: "w-full",
						figure: "w-full",
						imageWrapper: "w-full",
						image: "w-full animate-spin-slow ",
					}}
					src={"/assets/images/rewards-light.webp"}
				/>
			</Center>
			<Center className="col-start-1 animate-pulse row-start-1 col-end-7 row-end-7">
				<Image
					alt="Glow Circle"
					classNames={{
						root: "h-full w-[unset]",
						figure: "h-full",
						imageWrapper: "h-full",
						image: "h-full",
					}}
					src={"/assets/images/glow-circle.webp"}
				/>
			</Center>
			<Center className="col-start-1 animate-minicon-reveal row-start-1 col-end-7 row-end-7">
				<Image
					alt="Minicon"
					classNames={{
						root: "h-[80%] w-[unset]",
						figure: "h-full",
						imageWrapper: "h-full",
						image: "h-full",
					}}
					src={`/assets/images/minicons/${minicon.image}`}
				/>
			</Center>
			<Flex className="col-start-2 row-start-5 col-end-6 row-end-7 items-center justify-end mb-10 flex-col gap-6">
				<Text className="text-white animate-minicon-name-reveal font-heading font-bold text-[32px]">
					{minicon.name}
				</Text>
				<Button onClick={onClose} className="animate-minicon-name-reveal">
					CONTINUE
				</Button>
			</Flex>
			<Center className="col-start-1 row-start-1 col-end-9 row-end-7">
				<Text className="text-white animate-minicon-text-reveal font-heading font-bold text-[48px] animate-fadeIn">
					NEW MINICON UNLOCKED!
				</Text>
			</Center>
		</Box>
	);
};

export default MiniconUnlocked;
