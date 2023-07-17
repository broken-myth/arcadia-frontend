import { useState } from "react";

import { FreeRoamLayer } from "free-roam";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { useQuery } from "react-query";
import { Queries } from "../../utils/constants";
import FreeRoamOverlay from "../FreeRoamOverlay/FreeRoamOverlay";
import { Center, Loader } from "@mantine/core";

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
		Queries.getLootboxesGET,
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
					data === null ||
					data.lootboxes === null ||
					!Array.isArray(data.lootboxes) ||
					data.lootboxes.length === 0
				) {
					showNotification("Error", "No lootboxes found", "error");
					return;
				}
				setLootboxDetails(data);
			},
		}
	);

	return (
		<div className="w-full h-full">
			{isLoading && (
				<Center className="absolute bg-transparent w-full h-full">
					<Loader color="violet" />
				</Center>
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
					<Loader color="violet" />
				</Center>
			)}
		</div>
	);
};

export default FreeRoam;
