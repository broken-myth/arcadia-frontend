/* eslint-disable indent */
import React from "react";
import { Link } from "react-router-dom";
import { IconSquareRoundedArrowLeft } from "@tabler/icons-react";
import SideBarButton from "./SideBarButton";
import { Center, Image } from "@mantine/core";

const sidebarEntities = [
	{
		field: "profile",
		value: "Profile",
	},
	{
		field: "minicons",
		value: "Minicons",
	},
	{
		field: "match-history",
		value: "Match History",
	},
	{
		field: "characters",
		value: "Characters",
	},
];

const SideBar: React.FC = (): JSX.Element => {
	return (
		<div className="relative flex flex-col basis-[320px] max-xl:basis-[30%] shrink-0 bg-[rgba(0,0,0,0.424)] border-r border-solid border-r-white">
			<div className="w-full min-h-[150px] flex basis-[25%] flex-col items-center justify-center">
				<Center className="w-full z-40 min-h-[50px] top-0 absolute justify-start pl-5">
					<Link
						className="text-new-white transition-all hover:opacity-50 hover:cursor-pointer hover:tracking-wider font-heading flex flex-row items-center"
						to="../game"
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
				<Center className="font-display flex-grow not-italic font-normal text-5xl leading-[75px] tracking-[0.05em] text-[#FFFFFF]">
					<Image
						alt="Arcadia Logo"
						className="w-[80%]"
						src="/assets/images/arcadia-logo-white.webp"
					/>
				</Center>
			</div>
			<div className=" w-full flex flex-col basis-[75%] items-center justify-start">
				{sidebarEntities.map((entity) => (
					<SideBarButton
						key={entity.field}
						field={entity.field}
						value={entity.value}
					/>
				))}
			</div>
		</div>
	);
};

export default SideBar;
