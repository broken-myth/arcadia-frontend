/* eslint-disable indent */
import { useSelector } from "react-redux";
import { User } from "../type";
import { BACKEND_URL } from "../../config";
import { showNotification as mantineShowNotification } from "@mantine/notifications";
import { NotificationIcon } from "../components";
import { Player } from "../pages/Leaderboard/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUser = (): User => useSelector((state: any) => state.user);

interface DatafetchParams {
	url: string;
	user?: User | null;
	body?: string | object;
	headers?: RequestInit["headers"];
	method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
}

export const dataFetch = async ({
	url,
	user,
	body,
	headers,
	method,
}: DatafetchParams) => {
	if (method === "POST" || method === "PUT" || method === "PATCH") {
		headers = {
			"Content-Type": "application/json",
			...headers,
		};
	} else {
		method = "GET";
		body = undefined;
	}
	headers = {
		...headers,
		Authorization: `Bearer ${user ? user.userToken : ""}`,
	};
	try {
		const response = await fetch(BACKEND_URL + url, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		});
		if (response.status === 401) {
			localStorage.clear();
			window.location.href = "/login";
		}
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const showNotification = (
	title: string,
	message: string,
	type: "success" | "error" | "warning" | "info"
) => {
	const color =
		type === "success"
			? "#529E66"
			: type === "error"
			? "#D0454C"
			: type === "warning"
			? "#E1C542"
			: "#2D9CDB";
	mantineShowNotification({
		title: title,
		message: message,
		icon: NotificationIcon({ type }),
		color: color,
		styles: {
			title: {
				color: "#F5F5F5",
			},
			description: {
				color: "#F5F5F5",
			},
			root: {
				backgroundColor: "rgba(0, 0, 0, 0.75)",
				backdropFilter: "blur(10px)",
				borderWidth: 0,
			},
			icon: {
				scale: "1.25",
				backgroundColor: "transparent",
			},
		},
		classNames: {
			icon: "bg-transparent",
			title: "font-heading font-bold",
			description: "font-body",
			closeButton: "rounded-full transition-all",
		},
	});
};
export const getTopThree = (leaderboardArray: Player[]) => {
	const topThree: Player[] = leaderboardArray
		.filter(
			(player) => player.rank === 1 || player.rank === 2 || player.rank === 3
		)
		.sort((a, b) => (a.rank > b.rank ? 1 : a.rank < b.rank ? -1 : 0));
	return topThree;
};
