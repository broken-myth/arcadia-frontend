import { MiniconProps } from "./types";

const StyledMinicon = (props: MiniconProps): JSX.Element => {
	return (
		<div
			className={`relative h-fit max-w-[240px] flex flex-col items-center mr-[15px] ml-[15px] ${
				props.isDragging && "scale-[1.1]"
			}`}
		>
			{/*Ring Overlay*/}
			<img
				src={
					props.locked
						? "/assets/images/Lock-Image.webp"
						: "/assets/images/minicons/profile/" + props.miniconImageUrl
				}
				className={` block border-[10px] max-xl:border-[6px]  border-solid 
				border-new-black rounded-[50%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
					props.isDragging && // eslint-disable-line indent
					"shadow-[rgba(0.0,0,0.55)_0px_25px_50px_-12px]"
					// eslint-disable-next-line indent
				} `}
				alt="Minicon Image"
			/>

			{/*Overlay Rect*/}
			<div
				className={`absolute -bottom-10 max-xl:-bottom-10  h-[63%] max-h-[65px] max-xl:max-h-14 w-[85%] max-w-[164px]  flex flex-col items-center justify-center bg-new-black
				rounded-md shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-1 `}
			>
				{props.locked ? (
					<p className=" font-heading not-italic font-normal text-[1.1vw] leading-6 max-xl:leading-4 text-white text-center ">
						<span className="font-bold">{props.name}</span>
					</p>
				) : (
					<>
						<p className="font-heading not-italic font-normal text-white text-[1.1vw] leading-6 max-xl:leading-4 text-center ">
							<span className="font-semibold">{props.name}</span>
						</p>
						<p className="font-heading not-italic font-normal text-white  text-[0.95vw] leading-6 max-xl:leading-4 text-center ">
							<span className="font-semibold">XP : </span>
							<span className="text-[1.1vw]">{props.xp}</span>
						</p>
					</>
				)}
			</div>
		</div>
	);
};
export default StyledMinicon;
