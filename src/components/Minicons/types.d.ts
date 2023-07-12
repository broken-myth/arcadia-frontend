export interface UnlockedMinicon {
	name: string;
	imageLink: string;
	xp: number;
	miniconID: number;
	ownedMiniconID: number;
	type: string;
}

export interface LockedMinicon {
	name: string;
	miniconID: number;
}

export interface MutationParams {
	lineupIDArr: number[];
}
