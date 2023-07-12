import {
	AspectRatio,
	Flex,
	Image,
	Text,
	Center,
	Button,
	Loader,
} from "@mantine/core";
import { useState } from "react";
import { Character } from "../../type";
import { mutations, queries } from "../../utils/constants";
import { dataFetch, getUser } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { showNotification } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { updateProfileSuccess } from "../../actions/user";
import { eventEmitter, Events } from "free-roam";

const activeClass = "font-bold mt-4 ml-4 mb-4";

const Characters = () => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [selectedCharacter, setSelectedCharacter] =
		useState<Character | null>();
	const user = getUser();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isError, isSuccess } = useQuery({
		queryKey: queries.getCharactersGET,
		queryFn: async () =>
			dataFetch({
				user: user,
				url: "/api/characters",
			}),
		onSuccess: async (res) => {
			if (res && res.status === 200) {
				const data = await res.json();
				if (!Array.isArray(data.message.characters)) {
					showNotification(
						"Oops",
						"Some Error occured, Try Agan",
						"error"
					);
				} else {
					setCharacters(data.message.characters);
					setSelectedCharacter(
						data.message.characters.filter(
							(c: Character) => c.imageUrl === user.characterURL
						)[0]
					);
				}
			} else {
				showNotification("Oops", "Some Error occured, Try Agan", "error");
			}
		},
	});
	const { mutate } = useMutation({
		mutationKey: mutations.updateCharacterPOST,
		mutationFn: async (characterId: number) => {
			return dataFetch({
				user: user,
				url: "/api/user/profile",
				method: "POST",
				body: {
					intendedUpdate: "character",
					newValue: characterId.toString(),
				},
			});
		},
		onSuccess: async (res) => {
			if (res.ok) {
				showNotification("Sucess", "Character Updated", "success");
				const data = await res.json();
				dispatch(updateProfileSuccess(data.message));
				eventEmitter.emit(Events.CHANGE_CHARACTER, data.message.newValue);
			} else {
				showNotification("Oops", "Some Error occured, Try Agan", "error");
			}
		},
	});

	if (!user) {
		navigate("/login");
	}
	return (
		<>
			{!isSuccess && (
				<Center className="h-full w-full">
					{isError ? <p>Error Occured</p> : <Loader color="violet" />}
				</Center>
			)}
			{isSuccess && (
				<Flex direction={"row"} className="char-bg w-full" gap={0}>
					<Flex
						className={
							"w-[33.3%] h-full pl-10 overflow-y-auto no-scrollbar"
						}
						direction={"column"}
						justify={"center"}
					>
						{characters.map((character) => (
							<div
								className={
									"font-heading cursor-pointer text-white leading-none transition-all text-6xl hover:font-bold hover:mt-4 hover:ml-4 hover:mb-4 " +
									(selectedCharacter?.id === character?.id
										? activeClass
										: "font-thin")
								}
								key={character.id}
								onClick={() => setSelectedCharacter(character)}
							>
								{character.name.toUpperCase()}
							</div>
						))}
					</Flex>
					<Center className={"w-[33.4%] h-full flex-col"}>
						<AspectRatio ratio={380 / 620} sx={{ minWidth: 400 }}>
							<Image
								key={selectedCharacter?.id}
								className={"w-full " + "animate-fadeIn"}
								src={`/assets/images/characters/${selectedCharacter?.imageUrl}`}
								alt="Character Image"
							/>
						</AspectRatio>
						{!(user.characterURL === selectedCharacter?.imageUrl) && (
							<Button
								className="mt-10"
								onClick={() => mutate(selectedCharacter?.id as number)}
								w={300}
							>
								SELECT CHARACTER
							</Button>
						)}
					</Center>
					<Flex
						key={selectedCharacter?.id}
						direction={"column"}
						align={"flex-end"}
						className={"w-[33.3%] pt-[22.5%] h-full pr-10"}
					>
						<Text className="w-[70%] mb-2 text-white text-lg font-heading font-bold">
							Biograpahy
						</Text>
						<div className="w-[70%] text-white animate-fadeIn text-lg">
							{selectedCharacter?.description}
						</div>
					</Flex>
				</Flex>
			)}
		</>
	);
};

export default Characters;
