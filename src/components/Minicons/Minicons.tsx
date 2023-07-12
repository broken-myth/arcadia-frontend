import { Button, Center, Loader } from "@mantine/core";
import { useState } from "react";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "react-beautiful-dnd";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { StyledMinicon } from "..";
import cardinalToOrdinal from "../../utils/cardinalToOrdinal";
import { mutations, queries } from "../../utils/constants";
import { dataFetch, getUser, showNotification } from "../../utils/helpers";
import { addToList, removeFromList } from "./helper";
import { LockedMinicon, MutationParams, UnlockedMinicon } from "./types";
const positionArr = [1, 2, 3, 4, 5];
const droppableKey = {
	Lineup: "lineup",
	All: "all",
};

const Minicons = () => {
	const navigate = useNavigate();
	const user = getUser();
	const [lineup, setLineUp] = useState<UnlockedMinicon[] | null>(null);
	const [unlocked, setUnlocked] = useState<UnlockedMinicon[] | null>(null);
	const [locked, setLocked] = useState<LockedMinicon[] | null>(null);
	const [buttonIsVisible, setButtonIsVisible] = useState(false);
	const [lineupExist, setLineupExist] = useState(true);

	if (!user) {
		navigate("/login");
	}

	const { isLoading, isError, isSuccess } = useQuery({
		queryKey: queries.getAllMiniconsGET,
		queryFn: async () => {
			return dataFetch({
				user: user,
				url: "/api/minicon/",
			});
		},
		onSuccess: async (res) => {
			if (res && res.status === 200) {
				const data = await res.json();
				/* eslint-disable no-mixed-spaces-and-tabs */
				data.message.lineup === null
					? (setLineUp([]),
					  setButtonIsVisible(true),
					  setLineupExist(false))
					: setLineUp(data.message.lineup);
				data.message.unlocked === null
					? setUnlocked([])
					: setUnlocked(data.message.unlocked);
				data.message.locked === null
					? setLocked([])
					: setLocked(data.message.locked);
			}
			/* eslint-enable no-mixed-spaces-and-tabs */
		},
	});

	const { mutate } = useMutation({
		mutationKey: mutations.updateLineupPOST,
		mutationFn: async ({ lineupIDArr }: MutationParams) => {
			return dataFetch({
				user: user,
				url: "/api/minicon/updateLineup",
				method: "POST",
				body: {
					lineupIDArr: lineupIDArr,
				},
			});
		},
		onSuccess: async (res) => {
			if (res.ok) {
				const data = await res.json();
				showNotification("Success", data.message, "success");
				setButtonIsVisible(false);
			} else {
				const data = await res.json();
				if (data.message) {
					showNotification("Oops", data.message, "error");
				} else {
					showNotification("Oops", data.message, "error");
				}
			}
		},
	});

	const onDragEnd = (result: DropResult) => {
		if (lineup === null || unlocked === null || locked === null) {
			return;
		}
		const source = result.source.droppableId;
		const destination = result.destination?.droppableId;
		const sourceArr = source === droppableKey.Lineup ? lineup : unlocked;
		const destinationArr = source === droppableKey.Lineup ? unlocked : lineup;
		if (!result.destination) {
			return;
		}
		if (source === destination) {
			if (source === droppableKey.Lineup) {
				const newLineUp = [...lineup];
				const [removed] = newLineUp.splice(result.source.index, 1);
				newLineUp.splice(result.destination.index, 0, removed);
				setLineUp(newLineUp);
				setButtonIsVisible(true);
			} else {
				const newUnlocked = [...unlocked];
				const [removed] = newUnlocked.splice(result.source.index, 1);
				newUnlocked.splice(result.destination.index, 0, removed);
				setUnlocked(newUnlocked);
			}
			return;
		} else {
			if (
				source === droppableKey.Lineup &&
				destination === droppableKey.All
			) {
				const [draggedElement, finalSourceArr] = removeFromList(
					sourceArr,
					result.source.index
				);
				const finalDestinationArr = addToList(
					destinationArr,
					result.destination.index,
					draggedElement
				);
				setLineUp(finalSourceArr);
				setUnlocked(finalDestinationArr);
				setButtonIsVisible(true);
			} else if (
				source === droppableKey.All &&
				destination === droppableKey.Lineup
			) {
				const [draggedElement, newSourceArr] = removeFromList(
					sourceArr,
					result.source.index
				);
				const newDestinationArr = addToList(
					destinationArr,
					result.destination.index,
					draggedElement
				);
				setLineUp(newDestinationArr);
				setUnlocked(newSourceArr);
				setButtonIsVisible(true);
				if (newDestinationArr.length !== 6) {
					return;
				}
				const [removedElemntFromDestination, finalDestinationArr] =
					removeFromList(newDestinationArr, newDestinationArr.length - 1);
				const finalSourceArr = addToList(
					newSourceArr,
					result.source.index,
					removedElemntFromDestination
				);
				setLineUp(finalDestinationArr);
				setUnlocked(finalSourceArr);
			}
		}
	};

	const lineUpItems =
		lineup &&
		lineup.map((minicon, index) => {
			return (
				<Draggable
					index={index}
					draggableId={`${minicon.miniconID}`}
					key={minicon.miniconID}
				>
					{(provided, snapshot) => (
						<Link
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							to={`../minicon/${minicon.miniconID}`}
						>
							<StyledMinicon
								locked={false}
								name={minicon.name}
								type={minicon.type}
								miniconImageUrl={minicon.imageLink}
								xp={minicon.xp}
								isDragging={snapshot.isDragging}
							/>
						</Link>
					)}
				</Draggable>
			);
		});

	const unlockedItems =
		unlocked &&
		unlocked.map((minicon, index) => {
			return (
				<Draggable
					index={index}
					draggableId={`${minicon.miniconID}`}
					key={minicon.miniconID}
				>
					{(provided, snapshot) => (
						<Link
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							to={`../minicon/${minicon.miniconID}`}
						>
							<StyledMinicon
								name={minicon.name}
								type={minicon.type}
								miniconImageUrl={minicon.imageLink}
								locked={false}
								xp={minicon.xp}
								isDragging={snapshot.isDragging}
							/>
						</Link>
					)}
				</Draggable>
			);
		});

	const lockedItems =
		locked &&
		locked.map((minicon) => {
			return (
				<StyledMinicon
					key={minicon.miniconID}
					locked={true}
					name={minicon.name}
				/>
			);
		});

	return (
		<main className="h-full w-full">
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
					<DragDropContext onDragEnd={onDragEnd}>
						<div className="relative h-screen basis-[80%] flex flex-col items-center justify-between bg-[rgba(0,0,0,0.424)] overflow-y-auto scrollBar">
							<div className="box-border pl-[5%] w-[100%] pt-[1%] pr-[5%] flex flex-col items-start justify-between basis-[41%] bg-transparent">
								<span className="font-heading not-italic font-bold text-white text-[36px] leading-[54px]">
									LINEUP
								</span>
								<Droppable
									direction="horizontal"
									key="lineup"
									droppableId="lineup"
								>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.droppableProps}
											className={`bg-[rgba(0,0,0,0.4)] relative pt-[2%] ${
												lineupExist ? "pt-[2%]" : "pt-0"
											} w-full h-[380px] mt-[32px] rounded-[30px] grid grid-cols-5 overflow-hidden `}
										>
											{lineUpItems}
											{provided.placeholder}
											{!lineup?.length && (
												<div className="bg-transparent absolute top-0 left-0 tracking-wider font-heading text-[32px] w-full h-[330px] mt-[32px] rounded-[30px] flex flex-col items-center justify-center text-white ">
													Please set your lineup
												</div>
											)}
										</div>
									)}
								</Droppable>
								<div className=" bg-transparent mt-[-70px] relative w-full h-[50px] flex flex-row items-center justify-around ">
									{positionArr.map((item, index) => {
										return (
											<div
												key={index}
												className="text-white text-[26px] w-full flex items-center justify-center"
											>
												<span className=" font-heading">
													{cardinalToOrdinal(item)}
												</span>
											</div>
										);
									})}
								</div>
							</div>
							<div className=" box-border relative flex w-[100%] pl-[5%] pt-[1%] pr-[5%] pb-[2%] flex-col items-start justify-between basis-[51%] mt-[1%]">
								<div className="mb-[2%] mt-[3%] relative w-[100%] flex flex-row items-center justify-center">
									{buttonIsVisible && (
										<Button
											onClick={() => {
												let lineupIDArr: number[] = [];
												lineup?.map((minicon) => {
													lineupIDArr = [
														...lineupIDArr,
														minicon.ownedMiniconID,
													];
												});
												mutate({ lineupIDArr });
											}}
											variant="default"
											size="lg"
										>
											Update
										</Button>
									)}
								</div>
								{unlocked !== null && unlocked.length !== 0 && (
									<Droppable
										direction="horizontal"
										key="all"
										droppableId="all"
									>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.droppableProps}
												className="bg-[rgba(0,0,0,0.4)] w-full pt-[3%] pb-[2%] gap-y-[85px] mt-[32px] rounded-[30px] box-content grid grid-flow-row grid-cols-5 overflow-hidden"
											>
												{unlockedItems}

												{provided.placeholder}
											</div>
										)}
									</Droppable>
								)}
								<div className="bg-[rgba(0,0,0,0.4)] w-full pt-[3%] pb-[2%] gap-y-[85px] mt-[32px] rounded-[30px] box-content grid grid-flow-row grid-cols-5 overflow-hidden">
									{lockedItems}
								</div>
							</div>
						</div>
					</DragDropContext>
				</>
			)}
		</main>
	);
};

export default Minicons;
