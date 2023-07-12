import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { mutations } from "../../utils/constants";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import {
	Events,
	eventEmitter,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
} from "free-roam";
import { UnlockedMinicon, User } from "../../type";
import MiniconUnlocked from "../MiniconUnlocked/MiniconUnlocked";
import Matchmaking from "../Matchmaking/Matchmaking";

import { OverlayState } from "./types";

const useLootboxOpen = (user: User) => {
	return useMutation({
		mutationKey: mutations.lootboxOpenPOST,
		mutationFn: ({
			x,
			y,
			lootboxID,
		}: {
			x: number;
			y: number;
			lootboxID: string;
		}) => {
			return dataFetch({
				url: "/api/lootbox/open",
				user,
				body: {
					x,
					y,
					lootboxID,
				},
				method: "POST",
			});
		},
	});
};

interface OpenLootboxRes {
	unlocked: UnlockedMinicon;
	lootboxID: string;
}

const FreeRoamOverlay = () => {
	const user = getUser();
	const [overlay, setOverlay] = useState<OverlayState>(OverlayState.LOADING);
	const [openLootboxResponse, setOpenLootboxResponse] =
		useState<OpenLootboxRes | null>(null);

	const openLootBox = useLootboxOpen(user);

	useEffect(() => {
		const onLootboxOpened = ({
			x,
			y,
			lootboxID,
		}: {
			x: number;
			y: number;
			lootboxID: string;
		}) => {
			openLootBox.mutate(
				{ x, y, lootboxID },
				{
					onSuccess: async (res) => {
						if (res && res.status === 200) {
							const data = await res.json();
							setOverlay(OverlayState.MINICON_UNLOCKED);
							setOpenLootboxResponse(data.message);
						} else {
							showNotification(
								"Error",
								"Error opening lootbox",
								"error"
							);
							return undefined;
						}
					},
				}
			);
			eventEmitter.removeAllListeners(Events.LOOTBOX_OPEN);
			eventEmitter.once(Events.LOOTBOX_OPEN, onLootboxOpened);
		};
		// Data Fetching

		const onStartMatchmaking = () => {
			setOverlay(OverlayState.MATCHMAKING);
		};

		eventEmitter.once(Events.LOOTBOX_OPEN, onLootboxOpened);
		eventEmitter.once(Events.START_MATCHMAKING, onStartMatchmaking);
		return function cleanup() {
			eventEmitter.removeAllListeners(Events.LOOTBOX_OPEN);
			eventEmitter.removeAllListeners(Events.START_MATCHMAKING);
		};
	}, []);

	if (overlay === OverlayState.NONE) {
		return null;
	}

	if (overlay === OverlayState.MINICON_UNLOCKED && openLootboxResponse) {
		const onClose = () => {
			setOverlay(OverlayState.NONE);
			eventEmitter.emit(
				Events.LOOTBOX_OPENED,
				openLootboxResponse?.lootboxID
			);
			showNotification(
				"Minicon Unlocked",
				`You unlocked ${openLootboxResponse?.unlocked.name}`,
				"success"
			);
		};

		return (
			<MiniconUnlocked
				minicon={openLootboxResponse?.unlocked}
				onClose={onClose}
			/>
		);
	}

	if (overlay === OverlayState.MATCHMAKING) {
		return <Matchmaking setOverlay={setOverlay} />;
	}

	return null;
};

export default FreeRoamOverlay;
