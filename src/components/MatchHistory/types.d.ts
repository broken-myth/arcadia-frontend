export interface matchHistoryData {
	matchHistory: matchHistory[];
}

export interface matchHistory {
	matchID: number;
	opponentID: number;
	opponentUsername: string;
	matchType: string;
	trophyChange: number;
}
