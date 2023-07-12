import { matchHistory } from "./types";

const Match = (props: {
	match: matchHistory;
	clickedID: number | null;
	onClick: () => void;
}) => {
	return (
		<>
			<div
				className={`max-h-[20%] w-full flex align-middle cursor-pointer hover:bg-black ${
					props.clickedID == props.match.matchID ? "bg-black" : ""
				} `}
				onClick={props.onClick}
			>
				<div className="flex flex-row justify-evenly align-middle h-[75%] w-full my-auto">
					<img
						src="/assets/images/userImg.webp"
						className={`border-[7px] border-solid rounded-[50%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
							props.match.trophyChange > 0
								? "border-violet"
								: "border-white"
						} `}
						alt=""
					/>
					<img
						src="/assets/images/battle.webp"
						alt=""
						className="object-scale-down h-8 mt-8"
					/>
					<img
						src="/assets/images/dummyImg.webp"
						className={`border-[7px] border-solid rounded-[50%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
							props.match.trophyChange < 0
								? "border-violet"
								: "border-white"
						} `}
						alt=""
					/>
				</div>
			</div>
		</>
	);
};

export default Match;
