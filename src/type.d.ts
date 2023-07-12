export type User = Partial<{
	userToken: string;
	name: string;
	username: string;
	email: string;
	college: string;
	contact: string;
	trophies: number;
	xp: number;
	numberOfMinicons: number;
	characterURL: string;
	rank: number;
}>;

export interface Character {
	id: number;
	name: string;
	description: string;
	imageUrl: string;
	avatarUrl: string;
}

export type UnlockedMinicon = {
	name: string;
	description: string;
	image: string;
};
