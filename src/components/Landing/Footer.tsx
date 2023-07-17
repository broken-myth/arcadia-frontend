import { Box, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import { footer } from "../../utils/content";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<Group className="w-full justify-center h-[25%] bg-new-black items-center text-white sections footer">
			<Box
				onClick={() => window.open("https://delta.nitt.edu", "_blank")}
				className="flex cursor-pointer justify-center items-center w-[25%]"
			>
				<Box className="relative">
					<Box className="w-80 text-center text-white font-black tracking-[7px] z-10">
						MADE WITH{" "}
						<img
							src="/assets/images/heart.svg"
							className="inline w-5"
							alt=""
						/>{" "}
						BY
					</Box>
					<Box className="w-80 text-center text-white font-black tracking-[7px] z-10">
						DELTA FORCE
					</Box>
				</Box>
				<Image
					alt="Delta Force"
					src="/assets/images/delta.webp"
					className="absolute delta-pulse"
					width={90}
				/>
			</Box>
			<Group spacing={0} className="w-[55%]">
				<Box className="w-[70%]">
					<Text className="font-bold font-heading pb-3">Learn</Text>
					<SimpleGrid cols={3} spacing="sm">
						{footer.learn.map((link) => (
							<Link className="group" to={link.link} key={link.link}>
								<Text className="group-hover:cursor-pointer group-hover:font-medium transition-all group-hover:tracking-wide">
									{link.name}
								</Text>
							</Link>
						))}
					</SimpleGrid>
				</Box>
				<Box className="w-[30%]">
					<Text className="font-bold font-heading pb-3">Contact</Text>
					<Stack spacing="xs">
						{footer.contact.map((contact) => (
							<Group className="justify-between" key={contact.name}>
								<Text>{contact.name}</Text>
								<Text>{contact.number}</Text>
							</Group>
						))}
					</Stack>
				</Box>
			</Group>
		</Group>
	);
};

export default Footer;
