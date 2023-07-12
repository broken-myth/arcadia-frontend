import { MiniconProps } from "./types";

const StyledMinicon = (props: MiniconProps): JSX.Element => {
	return (
		<div
			className={`relative h-[255px] max-w-[240px] flex flex-col items-center mr-[15px] ml-[15px] ${
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
				className={` block border-[10px] border-solid 
				border-new-black rounded-[50%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
					props.isDragging && // eslint-disable-line indent
					"shadow-[rgba(0.0,0,0.55)_0px_25px_50px_-12px]"
					// eslint-disable-next-line indent
				} `}
				alt="Minicon Img"
			/>

			{/*Overlay Rect*/}
			<div
				className={`absolute -bottom-10 h-[72px] w-[164px] flex flex-col items-center justify-center bg-new-black
				rounded-md shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}
			>
				{props.locked ? (
					<p className=" font-heading not-italic font-normal text-xl leading-8 text-white text-center ">
						<span className="font-bold">{props.name}</span>
					</p>
				) : (
					<>
						<p className="font-heading not-italic font-normal text-white text-xl leading-8 text-center ">
							<span className="font-bold">{props.name}</span>
						</p>
						<p className="font-heading not-italic font-normal text-white text-xl leading-8 text-center ">
							<span className="font-bold">XP : </span>
							<span className="text-[19px]">{props.xp}</span>
						</p>
					</>
				)}
			</div>
		</div>
	);
};
export default StyledMinicon;
