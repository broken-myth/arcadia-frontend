import { QueryClient, useQuery } from "react-query";
import { User } from "../type";
import { Queries } from "./constants";
import { dataFetch, showNotification } from "./helpers";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

const useCharacters = (user: User) => {
	return useQuery({
		queryKey: Queries.getCharactersGET,
		queryFn: async () => {
			const res = await dataFetch({
				user: user,
				url: "/api/characters",
			});

			const data = await res.json();

			if (res && res.status === 200) {
				if (!Array.isArray(data.characters)) {
					showNotification(
						"Oops",
						"Some Error occured, Try Agan",
						"error"
					);
				} else {
					return data;
				}
			} else {
				showNotification("Oops", "Some Error occured, Try Agan", "error");
			}
		},
		cacheTime: 1000 * 60 * 5,
		staleTime: 1000 * 60 * 5,
	});
};

const useMinicons = (user: User) => {
	return useQuery({
		queryKey: Queries.getAllMiniconsGET,
		queryFn: async () => {
			const res = await dataFetch({
				user: user,
				url: "/api/minicon/",
			});
			const data = await res.json();
			if (res && res.status === 200) {
				/* eslint-disable no-mixed-spaces-and-tabs */
				return data;
			} else {
				showNotification("Error", data.message, "error");
			}
		},
		cacheTime: 1000 * 60 * 1, // 1 minute
		staleTime: 1000 * 60 * 1, // 1 minute
	});
};

const invalidateQueries = (query: Queries) => {
	return queryClient.invalidateQueries(query);
};

export { useCharacters, useMinicons, queryClient, invalidateQueries };
