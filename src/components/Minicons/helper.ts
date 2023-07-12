import { UnlockedMinicon } from "./types";

export const removeFromList = (
	list: UnlockedMinicon[],
	index: number
): [UnlockedMinicon, UnlockedMinicon[]] => {
	const result = [...list];
	const [removed] = result.splice(index, 1);
	return [removed, result];
};

export const addToList = (
	list: UnlockedMinicon[],
	index: number,
	element: UnlockedMinicon
) => {
	const result = [...list];
	result.splice(index, 0, element);
	return result;
};
