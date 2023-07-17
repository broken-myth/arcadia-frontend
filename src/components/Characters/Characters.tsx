import {
	AspectRatio,
	Flex,
	Image,
	Text,
	Center,
	Button,
	Skeleton,
	Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Character } from "../../type";
import { Mutations } from "../../utils/constants";
import { dataFetch, getUser } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { showNotification } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { updateProfileSuccess } from "../../actions/user";
import { eventEmitter, Events } from "free-roam";
import { useCharacters } from "../../utils/queries";

const activeClass = "font-bold mt-4 ml-4 mb-4";

const Characters = () => {
	const [selectedCharacter, setSelectedCharacter] =
		useState<Character | null>();
	const user = getUser();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isError, isSuccess, isFetching, data } = useCharacters(user);

	useEffect(() => {
		if (data && data.characters) {
			setSelectedCharacter(
				data.characters.find(
					(character: Character) =>
						character.imageUrl === user.characterURL
				)
			);
		}
	}, [data]);

	const updateCharcter = useMutation({
		mutationKey: Mutations.updateCharacterPATCH,
		mutationFn: async (characterId: number) => {
			return dataFetch({
				user: user,
				url: "/api/user/profile",
				method: "PATCH",
				body: {
					intendedUpdate: "character",
					newValue: characterId.toString(),
				},
			});
		},
		onSuccess: async (res) => {
			const data = await res.json();
			if (res.ok) {
				showNotification("Sucess", "Character Updated", "success");
				dispatch(updateProfileSuccess(data));
				eventEmitter.emit(Events.CHANGE_CHARACTER, data.newValue);
			} else {
				showNotification("Oops", data.message, "error");
			}
		},
	});

	if (!user) {
		navigate("/login");
	}

	if (isError) {
		return (
			<Center>
				<Text>Some Error Occured</Text>
			</Center>
		);
	}

	return (
		<>
			<Flex direction={"row"} className="char-bg w-full" gap={0}>
				<Flex
					className={"w-[35%] h-full pl-10 overflow-y-auto no-scrollbar"}
					direction={"column"}
					justify={"center"}
				>
					{isFetching && (
						<Group>
							{[...Array(7)].map((_, i) => (
								<Skeleton height={70} key={i} />
							))}
						</Group>
					)}
					{isSuccess &&
						!isFetching &&
						data.characters.map((character: Character) => (
							<div
								className={
									"font-heading cursor-pointer text-white leading-none transition-all text-5xl hover:font-bold hover:mt-4 hover:ml-4 hover:mb-4 " +
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
				<Center className={"w-[30%] h-fit flex-col"}>
					{isFetching && <Skeleton height={620} width={380} radius="xl" />}
					{isSuccess && !isFetching && selectedCharacter && (
						<>
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
									loading={updateCharcter.isLoading}
									className=""
									onClick={() =>
										updateCharcter.mutate(
											selectedCharacter?.id as number
										)
									}
									w={300}
								>
									SELECT CHARACTER
								</Button>
							)}
						</>
					)}
				</Center>
				<Flex
					key={selectedCharacter?.id}
					direction={"column"}
					align={"flex-end"}
					className={"w-[35%] pt-[22.5%] h-full pr-10"}
				>
					{isFetching && <Skeleton height={200} width={400} radius="xl" />}
					{isSuccess && !isFetching && selectedCharacter && (
						<>
							<Text className="w-[80%] mb-2 text-white text-lg font-heading font-bold">
								Biograpahy
							</Text>
							<div className="w-[80%] text-white animate-fadeIn font-thin text-lg">
								{selectedCharacter?.description}
							</div>
						</>
					)}
				</Flex>
			</Flex>
		</>
	);
};

export default Characters;
