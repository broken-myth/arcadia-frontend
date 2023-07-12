import { useEffect } from "react";
import { Box, Center, Image, Kbd } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Landing = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "e" || e.key === "E") {
				navigate("/login");
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Box className="grid w-full h-full">
			<Center className="col-span-full row-span-full flex-col bg-new-black">
				<Box className="w-[60%]">
					<Image src="/assets/images/arcadia-logo-mid-res.webp" />
				</Box>
				<Box className="font-heading text-new-white drop-shadow font-bold text-[32px] tracking-widest brightness-100">
					PRESS <Kbd className="text-[32px]">E</Kbd> TO ENTER
				</Box>
			</Center>
		</Box>
	);
};

export default Landing;
