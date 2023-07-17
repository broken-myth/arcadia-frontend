import React from "react";
import { Center, SimpleGrid } from "@mantine/core";

const FallbackUI: React.FC = () => {
	return (
		<Center className="h-full w-full error-bg flex-col">
			<h1 className="text-white font-heading error-shadow font-thin text-[18rem]">
				OOPS!
			</h1>
			<p className="text-white  font-heading text-xl">
				Something went wrong
			</p>
			<p className="text-white  font-heading text-xl">
				Please reload the page. If the issue still persist, Please contact
				the admins.
			</p>

			<p className="text-white font-heading font-extrabold text-xl my-10">
				Contact Us
			</p>
			<SimpleGrid cols={2} spacing="lg" className="text-white">
				<div>Hedhav</div>
				<div>+91 83343 34343</div>
				<div>Suhail</div>
				<div>+91 83343 34343</div>
				<div>Chirag</div>
				<div>+91 83343 34343</div>
			</SimpleGrid>
		</Center>
	);
};

export default FallbackUI;
