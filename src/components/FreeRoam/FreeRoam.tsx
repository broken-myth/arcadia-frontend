import { useState } from "react";

import { FreeRoamLayer } from "free-roam";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { useQuery } from "react-query";
import { queries } from "../../utils/constants";
import FreeRoamOverlay from "../FreeRoamOverlay/FreeRoamOverlay";
import { Center } from "@mantine/core";

interface LootboxDetail {
	x: number;
	y: number;
	isOpen: boolean;
}

interface GetLootboxesResponse {
	lootboxes: LootboxDetail[];
}

const FreeRoam = () => {
	const user = getUser();
	const [lootboxDetails, setLootboxDetails] =
		useState<GetLootboxesResponse | null>(null);
	const { isError, isLoading } = useQuery(
		queries.getLootboxesGET,
		() => {
			return dataFetch({
				url: "/api/lootbox",
				user,
			});
		},
		{
			onSuccess: async (res) => {
				const data = await res.json();
				if (res.status !== 200) {
					showNotification("Error", data.message, "error");
					return;
				}
				if (
					data.message === null ||
					data.message.lootboxes === null ||
					!Array.isArray(data.message.lootboxes) ||
					data.message.lootboxes.length === 0
				) {
					showNotification("Error", "No lootboxes found", "error");
					return;
				}
				setLootboxDetails(data.message);
			},
		}
	);

	return (
		<div className="w-full h-full">
			{isLoading && (
				<div className="absolute bg-transparent w-full h-full">
					Loading...
				</div>
			)}
			{isError && (
				<div className="absolute bg-transparent w-full h-full">Error</div>
			)}
			{lootboxDetails !== null && user && user.characterURL != null ? (
				<>
					<FreeRoamOverlay />
					<FreeRoamLayer
						lootboxDetails={lootboxDetails.lootboxes}
						encryptionKey={user?.userToken?.substring(0, 16)}
						characterURL={user?.characterURL}
					/>
				</>
			) : (
				<Center className="bg-new-black w-full h-full text-new-white">
					Loading...
				</Center>
			)}
		</div>
	);
};

export default FreeRoam;
