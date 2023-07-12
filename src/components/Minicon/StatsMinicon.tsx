import { IconDroplet, IconFlame, IconShield } from "@tabler/icons";

const StatsMinicon = (props: {
	fire: number;
	defense: number;
	water: number;
}) => {
	return (
		<div className="h-full flex flex-col items-center pt-12 justify-start basis-1/3">
			<span className="font-heading not-italic font-bold text-[36px] mb-12 leading-[54px] text-white">
				STATISTICS
			</span>
			<div className="flex flex-row items-center justify-center mb-[2.5rem]">
				<IconFlame className="mr-[1rem] w-[40px] h-[40px] text-white"></IconFlame>
				<span className="font-heading not-italic font-bold text-white text-[36px] leading-[54px]">
					{props.fire}
				</span>
			</div>
			<div className="flex flex-row items-center justify-center mb-[2.5rem]">
				<IconShield className="mr-[1rem] w-[40px] h-[40px] text-white"></IconShield>
				<span className="font-heading not-italic font-bold text-white text-[36px] leading-[54px]">
					{props.defense}
				</span>
			</div>
			<div className="flex flex-row items-center justify-center mb-[2.5rem]">
				<IconDroplet className="mr-[1rem] w-[40px] h-[40px] text-white"></IconDroplet>
				<span className="font-heading not-italic font-bold text-white text-[36px] leading-[54px]">
					{props.water}
				</span>
			</div>
		</div>
	);
};

export default StatsMinicon;
