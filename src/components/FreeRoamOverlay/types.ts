export enum OverlayState {
	// eslint-disable-next-line no-unused-vars
	NONE,
	// eslint-disable-next-line no-unused-vars
	LOADING,
	// eslint-disable-next-line no-unused-vars
	MINICON_UNLOCKED,
	// eslint-disable-next-line no-unused-vars
	MATCHMAKING,
}

export interface Opponent {
	username: string;
	characterURL: string;
	trophies: number;
	xp: number;
}

export interface MatchDetails {
	matchID: number;
	opponent: Opponent;
}
