import { useState } from "react";
import Match from "./Match";
import EachBattle from "./EachBattle";
import { matchHistory, matchHistoryData } from "./types";

const Battles = (props: { matchHistoryData: matchHistoryData }) => {
	const [currentMatchID, setCurrentmatchID] = useState<number | null>(null);

	return (
		<>
			{props.matchHistoryData.matchHistory.length == 0 ? (
				<div className="text-white w-[100%] text-3xl text-center">
					No Matches Found
				</div>
			) : (
				<>
					<div
						className="h-full flex flex-col basis-1/3 overflow-y-scroll no-scrollbar border-solid border-r
					border-[rgba(255,255,255,0.4)]"
					>
						{props.matchHistoryData.matchHistory.map(function (
							ele: matchHistory
						) {
							return (
								<Match
									key={ele.matchID}
									match={ele}
									clickedID={currentMatchID}
									onClick={() => setCurrentmatchID(ele.matchID)}
								/>
							);
						})}
					</div>
					{currentMatchID != null && (
						<EachBattle battleID={currentMatchID} />
					)}
				</>
			)}
		</>
	);
};

export default Battles;
