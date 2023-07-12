import { FreeRoam } from "../../components";
import { useQuery } from "react-query";
import { queries } from "../../utils/constants";
import { dataFetch, getUser } from "../../utils/helpers";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Center, Flex, Loader, Modal } from "@mantine/core";
import { getProfileSuccess } from "../../actions/user";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useFullscreen } from "@mantine/hooks";

const Game = () => {
	const { toggle, fullscreen } = useFullscreen();
	const [modalOpen, setModalOpen] = useState(!fullscreen);
	const dispatch = useDispatch();

	const user = getUser();

	const { isLoading, isError, isSuccess } = useQuery({
		queryKey: queries.getProfileGET,
		queryFn: async () =>
			dataFetch({
				user: user,
				url: "/api/user/profile",
			}),
		onSuccess: async (res) => {
			if (res && res.status === 200) {
				const data = await res.json();
				dispatch(getProfileSuccess(data.message));
			}
			setModalOpen(true);
		},
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user]);

	return (
		<main className="h-full">
			{isLoading && (
				<Center className="h-full w-full">
					<Loader color="violet" />
				</Center>
			)}
			{isError && (
				<Center className="h-full w-full">
					<h1 className="text-4xl font-bold text-gray-800">
						Something went wrong
					</h1>
				</Center>
			)}
			{isSuccess && (
				<>
					<Modal
						opened={modalOpen}
						withCloseButton={false}
						onClose={() => {
							setModalOpen(false);
						}}
						centered
						classNames={{
							modal: "bg-new-black backdrop-blur-md bg-opacity-50 fi w-[40%] h-[40%]",
							body: "flex flex-col gap-5 h-full justify-center items-center",
						}}
					>
						<h1 className="text-4xl font-bold text-new-white font-heading">
							Welcome to Arcadia
						</h1>
						<p className="text-lg text-new-white">
							Would you like to enter full screen mode?
						</p>
						<Flex
							gap={10}
							className="w-full flex-row items-center justify-center"
						>
							<Button
								className="w-[20%]"
								onClick={() => {
									toggle();
									setModalOpen(false);
								}}
							>
								YES
							</Button>
							<Button
								className="w-[20%]"
								onClick={() => {
									setModalOpen(false);
								}}
							>
								NO
							</Button>
						</Flex>
					</Modal>
					<Outlet />
					<FreeRoam />
				</>
			)}
		</main>
	);
};

export default Game;
